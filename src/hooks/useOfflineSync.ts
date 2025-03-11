
import { useState, useEffect, useCallback } from 'react';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';
import { processPendingRequests, getPendingRequests } from '@/utils/offlineStorage';
import { useToast } from '@/hooks/use-toast';

export function useOfflineSync() {
  const { isOnline } = useNetworkMonitor();
  const [pendingCount, setPendingCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const { toast } = useToast();

  // Fetch the count of pending requests
  const fetchPendingCount = useCallback(async () => {
    try {
      const pendingRequests = await getPendingRequests();
      setPendingCount(pendingRequests.length);
    } catch (error) {
      console.error('Error fetching pending requests count:', error);
    }
  }, []);

  // Sync offline data when back online
  const syncOfflineData = useCallback(async () => {
    if (!isOnline || isSyncing) return;

    try {
      setIsSyncing(true);
      setSyncProgress(0);

      const result = await processPendingRequests((processed, total) => {
        const progress = Math.round((processed / total) * 100);
        setSyncProgress(progress);
      });

      if (result.successful > 0) {
        toast({
          title: "Sync Complete",
          description: `Successfully processed ${result.successful} offline ${result.successful === 1 ? 'action' : 'actions'}.`,
          variant: "default",
        });
      }

      if (result.failed > 0) {
        toast({
          title: "Sync Issues",
          description: `Failed to process ${result.failed} offline ${result.failed === 1 ? 'action' : 'actions'}. Some changes may need to be redone.`,
          variant: "destructive",
        });
      }

      // Re-fetch pending count after sync
      await fetchPendingCount();
    } catch (error) {
      console.error('Error syncing offline data:', error);
      toast({
        title: "Sync Error",
        description: "An error occurred while syncing your offline data.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
      setSyncProgress(100);
    }
  }, [isOnline, isSyncing, toast, fetchPendingCount]);

  // Auto-sync when coming back online
  useEffect(() => {
    if (isOnline && pendingCount > 0 && !isSyncing) {
      syncOfflineData();
    }
  }, [isOnline, pendingCount, isSyncing, syncOfflineData]);

  // Fetch pending count on mount and when online status changes
  useEffect(() => {
    fetchPendingCount();
    
    // Set up interval to periodically check for pending requests
    const intervalId = setInterval(fetchPendingCount, 30000); // every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [fetchPendingCount, isOnline]);

  return {
    isOnline,
    pendingCount,
    isSyncing,
    syncProgress,
    syncOfflineData,
    refreshPendingCount: fetchPendingCount
  };
}
