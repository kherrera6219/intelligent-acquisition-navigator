
import { globalRateLimiter } from '@/utils/rateLimit';

/**
 * Middleware for rate limiting API requests
 * @param endpoint Endpoint identifier (used for limiting specific endpoints)
 * @param windowMs Time window in milliseconds (defaults to 60000ms = 1 minute)
 * @param maxRequests Maximum requests allowed in the window (defaults to 30)
 * @returns A function that returns true if request is allowed, false if rate limited
 */
export function apiRateLimiter(
  endpoint: string,
  windowMs = 60000,
  maxRequests = 30
) {
  const key = `api:${endpoint}`;
  
  return function checkRateLimit(): boolean {
    return globalRateLimiter.check(key);
  };
}

/**
 * Global API rate limiter with default settings
 */
export const globalApiRateLimiter = apiRateLimiter('global');
