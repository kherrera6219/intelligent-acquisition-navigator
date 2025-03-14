
import { useState, useEffect, useCallback } from 'react';
import { useToast } from './use-toast';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';
import { getPendingRequests, getPendingRequestCount, deletePendingRequest, processPendingRequests, clearExpiredCache } from '@/utils/offlineStorage';

export function useOfflineSync() {
  const [pendingRequests, setPendingRequests] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [canSync, setCanSync] = useState<boolean>(false);
  const { isOnline, supabaseConnected } = useNetworkMonitor();
  const { toast } = useToast();

  // Check for pending requests
  const checkPendingRequests = useCallback(async () => {
    try {
      const count = await getPendingRequestCount();
      setPendingRequests(count);
      setCanSync(count > 0 && isOnline && supabaseConnected);
    } catch (error) {
      console.error('Error checking pending requests:', error);
    }
  }, [isOnline, supabaseConnected]);

  // Sync pending requests
  const syncPendingRequests = useCallback(async () => {
    if (!isOnline || !supabaseConnected || isSyncing) return;
    
    setIsSyncing(true);
    
    try {
      const { successful, failed } = await processPendingRequests();
      
      if (successful > 0 || failed > 0) {
        toast({
          title: failed > 0 ? 'Sync completed with issues' : 'Sync completed',
          description: `${successful} ${successful === 1 ? 'request' : 'requests'} synchronized, ${failed} failed.`,
          variant: failed > 0 ? 'destructive' : 'default',
        });
      }
      
      // Clear any expired cache items
      await clearExpiredCache();
      
      // Update pending requests count
      checkPendingRequests();
    } catch (error) {
      console.error('Error syncing pending requests:', error);
      toast({
        title: 'Sync failed',
        description: 'An error occurred while trying to synchronize data.',
        variant: 'destructive',
      });
    } finally {
      setIsSyncing(false);
    }
  }, [isOnline, supabaseConnected, isSyncing, toast, checkPendingRequests]);

  // Auto-sync when coming back online
  useEffect(() => {
    if (isOnline && supabaseConnected && pendingRequests > 0 && !isSyncing) {
      syncPendingRequests();
    }
  }, [isOnline, supabaseConnected, pendingRequests, isSyncing, syncPendingRequests]);

  // Check for pending requests on mount and when network status changes
  useEffect(() => {
    checkPendingRequests();
    
    // Set up interval to check for pending requests
    const interval = setInterval(checkPendingRequests, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, [isOnline, supabaseConnected, checkPendingRequests]);

  return {
    pendingRequests,
    isSyncing,
    syncPendingRequests,
    canSync
  };
}
