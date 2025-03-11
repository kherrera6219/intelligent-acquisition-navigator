
import { useState, useEffect, useCallback } from 'react';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';
import { processPendingRequests, getPendingRequests } from '@/utils/offlineStorage';
import { useToast } from '@/hooks/use-toast';
import { setLastSyncTime } from '@/utils/supabaseHelper';

export function useOfflineSync() {
  const { isOnline, supabaseConnected } = useNetworkMonitor();
  const [pendingCount, setPendingCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [lastSyncTime, setLastSyncTimeState] = useState<Date | null>(null);
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
    if (!isOnline || !supabaseConnected || isSyncing) return;

    try {
      setIsSyncing(true);
      setSyncProgress(0);

      const result = await processPendingRequests((processed, total) => {
        const progress = Math.round((processed / total) * 100);
        setSyncProgress(progress);
      });

      if (result.successful > 0 || result.failed > 0) {
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
      }

      const now = new Date();
      setLastSyncTimeState(now);
      // Update global last sync time
      setLastSyncTime(now);
      
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

      // Reset progress after a short delay
      setTimeout(() => {
        setSyncProgress(0);
      }, 1000);
    }
  }, [isOnline, supabaseConnected, isSyncing, toast, fetchPendingCount]);

  // Auto-sync when coming back online
  useEffect(() => {
    if (isOnline && supabaseConnected && pendingCount > 0 && !isSyncing) {
      syncOfflineData();
    }
  }, [isOnline, supabaseConnected, pendingCount, isSyncing, syncOfflineData]);

  // Fetch pending count on mount and when connection status changes
  useEffect(() => {
    fetchPendingCount();
    
    // Set up interval to periodically check for pending requests
    const intervalId = setInterval(fetchPendingCount, 30000); // every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [fetchPendingCount, isOnline, supabaseConnected]);

  return {
    isOnline,
    supabaseConnected,
    pendingCount,
    isSyncing,
    syncProgress,
    syncOfflineData,
    refreshPendingCount: fetchPendingCount,
    lastSyncTime
  };
}
