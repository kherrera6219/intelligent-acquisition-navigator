
import { useEffect, useRef, useState } from 'react';
import { SESSION_TIMEOUT } from '@/constants/auth';
import { globalRateLimiter } from '@/utils/rateLimit';
import { syncSessionWithDatabase } from '@/utils/sessionUtils';
import { supabase } from '@/integrations/supabase/client';

/**
 * Enhanced hook to manage user session with rate limiting and database syncing
 * @param signOut Function to sign user out when session expires
 * @param lastActivity Timestamp of last user activity
 */
export function useSessionManagement(
  signOut: () => Promise<void>,
  lastActivity: number
) {
  const timeoutRef = useRef<number | null>(null);
  const [warningShown, setWarningShown] = useState(false);
  const WARNING_TIME = 60000; // 1 minute before timeout
  
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    // Get the current user
    const getUserId = async () => {
      const { data } = await supabase.auth.getUser();
      return data?.user?.id;
    };

    // Set timeout for session expiration warning
    const warningTime = SESSION_TIMEOUT - WARNING_TIME;
    if (warningTime > 0) {
      setTimeout(() => {
        if (!warningShown) {
          setWarningShown(true);
          console.warn("Your session will expire soon. Please take action to stay logged in.");
          
          // Record warning event in database
          getUserId().then(userId => {
            if (userId) {
              syncSessionWithDatabase(userId, 'session_warning', {
                expiresIn: WARNING_TIME / 1000
              });
            }
          });
        }
      }, warningTime);
    }

    // Set timeout for session expiration
    timeoutRef.current = window.setTimeout(async () => {
      // Apply rate limiting to sign out operation to prevent abuse
      if (globalRateLimiter.check('session:signout')) {
        const userId = await getUserId();
        
        // Record session timeout in database
        if (userId) {
          syncSessionWithDatabase(userId, 'session_timeout', {
            lastActivity
          });
        }
        
        await signOut();
        setWarningShown(false);
      }
    }, SESSION_TIMEOUT);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [lastActivity, signOut, warningShown]);

  // Reset warning state on activity
  useEffect(() => {
    setWarningShown(false);
  }, [lastActivity]);
}
