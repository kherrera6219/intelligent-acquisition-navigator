
import { useState, useEffect } from 'react';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { useToast } from '@/hooks/use-toast';

interface ApplicationStatusProviderProps {
  children: React.ReactNode;
}

export const ApplicationStatusProvider: React.FC<ApplicationStatusProviderProps> = ({ children }) => {
  const [showReconnectedToast, setShowReconnectedToast] = useState(false);
  const { isOnline, isReconnecting, supabaseConnected } = useNetworkMonitor();
  const { toast } = useToast();

  // Show toast notification when coming back online after being offline
  useEffect(() => {
    if (isOnline && supabaseConnected && showReconnectedToast) {
      toast({
        title: 'Back online',
        description: 'You are now connected to the internet.',
        variant: 'default',
      });
      setShowReconnectedToast(false);
    } else if (!isOnline) {
      setShowReconnectedToast(true);
    }
  }, [isOnline, supabaseConnected, showReconnectedToast, toast]);

  // Periodically check application status
  useEffect(() => {
    const checkAppStatus = async () => {
      if (isOnline) {
        // Check that we can connect to the API
        try {
          // You could add additional health checks here if needed
          if (!supabaseConnected) {
            console.warn('Supabase connection appears to be down');
          }
        } catch (error) {
          console.error('Error checking application status:', error);
        }
      }
    };

    // Check status every 2 minutes
    const intervalId = setInterval(checkAppStatus, 2 * 60 * 1000);
    
    // Initial check
    checkAppStatus();

    return () => clearInterval(intervalId);
  }, [isOnline, supabaseConnected]);

  return <>{children}</>;
};
