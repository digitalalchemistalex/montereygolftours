import { supabase } from '@/lib/supabase'

const now = new Date()
const hour = now.getHours()
const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

export default async function AdminDashboard() {
  const [
    { count: totalLeads },
    { count: thisMonth },
    { count: quoted },
    { count: booked },
    { count: newLeads },
  ] = await Promise.all([
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*', { count: 'exact', head: true })
      .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
    supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'quoted'),
    supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'booked'),
    supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'new'),
  ])

  const stats = [
    { label: 'Total Leads', value: totalLeads ?? 0, sub: 'All time',          accent: '#2d6a4f' },
    { label: 'This Month',  value: thisMonth ?? 0,  sub: 'New requests',      accent: '#1d4ed8' },
    { label: 'Quoted',      value: quoted ?? 0,     sub: 'Awaiting response', accent: '#6d28d9' },
    { label: 'Booked',      value: booked ?? 0,     sub: 'Confirmed trips',   accent: '#b45309' },
  ]

  const navCards = [
    { href: '/admin/leads',  label: 'Lead Pipeline', desc: 'View, score, and act on every quote request', color: '#2d6a4f' },
    { href: '/admin/quotes', label: 'Quote Builder', desc: 'Build custom trip quotes and send to clients',  color: '#1d4ed8' },
    { href: '/admin/rates',  label: 'Rate Configs',  desc: 'Manage course and hotel net rates by season',  color: '#92400e' },
    { href: '/admin/health', label: 'System Health', desc: 'Env vars, deployments, and live site checks',  color: '#6d28d9' },
  ]

  return (
    <div className="admin-page">
      <div className="admin-dash-header">
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
            {greeting}, Sean
          </h1>
          <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
            {(newLeads ?? 0) > 0
              ? <span style={{ color: '#2d6a4f', fontWeight: '500' }}>{newLeads} new lead{(newLeads ?? 0) > 1 ? 's' : ''} waiting</span>
              : 'Everything is up to date'}
          </p>
        </div>
        <a href="/admin/leads" style={{ fontSize: '13px', fontWeight: '500', color: '#2d6a4f', textDecoration: 'none', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '8px 16px', borderRadius: '8px', whiteSpace: 'nowrap' }}>
          View all leads →
        </a>
      </div>

      <div className="admin-stats-grid">
        {stats.map(s => (
          <div key={s.label} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: s.accent, borderRadius: '12px 12px 0 0' }} />
            <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: '600' }}>{s.label}</p>
            <p style={{ fontSize: '30px', fontWeight: '700', color: '#111827', margin: '0 0 2px 0', letterSpacing: '-1px', lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="admin-cards-grid">
        {navCards.map(c => (
          <a key={c.href} href={c.href} style={{ display: 'block', background: 'white', border: '1px solid #e5e7eb', borderLeft: '3px solid ' + c.color, borderRadius: '12px', padding: '20px 22px', textDecoration: 'none' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>{c.label}</h2>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, lineHeight: '1.5' }}>{c.desc}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
