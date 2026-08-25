import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const stats = [
  { label: 'Total Leads', value: '—', sub: 'All time' },
  { label: 'This Month', value: '—', sub: 'New requests' },
  { label: 'Quoted', value: '—', sub: 'Awaiting response' },
  { label: 'Booked', value: '—', sub: 'Confirmed trips' },
]

const navItems = [
  {
    href: '/admin/leads',
    icon: '📋',
    title: 'Lead Pipeline',
    desc: 'View, score, and manage every quote request',
    accent: '#2d6a4f',
    bg: '#f0fdf4',
  },
  {
    href: '/admin/quotes',
    icon: '📄',
    title: 'Quote Builder',
    desc: 'Build custom trip quotes and send to clients',
    accent: '#1e40af',
    bg: '#eff6ff',
  },
  {
    href: '/admin/rates',
    icon: '⛳',
    title: 'Rate Configs',
    desc: 'Manage course and hotel net rates by season',
    accent: '#92400e',
    bg: '#fffbeb',
  },
  {
    href: '/admin/health',
    icon: '🟢',
    title: 'System Health',
    desc: 'Env vars, deployments, and site checks',
    accent: '#6b21a8',
    bg: '#faf5ff',
  },
]

export default async function AdminDashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')
  if (!token) redirect('/admin/login')

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif',
    }}>
      {/* Top nav */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '60px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="14" fill="#2d6a4f"/>
            <path d="M8 16 Q14 8 20 16" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <circle cx="14" cy="18" r="2.5" fill="white"/>
          </svg>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>Monterey Golf Tours</span>
          <span style={{
            fontSize: '11px', fontWeight: '500', color: '#6b7280',
            background: '#f3f4f6', padding: '2px 8px', borderRadius: '99px',
            marginLeft: '4px',
          }}>Operations</span>
        </div>
        <form action="/api/admin/auth/logout" method="POST">
          <button style={{
            background: 'none', border: '1px solid #e5e7eb', borderRadius: '7px',
            padding: '6px 14px', fontSize: '13px', color: '#6b7280',
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Sign out
          </button>
        </form>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 32px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
            Good morning, Sean
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
            Here&apos;s what needs your attention today.
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {stats.map(s => (
            <div key={s.label} style={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '20px 24px',
            }}>
              <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '500' }}>{s.label}</p>
              <p style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0 0 2px 0', letterSpacing: '-1px' }}>{s.value}</p>
              <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Nav cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {navItems.map(item => (
            <a key={item.href} href={item.href} style={{
              display: 'block',
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '24px',
              textDecoration: 'none',
              transition: 'box-shadow 0.15s, border-color 0.15s',
            }}
            onMouseEnter={undefined}
            >
              <div style={{
                width: '40px', height: '40px',
                background: item.bg,
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', marginBottom: '14px',
              }}>
                {item.icon}
              </div>
              <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>
                {item.title}
              </h2>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, lineHeight: '1.5' }}>
                {item.desc}
              </p>
            </a>
          ))}
        </div>

      </div>
    </div>
  )
}
