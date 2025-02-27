
import { useState, useCallback } from 'react';
import { globalRateLimiter } from '@/utils/rateLimit';
import { useToast } from '@/hooks/use-toast';

type RateLimitOptions = {
  key?: string;
  windowMs?: number;
  maxRequests?: number;
  message?: string;
};

/**
 * Hook to rate limit any function
 * @param fn Function to rate limit
 * @param options Rate limit options
 * @returns A wrapped function that applies rate limiting
 */
export function useRateLimitedFunction<T extends (...args: any[]) => any>(
  fn: T,
  options: RateLimitOptions = {}
): {
  execute: (...args: Parameters<T>) => ReturnType<T> | undefined;
  isLimited: boolean;
  remaining: number;
} {
  const {
    key = 'default',
    message = 'Too many requests. Please try again later.',
  } = options;
  
  const [isLimited, setIsLimited] = useState(false);
  const { toast } = useToast();

  const execute = useCallback(
    (...args: Parameters<T>) => {
      if (!globalRateLimiter.check(key)) {
        setIsLimited(true);
        toast({
          title: 'Rate Limited',
          description: message,
          variant: 'destructive',
        });
        
        // Reset limited state after window time
        setTimeout(() => {
          setIsLimited(false);
        }, options.windowMs || 60000);
        
        return undefined;
      }
      
      setIsLimited(false);
      return fn(...args);
    },
    [fn, key, message, options.windowMs, toast]
  );

  const remaining = globalRateLimiter.remaining(key);

  return { execute, isLimited, remaining };
}
