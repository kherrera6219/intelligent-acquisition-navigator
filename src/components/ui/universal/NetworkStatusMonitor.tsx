
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { processPendingRequests } from '@/utils/offlineStorage';

/**
 * Network status monitor component that provides real-time feedback
 * about the application's connectivity state
 */
export const NetworkStatusMonitor: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [reconnecting, setReconnecting] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Network status change handlers
    const handleOnline = () => {
      setIsOnline(true);
      
      toast({
        title: "Back Online",
        description: "You're connected to the internet again. Syncing data...",
        variant: "default",
        duration: 3000,
      });
      
      // Process any pending requests
      setReconnecting(true);
      processPendingRequests((processed, total) => {
        console.log(`Processing offline requests: ${processed}/${total}`);
      })
      .then((result) => {
        if (result.successful > 0) {
          toast({
            title: "Sync Complete",
            description: `Successfully processed ${result.successful} offline ${result.successful === 1 ? 'action' : 'actions'}.`,
            variant: "default",
            duration: 3000,
          });
        }
        
        if (result.failed > 0) {
          toast({
            title: "Sync Issues",
            description: `Failed to process ${result.failed} offline ${result.failed === 1 ? 'action' : 'actions'}. Some changes may need to be redone.`,
            variant: "destructive",
            duration: 5000,
          });
        }
      })
      .catch((error) => {
        console.error("Error processing offline requests:", error);
        toast({
          title: "Sync Error",
          description: "An error occurred while syncing your offline actions.",
          variant: "destructive",
          duration: 5000,
        });
      })
      .finally(() => {
        setReconnecting(false);
      });
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "You're Offline",
        description: "Working in offline mode. Some features may be limited.",
        variant: "destructive",
        duration: 5000,
      });
    };

    // Register event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up listeners on unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  return null; // This component doesn't render any UI directly
};
