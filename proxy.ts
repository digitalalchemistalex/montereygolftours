import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/admin/login', '/api/admin/auth/login']

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some(p => pathname.startsWith(p))
}

async function verifyToken(token: string, secret: string): Promise<boolean> {
  try {
    const [payload, sig] = token.split('.')
    if (!payload || !sig) return false
    const enc = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    )
    const sigBytes = Uint8Array.from(
      sig.match(/.{1,2}/g)!.map(b => parseInt(b, 16))
    )
    return await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(payload))
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (!pathname.startsWith('/admin')) return NextResponse.next()
  if (isPublicPath(pathname)) return NextResponse.next()

  const secret = process.env.ADMIN_SECRET
  if (!secret) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  const token = request.cookies.get('admin_token')?.value
  if (token && await verifyToken(token, secret)) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = '/admin/login'
  return NextResponse.redirect(url)
}

// Next.js 16: proxy.ts replaces middleware.ts
export const config = {
  matcher: ['/admin/:path*'],
}
