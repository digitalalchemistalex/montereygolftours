import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function Logo() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="14" fill="#2d6a4f"/>
      <path d="M8 16 Q14 8 20 16" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <circle cx="14" cy="18" r="2.5" fill="white"/>
    </svg>
  )
}

function IconLeads() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#2d6a4f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
      <rect x="9" y="3" width="2" height="4" rx="1"/>
      <path d="M7 11h6M7 14h4"/>
    </svg>
  )
}

function IconQuote() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#1d4ed8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h12v12H4z" rx="2"/>
      <path d="M8 8h4M8 11h4M8 14h2"/>
    </svg>
  )
}

function IconRates() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#92400e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="7"/>
      <path d="M10 6v1.5M10 12.5V14M8 8.5c0-.83.67-1.5 2-1.5s2 .67 2 1.5c0 2-4 2-4 3.5 0 .83.67 1.5 2 1.5s2-.67 2-1.5"/>
    </svg>
  )
}

function IconHealth() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#6d28d9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10h3l2-6 4 12 2-6h3"/>
    </svg>
  )
}

const now = new Date()
const hour = now.getHours()
const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

const navItems = [
  { href: '/admin/leads',  Icon: IconLeads,  title: 'Lead Pipeline',  desc: 'View, score, and act on every quote request', bg: '#f0fdf4', border: '#bbf7d0' },
  { href: '/admin/quotes', Icon: IconQuote,  title: 'Quote Builder',  desc: 'Build custom trip quotes and send to clients',  bg: '#eff6ff', border: '#bfdbfe' },
  { href: '/admin/rates',  Icon: IconRates,  title: 'Rate Configs',   desc: 'Manage course and hotel net rates by season',  bg: '#fffbeb', border: '#fde68a' },
  { href: '/admin/health', Icon: IconHealth, title: 'System Health',  desc: 'Env vars, deployments, and live site checks',  bg: '#faf5ff', border: '#e9d5ff' },
]

export default async function AdminDashboard() {
  const cookieStore = await cookies()
  if (!cookieStore.get('admin_token')) redirect('/admin/login')

  // Real stats from DB
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
    { label: 'Total Leads',  value: totalLeads ?? 0,  sub: 'All time',         accent: '#2d6a4f' },
    { label: 'This Month',   value: thisMonth ?? 0,   sub: 'New requests',     accent: '#1d4ed8' },
    { label: 'Quoted',       value: quoted ?? 0,      sub: 'Awaiting response', accent: '#6d28d9' },
    { label: 'Booked',       value: booked ?? 0,      sub: 'Confirmed trips',  accent: '#b45309' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif' }}>

      {/* Nav */}
      <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Logo />
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827', letterSpacing: '-0.2px' }}>Monterey Golf Tours</span>
          <span style={{ fontSize: '11px', color: '#9ca3af', background: '#f3f4f6', padding: '2px 8px', borderRadius: '99px', marginLeft: '2px' }}>Operations</span>
        </div>
        <form action="/api/admin/auth/logout" method="POST">
          <button style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: '7px', padding: '6px 14px', fontSize: '13px', color: '#6b7280', cursor: 'pointer', fontFamily: 'inherit' }}>
            Sign out
          </button>
        </form>
      </div>

      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '44px 40px' }}>

        {/* Header */}
        <div style={{ marginBottom: '36px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0', letterSpacing: '-0.6px' }}>
              {greeting}, Sean
            </h1>
            <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>
              {newLeads ? <span style={{ color: '#2d6a4f', fontWeight: '500' }}>{newLeads} new lead{(newLeads ?? 0) > 1 ? 's' : ''} waiting</span> : 'Everything is up to date'}
            </p>
          </div>
          <a href="/admin/leads" style={{ fontSize: '13px', fontWeight: '500', color: '#2d6a4f', textDecoration: 'none', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '8px 16px', borderRadius: '8px' }}>
            View all leads →
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '22px 24px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: s.accent, borderRadius: '12px 12px 0 0' }} />
              <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: '600' }}>{s.label}</p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: '0 0 2px 0', letterSpacing: '-1.5px', lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Nav cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
          {navItems.map(item => (
            <a key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '22px 24px', textDecoration: 'none' }}>
              <div style={{ width: '40px', height: '40px', background: item.bg, border: '1px solid ' + item.border, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <item.Icon />
              </div>
              <div>
                <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0', letterSpacing: '-0.2px' }}>{item.title}</h2>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, lineHeight: '1.5' }}>{item.desc}</p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </div>
  )
}
