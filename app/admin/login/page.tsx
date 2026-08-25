'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    setLoading(false)
    if (data.ok) router.push('/admin')
    else setError(data.error ?? 'Login failed')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f6f1 0%, #eef0eb 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif',
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>

        {/* Logo / wordmark */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            marginBottom: '8px',
          }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="14" fill="#2d6a4f"/>
              <path d="M8 16 Q14 8 20 16" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              <circle cx="14" cy="18" r="2.5" fill="white"/>
            </svg>
            <span style={{ fontSize: '15px', fontWeight: '600', color: '#1a1a1a', letterSpacing: '-0.3px' }}>
              Monterey Golf Tours
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Operations Portal</p>
        </div>

        {/* Card */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '36px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.06)',
          border: '1px solid rgba(0,0,0,0.06)',
        }}>
          <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0', letterSpacing: '-0.4px' }}>
            Sign in
          </h1>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 28px 0' }}>
            Access your lead pipeline and quote tools
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@montereygolftours.com"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '10px 14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#111827',
                  background: '#fafafa',
                  outline: 'none',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => e.target.style.borderColor = '#2d6a4f'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '10px 14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#111827',
                  background: '#fafafa',
                  outline: 'none',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => e.target.style.borderColor = '#2d6a4f'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            {error && (
              <div style={{
                marginBottom: '16px',
                padding: '10px 14px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#dc2626',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '11px',
                background: loading ? '#d1d5db' : '#2d6a4f',
                color: loading ? '#9ca3af' : 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '-0.1px',
                transition: 'background 0.15s',
              }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', color: '#9ca3af' }}>
          Monterey Golf Tours · Private Portal
        </p>
      </div>
    </div>
  )
}
