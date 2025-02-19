
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { apiRateLimiter } from '@/middleware/rateLimit';
import { 
  csrfProtection, 
  securityHeaders, 
  sessionManagement 
} from '@/middleware/security';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Apply security middleware
  apiRateLimiter(req as any, res as any, () => {});
  securityHeaders(req as any, res as any, () => {});
  sessionManagement(req as any, res as any, () => {});
  csrfProtection(req as any, res as any, () => {});

  return res;
}

export const config = {
  matcher: '/api/:path*',
};
