
import { useState, useEffect, useCallback } from 'react';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';
import { getPendingRequests, processPendingRequests } from '@/utils/offlineStorage';

export const useOfflineSync = () => {
  const { isOnline } = useNetworkMonitor();
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Get pending requests count
  const pendingRequestCount = pendingRequests.length;
  const hasPendingRequests = pendingRequestCount > 0;

  // Refresh pending requests from IndexedDB
  const refreshPendingRequests = useCallback(async () => {
    try {
      const requests = await getPendingRequests();
      setPendingRequests(requests);
      return requests;
    } catch (error) {
      console.error('Failed to refresh pending requests:', error);
      return [];
    }
  }, []);

  // Sync pending requests
  const syncNow = useCallback(async () => {
    if (!isOnline || syncing || !hasPendingRequests) return;
    
    setSyncing(true);
    try {
      await processPendingRequests(async (request) => {
        // This is a placeholder for actually processing the request
        // In a real app, you would make the API call based on the request data
        console.log('Processing request:', request);
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      });
      
      // After processing, refresh the list
      await refreshPendingRequests();
      setLastSyncTime(new Date());
    } catch (error) {
      console.error('Failed to sync pending requests:', error);
    } finally {
      setSyncing(false);
    }
  }, [isOnline, syncing, hasPendingRequests, refreshPendingRequests]);

  // Load pending requests on mount
  useEffect(() => {
    refreshPendingRequests();
  }, [refreshPendingRequests]);

  // Auto-sync when online
  useEffect(() => {
    if (isOnline && hasPendingRequests && !syncing) {
      syncNow();
    }
  }, [isOnline, hasPendingRequests, syncing, syncNow]);

  return {
    pendingRequests,
    hasPendingRequests,
    pendingRequestCount,
    syncing,
    lastSyncTime,
    syncNow,
    refreshPendingRequests
  };
};
