
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useSessionState = (isAuthenticated: boolean) => {
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState<number | null>(null);
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const { toast } = useToast();

  // Session duration constants
  const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
  const WARNING_THRESHOLD = 5 * 60 * 1000; // 5 minutes before expiration

  const handleActivityDetection = () => {
    setLastActivity(Date.now());
    setShowSessionWarning(false);
  };

  const updateSessionTimeRemaining = () => {
    if (!isAuthenticated) {
      setSessionTimeRemaining(null);
      setShowSessionWarning(false);
      return;
    }
    
    const timeElapsed = Date.now() - lastActivity;
    const remaining = Math.max(0, SESSION_DURATION - timeElapsed);
    
    setSessionTimeRemaining(remaining);
    
    // Show warning when session is about to expire
    if (remaining > 0 && remaining <= WARNING_THRESHOLD) {
      setShowSessionWarning(true);
    }
  };

  const refreshSession = async () => {
    handleActivityDetection();
    setShowSessionWarning(false);
    
    toast({
      title: "Session Extended",
      description: "Your session has been refreshed",
    });
  };

  // User activity tracking
  useEffect(() => {
    if (!isAuthenticated) return;

    // Track user activity
    const events = ['mousedown', 'keydown', 'touchstart', 'scroll'];
    
    const resetTimer = () => {
      handleActivityDetection();
    };
    
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });
    
    // Check session time remaining periodically
    const interval = setInterval(updateSessionTimeRemaining, 30000); // Check every 30 seconds
    
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
      clearInterval(interval);
    };
  }, [isAuthenticated, lastActivity]);

  return {
    lastActivity,
    sessionTimeRemaining,
    showSessionWarning,
    refreshSession,
    SESSION_DURATION
  };
};
