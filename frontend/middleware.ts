import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const allowedOrigin = request.headers.get('origin') || ''
  const referer = request.headers.get('referer') || ''
  const isAllowed =
    allowedOrigin.includes('syshub365.com') ||
    allowedOrigin.includes('localhost:3000') ||
    allowedOrigin.includes('127.0.0.1:3000') ||
    referer.includes('syshub365.com') ||
    referer.includes('localhost:3000') ||
    referer.includes('127.0.0.1:3000')

  if (!isAllowed && request.nextUrl.pathname.startsWith('/api/')) {
    return new NextResponse(null, { status: 403 })
  }

  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' https://images.unsplash.com https://randomuser.me data:; " +
    "connect-src 'self' https://syshub365-api-*.fly.dev; " +
    "frame-src 'self' https://www.googletagmanager.com;"
  )
  response.headers.set('Permissions-Policy', 'geolocation=(), camera=(), microphone=()')

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
}
