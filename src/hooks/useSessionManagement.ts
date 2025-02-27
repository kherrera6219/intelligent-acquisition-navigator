
import { useEffect, useRef } from 'react';
import { SESSION_TIMEOUT } from '@/constants/auth';
import { globalRateLimiter } from '@/utils/rateLimit';

/**
 * Hook to manage user session with rate limiting for session operations
 * @param signOut Function to sign user out when session expires
 * @param lastActivity Timestamp of last user activity
 */
export function useSessionManagement(
  signOut: () => Promise<void>,
  lastActivity: number
) {
  const timeoutRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    // Set timeout for session expiration
    timeoutRef.current = window.setTimeout(async () => {
      // Apply rate limiting to sign out operation to prevent abuse
      if (globalRateLimiter.check('session:signout')) {
        await signOut();
      }
    }, SESSION_TIMEOUT);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [lastActivity, signOut]);
}
