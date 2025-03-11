
/**
 * Rate Limit Manager
 * Provides client-side rate limiting functionality to prevent excessive API calls
 */

type RateLimitOptions = {
  maxRequests: number;
  timeWindow: number; // in milliseconds
  key?: string;
};

type RateLimitRecord = {
  count: number;
  resetTime: number;
};

class RateLimitManager {
  private static instance: RateLimitManager;
  private limits: Map<string, RateLimitRecord> = new Map();
  
  private constructor() {}
  
  public static getInstance(): RateLimitManager {
    if (!RateLimitManager.instance) {
      RateLimitManager.instance = new RateLimitManager();
    }
    return RateLimitManager.instance;
  }
  
  /**
   * Checks if a request is allowed based on rate limit configuration
   * @param options Rate limit configuration
   * @returns True if request is allowed, false if rate limited
   */
  public isAllowed({ maxRequests, timeWindow, key = 'default' }: RateLimitOptions): boolean {
    const now = Date.now();
    const record = this.limits.get(key);
    
    // If no record exists or the time window has passed, create/reset the record
    if (!record || now > record.resetTime) {
      this.limits.set(key, {
        count: 1,
        resetTime: now + timeWindow
      });
      return true;
    }
    
    // If within time window and under request limit, increment count
    if (record.count < maxRequests) {
      record.count++;
      return true;
    }
    
    // Rate limit exceeded
    return false;
  }
  
  /**
   * Get time remaining until rate limit resets
   * @param key The rate limit key
   * @returns Time in milliseconds until reset, or 0 if no active limit
   */
  public getTimeRemaining(key: string = 'default'): number {
    const record = this.limits.get(key);
    if (!record) return 0;
    
    const now = Date.now();
    return Math.max(0, record.resetTime - now);
  }
  
  /**
   * Reset rate limit for a specific key
   * @param key The rate limit key to reset
   */
  public reset(key: string = 'default'): void {
    this.limits.delete(key);
  }
}

export const rateLimitManager = RateLimitManager.getInstance();

/**
 * Hook to rate-limit function calls
 */
export function useRateLimit<T extends (...args: any[]) => any>(
  fn: T,
  options: RateLimitOptions
): (...args: Parameters<T>) => ReturnType<T> | null {
  return (...args: Parameters<T>): ReturnType<T> | null => {
    if (rateLimitManager.isAllowed(options)) {
      return fn(...args);
    }
    
    console.warn(
      `Rate limit exceeded: ${options.maxRequests} requests per ${
        options.timeWindow / 1000
      } seconds. Please try again in ${
        Math.ceil(rateLimitManager.getTimeRemaining(options.key) / 1000)
      } seconds.`
    );
    
    return null;
  };
}
