import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const STATUS_TABS = [
  { key: 'all',       label: 'All' },
  { key: 'new',       label: 'New' },
  { key: 'contacted', label: 'Contacted' },
  { key: 'quoted',    label: 'Quoted' },
  { key: 'booked',    label: 'Booked' },
  { key: 'archived',  label: 'Archived' },
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
  const startDate = lead.start_date as string | undefined
  const urgency = startDate
    ? Math.max(0, (new Date(startDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 120
  const urgencyMult = urgency < 60 ? 3 : urgency < 120 ? 2 : 1
  const tierMap: Record<string, number> = { value: 1, mid: 2, premium: 3, no_limit: 4 }
  const tier = tierMap[String(lead.budget_tier ?? 'mid')] ?? 2
  const raw = size * tier * urgencyMult
  if (raw >= 30) return { label: 'Hot', color: '#dc2626' }
  if (raw >= 12) return { label: 'Warm', color: '#d97706' }
  return { label: 'Cold', color: '#6b7280' }
}

function hasPBC(courses: string[]): boolean {
  const PBC = ['pebble-beach', 'spyglass-hill', 'links-at-spanish-bay', 'del-monte']
  return courses.some(c => PBC.some(p => c.includes(p)))
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const cookieStore = await cookies()
  if (!cookieStore.get('admin_token')) redirect('/admin/login')

  const params = await searchParams
  const activeTab = params.status ?? 'all'

  let query = supabase
    .from('leads')
    .select('id, created_at, name, email, phone, group_size, trip_type, game_level, budget_tier, courses_interested, start_date, status, ok_to_call, ok_to_text')
    .order('created_at', { ascending: false })

  if (activeTab !== 'all') {
    query = query.eq('status', activeTab)
  }

  const { data: leads, error } = await query

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif' }}>
      {/* Nav */}
      <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="14" fill="#2d6a4f"/>
              <path d="M8 16 Q14 8 20 16" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              <circle cx="14" cy="18" r="2.5" fill="white"/>
            </svg>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>Monterey Golf Tours</span>
          </a>
          <span style={{ color: '#d1d5db', margin: '0 2px' }}>/</span>
          <span style={{ fontSize: '14px', color: '#6b7280' }}>Leads</span>
        </div>
        <form action="/api/admin/auth/logout" method="POST">
          <button style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: '7px', padding: '6px 14px', fontSize: '13px', color: '#6b7280', cursor: 'pointer', fontFamily: 'inherit' }}>Sign out</button>
        </form>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0', letterSpacing: '-0.4px' }}>Lead Pipeline</h1>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{leads?.length ?? 0} {activeTab === 'all' ? 'total' : activeTab} leads</p>
        </div>

        {/* Status tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', borderBottom: '1px solid #e5e7eb', paddingBottom: '0' }}>
          {STATUS_TABS.map(t => (
            <a key={t.key} href={t.key === 'all' ? '/admin/leads' : '/admin/leads?status=' + t.key} style={{
              padding: '8px 16px', fontSize: '13px', fontWeight: '500', textDecoration: 'none',
              borderBottom: activeTab === t.key ? '2px solid #2d6a4f' : '2px solid transparent',
              color: activeTab === t.key ? '#2d6a4f' : '#6b7280',
              marginBottom: '-1px',
            }}>{t.label}</a>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div style={{ padding: '16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#dc2626', fontSize: '13px', marginBottom: '16px' }}>
            Error loading leads: {error.message}
          </div>
        )}

        {/* Empty */}
        {!error && (!leads || leads.length === 0) && (
          <div style={{ textAlign: 'center', padding: '64px 32px', background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: '15px', color: '#6b7280', margin: 0 }}>No {activeTab === 'all' ? '' : activeTab + ' '}leads yet.</p>
          </div>
        )}

        {/* Leads table */}
        {leads && leads.length > 0 && (
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
                  {['Name', 'Group', 'Trip', 'Courses', 'Score', 'Status', 'Contact', 'Received'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '500', color: '#6b7280', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
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
                      <td style={{ padding: '12px 16px', color: '#374151' }}>{lead.group_size} golfers</td>
                      <td style={{ padding: '12px 16px', color: '#374151' }}>{lead.trip_type ?? '—'}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: '12px', color: '#374151' }}>{courses.length} course{courses.length !== 1 ? 's' : ''}</span>
                        {pbc && <span style={{ marginLeft: '6px', fontSize: '10px', background: '#fef9c3', color: '#854d0e', padding: '1px 6px', borderRadius: '99px', fontWeight: '600' }}>PBC</span>}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: s.color }}>{s.label}</span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '500', background: sc.bg, color: sc.color, padding: '2px 8px', borderRadius: '99px' }}>{lead.status}</span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        {lead.ok_to_call && <span style={{ fontSize: '11px', background: '#dcfce7', color: '#166534', padding: '2px 6px', borderRadius: '4px', marginRight: '4px' }}>📞</span>}
                        {lead.ok_to_text && <span style={{ fontSize: '11px', background: '#dbeafe', color: '#1d4ed8', padding: '2px 6px', borderRadius: '4px' }}>💬</span>}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#9ca3af', fontSize: '12px' }}>
                        {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
