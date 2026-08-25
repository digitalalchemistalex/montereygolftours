'use server'
import { cookies } from 'next/headers'

const SESSION_MS = 7 * 24 * 60 * 60 * 1000

async function hmacSign(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload))
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function createAdminToken(): Promise<string> {
  const secret = process.env.ADMIN_SECRET!
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_MS })).toString('base64url')
  const sig = await hmacSign(payload, secret)
  return payload + '.' + sig
}

export async function setAdminCookie(token: string) {
  const store = await cookies()
  store.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}

export async function clearAdminCookie() {
  const store = await cookies()
  store.delete('admin_token')
}
