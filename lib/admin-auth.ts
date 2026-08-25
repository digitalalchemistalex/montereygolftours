import { createHmac } from 'crypto'
import { cookies } from 'next/headers'

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

export function createAdminToken(): string {
  const secret = process.env.ADMIN_SECRET!
  const payload = Buffer.from(JSON.stringify({ ts: Date.now() + SESSION_DURATION })).toString('base64url')
  const sig = createHmac('sha256', secret).update(payload).digest('hex')
  return payload + '.' + sig
}

export async function setAdminCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}

export async function clearAdminCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_token')
}
