import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'
import LeadActions from './LeadActions'

const PBC_SLUGS = ['pebble-beach', 'spyglass-hill', 'links-at-spanish-bay', 'del-monte']
const CLOSED_SLUGS = ['links-at-spanish-bay']

function Field({ label, value }: { label: string; value: string | number | boolean | null | undefined }) {
  if (value === null || value === undefined || value === '') return null
  const display = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)
  return (
    <div style={{ marginBottom: '12px' }}>
      <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 2px 0', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>{label}</p>
      <p style={{ fontSize: '14px', color: '#111827', margin: 0, fontWeight: '500' }}>{display}</p>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 12px 0', paddingBottom: '8px', borderBottom: '1px solid #f3f4f6' }}>{title}</h3>
      {children}
    </div>
  )
}

export default async function LeadDetail({ params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies()
  if (!cookieStore.get('admin_token')) redirect('/admin/login')

  const { id } = await params

  const { data: lead, error } = await supabase.from('leads').select('*').eq('id', id).single()

  if (error || !lead) {
    return (
      <div style={{ padding: '64px', textAlign: 'center', fontFamily: '-apple-system, sans-serif' }}>
        <p style={{ color: '#dc2626' }}>Lead not found.</p>
        <a href="/admin/leads" style={{ color: '#2d6a4f' }}>← Back to leads</a>
      </div>
    )
  }

  const { data: activity } = await supabase
    .from('activity_log')
    .select('*')
    .eq('entity_id', id)
    .order('created_at', { ascending: false })

  const courses = (lead.courses_interested as string[]) ?? []
  const hotels = (lead.hotels_interested as string[]) ?? []
  const activities = (lead.activities_interested as string[]) ?? []
  const corpNeeds = (lead.corp_needs as string[]) ?? []

  return (
    <div style={{ padding: '32px 48px', fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif' }}>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', marginBottom: '24px' }}>
        <a href="/admin/leads" style={{ color: '#9ca3af', textDecoration: 'none' }}>Leads</a>
        <span style={{ color: '#d1d5db' }}>/</span>
        <span style={{ color: '#111827', fontWeight: '500' }}>{lead.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>

        {/* Left */}
        <div>
          {/* Header card */}
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0', letterSpacing: '-0.4px' }}>{lead.name}</h1>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 2px 0' }}>{lead.email}</p>
                {lead.phone && <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{lead.phone}</p>}
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 3px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Received</p>
                <p style={{ fontSize: '13px', color: '#374151', margin: 0, fontWeight: '500' }}>
                  {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
              {lead.ok_to_call && <span style={{ fontSize: '12px', background: '#dcfce7', color: '#166534', padding: '3px 10px', borderRadius: '99px', fontWeight: '500' }}>OK to call</span>}
              {lead.ok_to_text && <span style={{ fontSize: '12px', background: '#dbeafe', color: '#1d4ed8', padding: '3px 10px', borderRadius: '99px', fontWeight: '500' }}>OK to text</span>}
              {lead.returning_customer && <span style={{ fontSize: '12px', background: '#fef9c3', color: '#854d0e', padding: '3px 10px', borderRadius: '99px', fontWeight: '500' }}>Returning</span>}
            </div>
          </div>

          {/* Fields */}
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
            <Section title="Trip Overview">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 24px' }}>
                <Field label="Group Size" value={lead.group_size + ' golfers'} />
                <Field label="Trip Type" value={lead.trip_type} />
                <Field label="Game Level" value={lead.game_level} />
                <Field label="Start Date" value={lead.start_date} />
                <Field label="Nights" value={lead.nights} />
                <Field label="Rounds / Golfer" value={lead.rounds_per_golfer} />
                <Field label="Non-Golfers" value={lead.non_golfer_in_group ? (lead.non_golfer_count + ' non-golfers') : null} />
                <Field label="Budget Tier" value={lead.budget_tier} />
                <Field label="Referral" value={lead.referral_source} />
              </div>
            </Section>

            <Section title="Courses Interested">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {courses.length === 0 && <span style={{ color: '#9ca3af', fontSize: '13px' }}>None selected</span>}
                {courses.map((c: string) => {
                  const isPBC = PBC_SLUGS.some(p => c.includes(p))
                  const isClosed = CLOSED_SLUGS.some(p => c.includes(p))
                  return (
                    <span key={c} style={{
                      fontSize: '12px', padding: '4px 10px', borderRadius: '6px', fontWeight: '500',
                      background: isClosed ? '#f3f4f6' : isPBC ? '#fef9c3' : '#f0fdf4',
                      color: isClosed ? '#9ca3af' : isPBC ? '#854d0e' : '#166534',
                      textDecoration: isClosed ? 'line-through' : 'none',
                    }}>
                      {c}{isPBC && !isClosed ? ' ★' : ''}{isClosed ? ' (closed)' : ''}
                    </span>
                  )
                })}
              </div>
            </Section>

            <Section title="Preferences">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 24px' }}>
                <Field label="Tee Time 1st" value={lead.tee_time_pref_1} />
                <Field label="Tee Time 2nd" value={lead.tee_time_pref_2} />
                <Field label="Caddie" value={lead.caddie_option} />
                <Field label="Room Config" value={lead.room_config} />
                <Field label="Transport" value={lead.transport_needed} />
                <Field label="Airport" value={lead.arrival_airport} />
              </div>
            </Section>

            {hotels.length > 0 && (
              <Section title="Hotels Interested">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {hotels.map((h: string) => (
                    <span key={h} style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '6px', background: '#eff6ff', color: '#1d4ed8', fontWeight: '500' }}>{h}</span>
                  ))}
                </div>
              </Section>
            )}

            {lead.hotel_pick_for_me && (
              <Section title="Hotel">
                <span style={{ fontSize: '13px', color: '#6b7280' }}>Client asked us to pick the hotel</span>
              </Section>
            )}

            {activities.length > 0 && (
              <Section title="Activities">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {activities.map((a: string) => (
                    <span key={a} style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '6px', background: '#faf5ff', color: '#6d28d9', fontWeight: '500' }}>{a}</span>
                  ))}
                </div>
              </Section>
            )}

            {lead.trip_type === 'corp' && (
              <Section title="Corporate">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                  <Field label="Attendees" value={lead.corp_attendees} />
                  <Field label="Event Type" value={lead.corp_event_type} />
                </div>
                {corpNeeds.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                    {corpNeeds.map((n: string) => (
                      <span key={n} style={{ fontSize: '12px', padding: '3px 8px', borderRadius: '4px', background: '#f3f4f6', color: '#374151' }}>{n}</span>
                    ))}
                  </div>
                )}
              </Section>
            )}

            {lead.message && (
              <Section title="Message">
                <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', margin: 0 }}>{lead.message}</p>
              </Section>
            )}
          </div>
        </div>

        {/* Right */}
        <div>
          <LeadActions leadId={lead.id} currentStatus={lead.status} />

          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginTop: '16px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>Activity</h3>
            {(!activity || activity.length === 0) && (
              <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>No activity yet.</p>
            )}
            {activity && activity.map((a) => (
              <div key={a.id} style={{ paddingBottom: '12px', marginBottom: '12px', borderBottom: '1px solid #f3f4f6' }}>
                <p style={{ fontSize: '12px', fontWeight: '600', color: '#374151', margin: '0 0 2px 0' }}>{a.action}</p>
                {a.details?.note && <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>{a.details.note}</p>}
                <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>
                  {new Date(a.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {a.created_by}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
