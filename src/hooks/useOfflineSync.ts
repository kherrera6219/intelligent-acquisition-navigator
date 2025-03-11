
import { useState, useEffect, useCallback } from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { 
  processPendingRequests, 
  getPendingRequests 
} from '@/utils/offlineStorage';
import { useToast } from '@/hooks/use-toast';

interface UseOfflineSyncOptions {
  autoSync?: boolean;
  syncOnReconnect?: boolean;
  showToasts?: boolean;
}

export function useOfflineSync(options: UseOfflineSyncOptions = {}) {
  const {
    autoSync = true,
    syncOnReconnect = true,
    showToasts = true
  } = options;
  
  const isOnline = useNetworkStatus();
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [syncProgress, setSyncProgress] = useState(0);
  const { toast } = useToast();
  
  // Get pending requests count
  const refreshPendingCount = useCallback(async () => {
    try {
      const requests = await getPendingRequests();
      setPendingCount(requests.length);
      return requests.length;
    } catch (error) {
      console.error('Error counting pending requests:', error);
      return 0;
    }
  }, []);
  
  // Sync offline data when back online
  const syncOfflineData = useCallback(async () => {
    if (!isOnline || isSyncing) return;
    
    try {
      setIsSyncing(true);
      
      // First check if there are any pending requests
      const count = await refreshPendingCount();
      
      if (count === 0) {
        setIsSyncing(false);
        return { successful: 0, failed: 0 };
      }
      
      // Show toast notification if enabled
      if (showToasts) {
        toast({
          title: 'Syncing offline data',
          description: `Processing ${count} pending requests...`,
        });
      }
      
      // Process pending requests
      const result = await processPendingRequests((processed, total) => {
        setSyncProgress(Math.floor((processed / total) * 100));
      });
      
      // Show result notification
      if (showToasts) {
        if (result.successful > 0 || result.failed > 0) {
          toast({
            title: 'Sync complete',
            description: `Successfully processed ${result.successful} requests. ${
              result.failed > 0 ? `Failed: ${result.failed}` : ''
            }`,
            variant: result.failed > 0 ? 'destructive' : 'default',
          });
        }
      }
      
      // Refresh pending count
      await refreshPendingCount();
      
      return result;
    } catch (error) {
      console.error('Error syncing offline data:', error);
      
      if (showToasts) {
        toast({
          title: 'Sync failed',
          description: `Error syncing offline data: ${(error as Error).message}`,
          variant: 'destructive',
        });
      }
      
      return { successful: 0, failed: 0, errors: [error as Error] };
    } finally {
      setIsSyncing(false);
      setSyncProgress(0);
    }
  }, [isOnline, isSyncing, refreshPendingCount, showToasts, toast]);
  
  // Check for pending requests on mount
  useEffect(() => {
    refreshPendingCount();
  }, [refreshPendingCount]);
  
  // Auto-sync when coming back online
  useEffect(() => {
    let hasBeenOffline = false;
    
    if (!isOnline) {
      hasBeenOffline = true;
      return;
    }
    
    if (hasBeenOffline && isOnline && syncOnReconnect) {
      syncOfflineData();
      hasBeenOffline = false;
    }
  }, [isOnline, syncOnReconnect, syncOfflineData]);
  
  // Run auto-sync on a timer if enabled
  useEffect(() => {
    if (!autoSync || !isOnline) return;
    
    const interval = setInterval(() => {
      syncOfflineData();
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [autoSync, isOnline, syncOfflineData]);
  
  return {
    isSyncing,
    pendingCount,
    syncProgress,
    syncOfflineData,
    refreshPendingCount,
    isOnline
  };
}
