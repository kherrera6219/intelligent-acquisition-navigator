
import React, { useState, useEffect } from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { WifiOff, RefreshCw, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getFailedRequests, retryAllFailedRequests } from '@/utils/offlineFetch';

interface NetworkStatusBannerProps {
  className?: string;
}

const NetworkStatusBanner: React.FC<NetworkStatusBannerProps> = ({ className }) => {
  const isOnline = useNetworkStatus();
  const [isVisible, setIsVisible] = useState(!isOnline);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pendingSync, setPendingSync] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  // Check for pending syncs
  useEffect(() => {
    let isMounted = true;
    
    const checkPendingSyncs = async () => {
      try {
        const failedRequests = await getFailedRequests();
        if (isMounted) {
          setPendingSync(failedRequests.length);
        }
      } catch (error) {
        console.error('Error checking pending syncs:', error);
      }
    };

    // Check immediately and then every 5 seconds
    checkPendingSyncs();
    const interval = setInterval(checkPendingSyncs, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Update visibility based on online status
  useEffect(() => {
    setIsVisible(!isOnline || pendingSync > 0);
  }, [isOnline, pendingSync]);

  // Listen for online event to try to sync
  useEffect(() => {
    const handleOnline = async () => {
      if (pendingSync > 0) {
        setIsSyncing(true);
        try {
          await retryAllFailedRequests();
          // Recheck pending syncs
          const failedRequests = await getFailedRequests();
          setPendingSync(failedRequests.length);
        } finally {
          setIsSyncing(false);
        }
      }
    };

    window.addEventListener('online', handleOnline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, [pendingSync]);

  const handleRefresh = () => {
    setIsAnimating(true);
    window.location.reload();
  };

  const handleSync = async () => {
    if (!isOnline) return;
    
    setIsSyncing(true);
    try {
      await retryAllFailedRequests();
      // Recheck pending syncs after retry
      const failedRequests = await getFailedRequests();
      setPendingSync(failedRequests.length);
    } catch (error) {
      console.error('Error syncing:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 animate-in fade-in slide-in-from-bottom duration-300",
        className
      )}
    >
      {!isOnline ? (
        <Alert variant="destructive" className="border-red-600 bg-red-600/90 backdrop-blur-sm text-white">
          <WifiOff className="h-5 w-5" />
          <AlertTitle className="text-white">You are currently offline</AlertTitle>
          <AlertDescription className="text-white/90 flex items-center justify-between">
            <span>Some features may be unavailable until your connection is restored.</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/20 hover:bg-white/30 text-white border-white/40 mt-2 md:mt-0"
              onClick={handleRefresh}
            >
              <RefreshCw className={cn("h-4 w-4 mr-2", isAnimating && "animate-spin")} />
              Refresh
            </Button>
          </AlertDescription>
        </Alert>
      ) : pendingSync > 0 ? (
        <Alert variant="destructive" className="border-amber-600 bg-amber-600/90 backdrop-blur-sm text-white">
          <Upload className="h-5 w-5" />
          <AlertTitle className="text-white">
            {isSyncing ? 'Syncing changes...' : `You have ${pendingSync} pending ${pendingSync === 1 ? 'change' : 'changes'} to sync`}
          </AlertTitle>
          <AlertDescription className="text-white/90 flex items-center justify-between">
            <span>Your changes will be saved to the server once synced.</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/20 hover:bg-white/30 text-white border-white/40 mt-2 md:mt-0"
              onClick={handleSync}
              disabled={isSyncing}
            >
              <RefreshCw className={cn("h-4 w-4 mr-2", isSyncing && "animate-spin")} />
              {isSyncing ? 'Syncing...' : 'Sync Now'}
            </Button>
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
};

export default NetworkStatusBanner;
