import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'

const STATUS_TABS = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'contacted', label: 'Contacted' },
  { key: 'quoted', label: 'Quoted' },
  { key: 'booked', label: 'Booked' },
  { key: 'archived', label: 'Archived' },
]

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  new:       { bg: '#dbeafe', color: '#1d4ed8' },
  contacted: { bg: '#fef9c3', color: '#854d0e' },
  quoted:    { bg: '#ede9fe', color: '#6d28d9' },
  booked:    { bg: '#dcfce7', color: '#166534' },
  archived:  { bg: '#f3f4f6', color: '#6b7280' },
}

function score(lead: Record<string, unknown>): { label: string; color: string } {
  const size = parseInt(String(lead.group_size ?? '1'), 10) || 1
  const startDate = lead.travel_dates as string | undefined
  const urgency = startDate ? Math.max(0, (new Date(startDate).getTime() - Date.now()) / 86400000) : 120
  const urgencyMult = urgency < 60 ? 3 : urgency < 120 ? 2 : 1
  const tierMap: Record<string, number> = { value: 1, mid: 2, premium: 3, no_limit: 4 }
  const tier = tierMap[String(lead.budget_tier ?? 'mid')] ?? 2
  const raw = size * tier * urgencyMult
  if (raw >= 30) return { label: 'Hot', color: '#dc2626' }
  if (raw >= 12) return { label: 'Warm', color: '#d97706' }
  return { label: 'Cold', color: '#6b7280' }
}

function hasPBC(courses: string[]): boolean {
  return courses.some(c => ['pebble-beach','spyglass-hill','links-at-spanish-bay','del-monte'].some(p => c.includes(p)))
}

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const cookieStore = await cookies()
  if (!cookieStore.get('admin_token')) redirect('/admin/login')

  const params = await searchParams
  const activeTab = params.status ?? 'all'

  let query = supabase
    .from('leads')
    .select('id, created_at, name, email, group_size, trip_type, budget_tier, courses_interested, travel_dates, status, ok_to_call, ok_to_text')
    .order('created_at', { ascending: false })
  if (activeTab !== 'all') query = query.eq('status', activeTab)

  const { data: leads, error } = await query

  return (
    <div className="admin-page">
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0', letterSpacing: '-0.4px' }}>Lead Pipeline</h1>
        <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>{leads?.length ?? 0} {activeTab === 'all' ? 'total' : activeTab} leads</p>
      </div>

      <div className="admin-tabs">
        {STATUS_TABS.map(t => (
          <a key={t.key} href={t.key === 'all' ? '/admin/leads' : '/admin/leads?status=' + t.key} style={{
            padding: '8px 14px', fontSize: '13px', fontWeight: '500', textDecoration: 'none', whiteSpace: 'nowrap',
            borderBottom: activeTab === t.key ? '2px solid #2d6a4f' : '2px solid transparent',
            color: activeTab === t.key ? '#2d6a4f' : '#6b7280', marginBottom: '-1px',
          }}>{t.label}</a>
        ))}
      </div>

      {error && (
        <div style={{ padding: '14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#dc2626', fontSize: '13px', marginBottom: '16px' }}>
          Error: {error.message}
        </div>
      )}

      {!error && (!leads || leads.length === 0) && (
        <div style={{ textAlign: 'center', padding: '48px 24px', background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: '15px', color: '#6b7280', margin: 0 }}>No {activeTab === 'all' ? '' : activeTab + ' '}leads yet.</p>
        </div>
      )}

      {leads && leads.length > 0 && (
        <>
          {/* Desktop table */}
          <div className="admin-leads-table">
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
                    {['Name', 'Group', 'Trip', 'Courses', 'Score', 'Status', 'Contact', 'Date'].map(h => (
                      <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '600', color: '#6b7280', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, i) => {
                    const s = score(lead as Record<string, unknown>)
                    const courses = (lead.courses_interested as string[]) ?? []
                    const pbc = hasPBC(courses)
                    const sc = STATUS_COLORS[lead.status] ?? STATUS_COLORS.new
                    return (
                      <tr key={lead.id} style={{ borderBottom: i < leads.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                        <td style={{ padding: '12px 16px' }}>
                          <a href={'/admin/leads/' + lead.id} style={{ fontWeight: '600', color: '#111827', textDecoration: 'none', display: 'block' }}>{lead.name}</a>
                          <span style={{ fontSize: '12px', color: '#9ca3af' }}>{lead.email}</span>
                        </td>
                        <td style={{ padding: '12px 16px', color: '#374151' }}>{lead.group_size}</td>
                        <td style={{ padding: '12px 16px', color: '#374151' }}>{lead.trip_type ?? '—'}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ fontSize: '12px', color: '#374151' }}>{courses.length}</span>
                          {pbc && <span style={{ marginLeft: '6px', fontSize: '10px', background: '#fef9c3', color: '#854d0e', padding: '1px 6px', borderRadius: '99px', fontWeight: '600' }}>PBC</span>}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: s.color }}>{s.label}</span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ fontSize: '11px', fontWeight: '500', background: sc.bg, color: sc.color, padding: '2px 8px', borderRadius: '99px' }}>{lead.status}</span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          {lead.ok_to_call && <span style={{ fontSize: '11px', background: '#dcfce7', color: '#166534', padding: '2px 6px', borderRadius: '4px', marginRight: '4px' }}>Call</span>}
                          {lead.ok_to_text && <span style={{ fontSize: '11px', background: '#dbeafe', color: '#1d4ed8', padding: '2px 6px', borderRadius: '4px' }}>Text</span>}
                        </td>
                        <td style={{ padding: '12px 16px', color: '#9ca3af', fontSize: '12px' }}>
                          {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="admin-leads-cards">
            {leads.map(lead => {
              const s = score(lead as Record<string, unknown>)
              const courses = (lead.courses_interested as string[]) ?? []
              const pbc = hasPBC(courses)
              const sc = STATUS_COLORS[lead.status] ?? STATUS_COLORS.new
              return (
                <a key={lead.id} href={'/admin/leads/' + lead.id} style={{ display: 'block', background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', textDecoration: 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <p style={{ fontSize: '15px', fontWeight: '700', color: '#111827', margin: '0 0 2px 0' }}>{lead.name}</p>
                      <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>{lead.email}</p>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '500', background: sc.bg, color: sc.color, padding: '3px 8px', borderRadius: '99px', whiteSpace: 'nowrap', marginLeft: '8px' }}>{lead.status}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#374151' }}>{lead.group_size} golfers</span>
                    <span style={{ color: '#d1d5db' }}>·</span>
                    <span style={{ fontSize: '12px', color: '#374151' }}>{lead.trip_type ?? '—'}</span>
                    <span style={{ color: '#d1d5db' }}>·</span>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: s.color }}>{s.label}</span>
                    {pbc && <span style={{ fontSize: '10px', background: '#fef9c3', color: '#854d0e', padding: '1px 6px', borderRadius: '99px', fontWeight: '600' }}>PBC</span>}
                    {lead.ok_to_call && <span style={{ fontSize: '11px', background: '#dcfce7', color: '#166534', padding: '2px 6px', borderRadius: '4px' }}>Call</span>}
                    {lead.ok_to_text && <span style={{ fontSize: '11px', background: '#dbeafe', color: '#1d4ed8', padding: '2px 6px', borderRadius: '4px' }}>Text</span>}
                    <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#9ca3af' }}>{new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </a>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
