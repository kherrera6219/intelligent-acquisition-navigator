
import { useEffect } from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { useToast } from '@/hooks/use-toast';
import { processPendingRequests } from '@/utils/offlineStorage';

/**
 * Network Status Monitor Component
 * 
 * This component monitors network connectivity and handles offline/online transitions.
 * It's intended to be mounted once at the app root level.
 */
export function NetworkStatusMonitor() {
  const isOnline = useNetworkStatus();
  const { toast } = useToast();
  
  useEffect(() => {
    let hasBeenOffline = false;
    let toastId: string | undefined = undefined;
    
    const handleOffline = () => {
      hasBeenOffline = true;
      const result = toast({
        title: "You're offline",
        description: "Your changes will be saved and synced when your connection is restored.",
        duration: 5000,
        variant: "destructive"
      });
      toastId = result?.id;
    };
    
    const handleOnline = async () => {
      if (hasBeenOffline) {
        if (toastId) {
          // Dismiss the offline toast if it's still visible
          toast({
            title: "Connection restored",
            description: "You're back online. Syncing your data...",
            duration: 3000,
          });
          toastId = undefined;
        } else {
          toast({
            title: "Connection restored",
            description: "You're back online. Syncing your data...",
            duration: 3000,
          });
        }
        
        // Process any pending requests
        try {
          const result = await processPendingRequests();
          
          if (result.successful > 0 || result.failed > 0) {
            toast({
              title: "Sync complete",
              description: `Successfully processed ${result.successful} requests. ${
                result.failed > 0 ? `Failed: ${result.failed}` : ''
              }`,
              variant: result.failed > 0 ? 'destructive' : 'default',
              duration: 5000,
            });
          }
        } catch (error) {
          console.error('Error processing pending requests:', error);
          toast({
            title: "Sync error",
            description: "Failed to sync some changes. Please try again later.",
            variant: "destructive",
            duration: 5000,
          });
        }
        
        hasBeenOffline = false;
      }
    };
    
    // Initial check
    if (!isOnline) {
      handleOffline();
    }
    
    // Set up event listeners for online/offline status changes
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOnline, toast]);
  
  // This component doesn't render anything
  return null;
}
