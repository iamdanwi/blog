import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting map
const rateLimit = new Map()

// Rate limit window in seconds
const RATE_LIMIT_WINDOW = 60
// Maximum requests per window
const MAX_REQUESTS = 100

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com; connect-src 'self' https://*.firebaseio.com https://*.googleapis.com; img-src 'self' https: data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;"
  )

  // Basic rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'anonymous'
  const now = Date.now()
  const windowStart = now - (RATE_LIMIT_WINDOW * 1000)

  // Clean up old entries
  for (const [key, timestamp] of rateLimit.entries()) {
    if (timestamp < windowStart) {
      rateLimit.delete(key)
    }
  }

  // Count requests for this IP
  const requestCount = Array.from(rateLimit.entries())
    .filter(([key, timestamp]) => key.startsWith(ip) && timestamp > windowStart)
    .length

  // If too many requests, return 429
  if (requestCount >= MAX_REQUESTS) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': RATE_LIMIT_WINDOW.toString()
      }
    })
  }

  // Record this request
  rateLimit.set(`${ip}-${now}`, now)

  return response
}

export const config = {
  matcher: '/api/:path*',
} 