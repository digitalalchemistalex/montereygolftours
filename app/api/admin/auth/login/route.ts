import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createAdminToken, setAdminCookie } from '@/lib/admin-auth'
import { logAndAlert } from '@/lib/admin-error'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

// Simple in-memory brute force store (resets on cold start — acceptable for now)
const attempts = new Map<string, { count: number; lockedUntil: number }>()

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 min

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const now = Date.now()

  // Brute force check
  const record = attempts.get(ip)
  if (record && now < record.lockedUntil) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 })
  }

  const { email, password } = await req.json()

  // Check admin_users table
  const { data: user } = await supabase
    .from('admin_users')
    .select('email, name')
    .eq('email', email?.toLowerCase().trim())
    .single()

  // Validate password against ADMIN_SECRET
  const isValid = user && password === process.env.ADMIN_SECRET

  if (!isValid) {
    const current = attempts.get(ip) ?? { count: 0, lockedUntil: 0 }
    const count = current.count + 1
    if (count >= MAX_ATTEMPTS) {
      attempts.set(ip, { count, lockedUntil: now + WINDOW_MS })
      await logAndAlert(
        'Brute force lockout',
        'IP ' + ip + ' locked out after ' + count + ' failed attempts for email: ' + email
      )
    } else {
      attempts.set(ip, { count, lockedUntil: 0 })
    }
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // Clear attempts on success
  attempts.delete(ip)

  const token = createAdminToken()
  await setAdminCookie(token)
  return NextResponse.json({ ok: true })
}
