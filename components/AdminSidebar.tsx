'use client'

import { usePathname } from 'next/navigation'

const NAV = [
  {
    href: '/admin',
    exact: true,
    label: 'Dashboard',
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke={active ? '#2d6a4f' : '#9ca3af'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="1" width="6" height="6" rx="1"/>
        <rect x="9" y="1" width="6" height="6" rx="1"/>
        <rect x="1" y="9" width="6" height="6" rx="1"/>
        <rect x="9" y="9" width="6" height="6" rx="1"/>
      </svg>
    ),
  },
  {
    href: '/admin/leads',
    exact: false,
    label: 'Leads',
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke={active ? '#2d6a4f' : '#9ca3af'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.5 2H12a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1h1.5"/>
        <rect x="5.5" y="1" width="5" height="2.5" rx="1"/>
        <path d="M5 7.5h6M5 10h4"/>
      </svg>
    ),
  },
  {
    href: '/admin/quotes',
    exact: false,
    label: 'Quotes',
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke={active ? '#2d6a4f' : '#9ca3af'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 2h12v12H2z" rx="1.5"/>
        <path d="M5 6h6M5 8.5h6M5 11h3"/>
      </svg>
    ),
  },
  {
    href: '/admin/rates',
    exact: false,
    label: 'Rates',
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke={active ? '#2d6a4f' : '#9ca3af'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="6"/>
        <path d="M8 4.5V6M8 10v1.5M6.5 6.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5c0 1.5-3 1.5-3 3 0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5"/>
      </svg>
    ),
  },
  {
    href: '/admin/health',
    exact: false,
    label: 'Health',
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke={active ? '#2d6a4f' : '#9ca3af'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 8h3l2-5 3 10 2-5h4"/>
      </svg>
    ),
  },
]

export default function AdminSidebar({ mobile }: { mobile?: boolean }) {
  const pathname = usePathname()

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href || pathname === href + '/'
    return pathname.startsWith(href)
  }

  // Bottom nav for mobile
  if (mobile) {
    return (
      <nav className="admin-bottom-nav" style={{
        display: 'none',
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: 'white', borderTop: '1px solid #e5e7eb',
        padding: '0 4px',
        height: '60px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif',
      }}>
        {NAV.map(item => {
          const active = isActive(item.href, item.exact)
          return (
            <a key={item.href} href={item.href} className="admin-bottom-item" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              flex: 1, gap: '3px', textDecoration: 'none', height: '100%',
              color: active ? '#2d6a4f' : '#9ca3af',
              borderRadius: '8px',
            }}>
              {item.icon(active)}
              <span style={{ fontSize: '10px', fontWeight: active ? '600' : '500', letterSpacing: '-0.1px' }}>{item.label}</span>
            </a>
          )
        })}
        <form action="/api/admin/auth/logout" method="POST" style={{ display: 'flex', flex: 1 }}>
          <button style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            flex: 1, gap: '3px', background: 'none', border: 'none', cursor: 'pointer',
            color: '#9ca3af', height: '100%', fontFamily: 'inherit',
          }}>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3"/><path d="M10 11l3-3-3-3M13 8H6"/>
            </svg>
            <span style={{ fontSize: '10px', fontWeight: '500' }}>Out</span>
          </button>
        </form>
      </nav>
    )
  }

  // Desktop sidebar
  return (
    <aside style={{
      width: '220px', minWidth: '220px', background: 'white',
      borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column',
      height: '100vh', position: 'sticky', top: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif',
    }}>
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #f3f4f6' }}>
        <a href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="14" fill="#2d6a4f"/>
            <path d="M8 16 Q14 8 20 16" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <circle cx="14" cy="18" r="2.5" fill="white"/>
          </svg>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#111827', letterSpacing: '-0.3px', lineHeight: 1.2 }}>Monterey Golf</div>
            <div style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '0.04em', marginTop: '1px' }}>OPERATIONS</div>
          </div>
        </a>
      </div>

      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
        <div style={{ fontSize: '10px', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0 10px', marginBottom: '6px' }}>Menu</div>
        {NAV.map(item => {
          const active = isActive(item.href, item.exact)
          return (
            <a key={item.href} href={item.href} className="admin-nav-item" style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '8px 10px', borderRadius: '8px', marginBottom: '2px',
              textDecoration: 'none', fontSize: '13px',
              fontWeight: active ? '600' : '500',
              color: active ? '#2d6a4f' : '#374151',
              background: active ? '#f0fdf4' : 'transparent',
            }}>
              {item.icon(active)}
              {item.label}
              {active && <span style={{ marginLeft: 'auto', width: '5px', height: '5px', borderRadius: '50%', background: '#2d6a4f' }} />}
            </a>
          )
        })}
      </nav>

      <div style={{ padding: '12px 10px', borderTop: '1px solid #f3f4f6' }}>
        <form action="/api/admin/auth/logout" method="POST">
          <button style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            width: '100%', padding: '8px 10px', borderRadius: '8px',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '13px', fontWeight: '500', color: '#6b7280', fontFamily: 'inherit', textAlign: 'left',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3"/><path d="M10 11l3-3-3-3M13 8H6"/>
            </svg>
            Sign out
          </button>
        </form>
      </div>
    </aside>
  )
}
