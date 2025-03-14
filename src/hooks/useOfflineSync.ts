
import { useState, useEffect, useCallback } from 'react';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';
import { processPendingRequests, getPendingRequests } from '@/utils/offlineStorage';
import { useToast } from './use-toast';

export function useOfflineSync() {
  const { isOnline, isReconnecting } = useNetworkMonitor();
  const [pendingRequests, setPendingRequests] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const { toast } = useToast();

  // Get initial pending requests count
  useEffect(() => {
    const getInitialCount = async () => {
      try {
        const requests = await getPendingRequests();
        setPendingRequests(requests.length);
      } catch (error) {
        console.error('Error getting pending requests count:', error);
      }
    };

    getInitialCount();
  }, []);

  // Monitor connectivity changes
  useEffect(() => {
    if (isOnline && !isReconnecting && pendingRequests > 0) {
      // Automatically sync when coming back online
      syncPendingRequests();
    }
  }, [isOnline, isReconnecting, pendingRequests]);

  // Sync pending requests
  const syncPendingRequests = useCallback(async () => {
    if (!isOnline || isReconnecting || isSyncing) {
      return;
    }

    setIsSyncing(true);

    try {
      const result = await processPendingRequests();
      
      if (result.success > 0 || result.failed > 0) {
        toast({
          title: 'Offline Data Sync',
          description: `${result.success} request(s) synced, ${result.failed} failed.`,
          variant: result.failed > 0 ? 'warning' : 'default',
        });

        // Update pending count
        const requests = await getPendingRequests();
        setPendingRequests(requests.length);
      }
    } catch (error) {
      console.error('Error syncing pending requests:', error);
      toast({
        title: 'Sync Failed',
        description: 'Unable to sync offline data. Will try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSyncing(false);
    }
  }, [isOnline, isReconnecting, isSyncing, toast]);

  return {
    pendingRequests,
    isSyncing,
    syncPendingRequests,
    canSync: isOnline && !isReconnecting && pendingRequests > 0 && !isSyncing
  };
}
