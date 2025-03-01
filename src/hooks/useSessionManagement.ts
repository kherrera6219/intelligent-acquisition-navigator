
import { useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SessionManagementOptions {
  warningThreshold?: number; // Time in ms before session expiry to show warning
  autoRefresh?: boolean; // Whether to automatically refresh session
}

/**
 * Hook to manage user session timeouts, warnings, and auto-refresh
 * 
 * @param onSessionExpired - Function to call when session expires
 * @param lastActivity - Timestamp of last user activity
 * @param sessionDuration - Duration of session in ms
 * @param showWarning - Whether to show session expiry warning
 * @param options - Additional options for session management
 */
export const useSessionManagement = (
  onSessionExpired: () => Promise<void> | void,
  lastActivity: number,
  sessionDuration: number,
  showWarning: boolean,
  options: SessionManagementOptions = {}
) => {
  const { toast } = useToast();
  const { warningThreshold = 5 * 60 * 1000, autoRefresh = false } = options;

  const handleSessionWarning = useCallback(() => {
    if (showWarning) {
      toast({
        title: "Session Expiring Soon",
        description: "Your session will expire soon. Would you like to stay logged in?",
        variant: "warning",
        action: autoRefresh ? {
          label: "Stay Logged In",
          onClick: () => {
            // Reset last activity time
            window.dispatchEvent(new MouseEvent('mousedown'));
          }
        } : undefined,
        duration: 10000, // Show for 10 seconds
      });
    }
  }, [showWarning, toast, autoRefresh]);

  // Check session status periodically
  useEffect(() => {
    const checkSession = () => {
      const now = Date.now();
      const timeElapsed = now - lastActivity;
      const timeRemaining = sessionDuration - timeElapsed;

      // If session expired
      if (timeRemaining <= 0) {
        onSessionExpired();
        return;
      }

      // If session expiring soon
      if (timeRemaining <= warningThreshold) {
        handleSessionWarning();
      }
    };

    const intervalId = setInterval(checkSession, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, [lastActivity, sessionDuration, warningThreshold, onSessionExpired, handleSessionWarning]);

  return null;
};

export default useSessionManagement;
