
import { useEffect, useState } from 'react';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';
import { getPendingRequests, processPendingRequests, clearExpiredCache } from '@/utils/offlineStorage';

export const useOfflineSync = () => {
  const { isOnline, supabaseConnected } = useNetworkMonitor();
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Fetch pending requests
  const fetchPendingRequests = async () => {
    const requests = await getPendingRequests();
    setPendingRequests(requests);
    return requests;
  };

  // Process pending requests when online
  const syncOfflineData = async () => {
    if (!isOnline || !supabaseConnected || syncing) return;
    
    setSyncing(true);
    try {
      await processPendingRequests(async (request) => {
        try {
          await fetch(request.url, {
            method: request.method,
            headers: new Headers(request.headers),
            body: request.body
          });
        } catch (error) {
          console.error('Error processing offline request:', error);
          throw error; // Rethrow to prevent request deletion
        }
      });
      
      // Clear expired cache items
      await clearExpiredCache();
      
      // Update state after sync
      setLastSyncTime(new Date());
      await fetchPendingRequests();
    } catch (error) {
      console.error('Error during offline sync:', error);
    } finally {
      setSyncing(false);
    }
  };

  // Check for pending requests on mount and when connection state changes
  useEffect(() => {
    fetchPendingRequests();
    
    if (isOnline && supabaseConnected) {
      syncOfflineData();
    }
  }, [isOnline, supabaseConnected]);

  return {
    pendingRequests,
    hasPendingRequests: pendingRequests.length > 0,
    pendingRequestCount: pendingRequests.length,
    syncing,
    lastSyncTime,
    syncNow: syncOfflineData,
    refreshPendingRequests: fetchPendingRequests
  };
};
