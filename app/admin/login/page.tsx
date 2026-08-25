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

    if (data.ok) {
      router.push('/admin')
    } else {
      setError(data.error ?? 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">Monterey Golf Tours</h1>
          <p className="text-stone-400 text-sm mt-1">Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-stone-900 rounded-xl p-8 space-y-5 border border-stone-800">
          <div>
            <label className="block text-sm font-medium text-stone-300 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              placeholder="you@montereygolftours.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-300 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-stone-700 disabled:text-stone-400 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
