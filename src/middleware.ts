import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'

const PUBLIC_PATHS = ['/admin/login', '/api/admin/auth/login']

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some(p => pathname.startsWith(p))
}

function verifyToken(token: string): boolean {
  const secret = process.env.ADMIN_SECRET
  if (!secret) return false
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return false
  const expected = createHmac('sha256', secret).update(payload).digest('hex')
  try {
    return timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'))
  } catch {
    return false
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()
  if (isPublicPath(pathname)) return NextResponse.next()

  const token = request.cookies.get('admin_token')?.value
  if (token && verifyToken(token)) return NextResponse.next()

  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = '/admin/login'
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin/:path*'],
}
