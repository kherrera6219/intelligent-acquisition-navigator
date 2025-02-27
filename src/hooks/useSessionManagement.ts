
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

/**
 * Enhanced hook to manage session timeouts
 * @param handleSignOut - Function to sign out the user
 * @param lastActivity - Timestamp of the last user activity
 * @param sessionDuration - The duration of the session in milliseconds
 * @param showSessionWarning - Whether the session warning is being shown
 */
export function useSessionManagement(
  handleSignOut: () => Promise<void>,
  lastActivity: number,
  sessionDuration: number = 30 * 60 * 1000, // 30 minutes default
  showSessionWarning: boolean = false
) {
  const { toast } = useToast();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleVisibilityChange = async () => {
      // Check session when tab becomes visible again
      if (document.visibilityState === 'visible') {
        const timeSinceLastActivity = Date.now() - lastActivity;
        
        // If inactive for too long, sign out
        if (timeSinceLastActivity > sessionDuration) {
          toast({
            title: "Session expired",
            description: "You have been signed out due to inactivity.",
            variant: "destructive"
          });
          await handleSignOut();
        }
      }
    };
    
    // Set a timeout to automatically sign out after session duration
    timeoutId = setTimeout(async () => {
      const timeSinceLastActivity = Date.now() - lastActivity;
      
      // Double-check if we should actually sign out
      if (timeSinceLastActivity > sessionDuration) {
        toast({
          title: "Session expired",
          description: "You have been signed out due to inactivity.",
          variant: "destructive"
        });
        await handleSignOut();
      }
    }, sessionDuration);
    
    // Watch for visibility changes to handle returning to the page
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Listen for storage events to handle session expiry across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'last_activity') {
        const newLastActivity = parseInt(e.newValue || '0', 10);
        if (newLastActivity > lastActivity) {
          // Activity detected in another tab, update our timeout
          clearTimeout(timeoutId);
          timeoutId = setTimeout(async () => {
            const timeSinceLastActivity = Date.now() - newLastActivity;
            if (timeSinceLastActivity > sessionDuration) {
              await handleSignOut();
            }
          }, sessionDuration - (Date.now() - newLastActivity));
        }
      } else if (e.key === 'session_expired' && e.newValue === 'true') {
        // Another tab triggered session expiry
        handleSignOut();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [handleSignOut, lastActivity, sessionDuration, toast, showSessionWarning]);
}
