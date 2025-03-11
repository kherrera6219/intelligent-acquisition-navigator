
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNetworkMonitor } from './NetworkMonitorProvider';

/**
 * Network status monitor component that provides real-time feedback
 * about the application's connectivity state without rendering any UI
 */
export const NetworkStatusMonitor: React.FC = () => {
  const { isOnline, reconnecting } = useNetworkMonitor();
  const { toast } = useToast();
  
  // Show toast notifications on network status changes
  useEffect(() => {
    // We only want to show notifications when reconnecting changes
    // or when isOnline changes, but not on initial mount
    const hasReconnected = !reconnecting && isOnline;
    
    // Show a toast when the user reconnects
    if (hasReconnected) {
      toast({
        title: "You're back online",
        description: "Your connection has been restored. Syncing data...",
        variant: "default",
        duration: 3000,
      });
    }
    
    return () => {
      // Cleanup function to prevent memory leaks
      // This will be called when the component unmounts
      // or when the dependencies change
    };
  }, [isOnline, reconnecting, toast]);

  // This component doesn't render any UI directly
  return null;
};
