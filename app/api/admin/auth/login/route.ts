import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createAdminToken, setAdminCookie } from '@/lib/admin-auth'
import { logAndAlert } from '@/lib/admin-error'

const attempts = new Map<string, { count: number; lockedUntil: number }>()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  )

  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const now = Date.now()

  const record = attempts.get(ip)
  if (record && now < record.lockedUntil) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 })
  }

  const { email, password } = await req.json()

  const { data: user } = await supabase
    .from('admin_users')
    .select('email, name')
    .eq('email', (email ?? '').toLowerCase().trim())
    .single()

  const isValid = user && password === process.env.ADMIN_SECRET

  if (!isValid) {
    const current = attempts.get(ip) ?? { count: 0, lockedUntil: 0 }
    const count = current.count + 1
    if (count >= MAX_ATTEMPTS) {
      attempts.set(ip, { count, lockedUntil: now + WINDOW_MS })
      await logAndAlert(
        'Brute force lockout',
        'IP ' + ip + ' locked out after ' + String(count) + ' failed attempts for email: ' + String(email)
      )
    } else {
      attempts.set(ip, { count, lockedUntil: 0 })
    }
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  attempts.delete(ip)
  const token = createAdminToken()
  await setAdminCookie(token)
  return NextResponse.json({ ok: true })
}
