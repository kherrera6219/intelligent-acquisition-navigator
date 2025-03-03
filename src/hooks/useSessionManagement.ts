
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useSessionManagement = (
  handleSignOut: () => Promise<void>,
  lastActivity: number,
  sessionDuration: number,
  showSessionWarning: boolean
) => {
  const { toast } = useToast();

  // Auto-logout on inactivity
  useEffect(() => {
    if (!showSessionWarning) return;

    // Auto-logout after session warning if no action taken
    const warningDuration = 5 * 60 * 1000; // 5 minutes warning
    const timeoutId = setTimeout(() => {
      handleSignOut();
      toast({
        title: "Session expired",
        description: "You have been logged out due to inactivity.",
        variant: "destructive",
      });
    }, warningDuration);

    return () => clearTimeout(timeoutId);
  }, [showSessionWarning, handleSignOut, toast]);

  // Notify when session is about to expire
  useEffect(() => {
    if (showSessionWarning) {
      toast({
        title: "Session expiring soon",
        description: "Your session will expire soon. Please save your work.",
        variant: "default",
      });
    }
  }, [showSessionWarning, toast]);
};
