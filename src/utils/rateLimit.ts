
/**
 * Simple in-memory rate limiter for browser-side protection
 * Note: For production applications, this should be implemented server-side
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs = 60000, maxRequests = 30) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  /**
   * Check if the request should be allowed
   * @param key Identifier for the requester (e.g. IP, user ID, etc.)
   * @returns boolean indicating if request should be allowed
   */
  check(key: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    // Get current requests for this key or initialize empty array
    let requests = this.requests.get(key) || [];
    
    // Filter out requests older than the window
    requests = requests.filter(time => time > windowStart);
    
    // If requests exceed limit, deny
    if (requests.length >= this.maxRequests) {
      return false;
    }
    
    // Add this request to the list
    requests.push(now);
    this.requests.set(key, requests);
    
    return true;
  }

  /**
   * Get remaining requests in window
   * @param key Identifier for the requester
   * @returns number of requests remaining in current window
   */
  remaining(key: string): number {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    // Get current requests for this key or initialize empty array
    const requests = this.requests.get(key) || [];
    
    // Filter requests in current window
    const current = requests.filter(time => time > windowStart);
    
    return Math.max(0, this.maxRequests - current.length);
  }

  /**
   * Clear rate limit data
   * @param key Optional key to clear, if not provided clears all data
   */
  clear(key?: string): void {
    if (key) {
      this.requests.delete(key);
    } else {
      this.requests.clear();
    }
  }
}

// Create singleton instance for global use
export const globalRateLimiter = new RateLimiter();
