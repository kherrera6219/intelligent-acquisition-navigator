
import React from 'react';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { WifiOff, Wifi, RefreshCw, Database, DatabaseOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { Progress } from '@/components/ui/progress';

export function NetworkStatusBanner() {
  const { isOnline, reconnecting, supabaseConnected } = useNetworkMonitor();
  const { pendingCount, isSyncing, syncProgress, syncOfflineData } = useOfflineSync();
  
  // Don't show anything if online and connected
  if (isOnline && (supabaseConnected || pendingCount === 0) && !isSyncing) {
    return null;
  }
  
  return (
    <div className="sticky top-0 z-50 w-full">
      {!isOnline && (
        <div className="bg-red-500 text-white py-1 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <WifiOff className="h-4 w-4" />
            <span className="text-sm font-medium">You're offline. Some features may be limited.</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-xs py-1 px-2 h-auto"
            onClick={() => window.location.reload()}
          >
            Try Reconnecting
          </Button>
        </div>
      )}
      
      {isOnline && !supabaseConnected && (
        <div className="bg-orange-500 text-white py-1 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DatabaseOff className="h-4 w-4" />
            <span className="text-sm font-medium">Database connection issue. Some data may not sync.</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-xs py-1 px-2 h-auto"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      )}
      
      {isOnline && pendingCount > 0 && (
        <div className="bg-yellow-500 text-white py-1 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isSyncing ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Database className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">
              {isSyncing 
                ? `Syncing offline changes (${syncProgress}%)...` 
                : `${pendingCount} offline change${pendingCount !== 1 ? 's' : ''} pending sync`}
            </span>
          </div>
          {!isSyncing && (
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-xs py-1 px-2 h-auto"
              onClick={syncOfflineData}
            >
              Sync Now
            </Button>
          )}
        </div>
      )}
      
      {isSyncing && (
        <Progress value={syncProgress} className="h-1" indicatorClassName="bg-green-500" />
      )}
    </div>
  );
}
