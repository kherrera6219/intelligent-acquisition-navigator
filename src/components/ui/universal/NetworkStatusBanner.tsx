
import React from 'react';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { WifiOff, Wifi, RefreshCw, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export interface NetworkStatusBannerProps {
  isOnline?: boolean;
}

export function NetworkStatusBanner(props: NetworkStatusBannerProps) {
  const { isOnline: isOnlineFromProps } = props;
  const networkInfo = useNetworkMonitor();
  
  // Use the prop value if provided, otherwise use the context value
  const isOnline = isOnlineFromProps !== undefined ? isOnlineFromProps : networkInfo?.isOnline;
  const { reconnecting, supabaseConnected, lastSyncTime } = networkInfo || {};
  
  // Don't show anything if online and connected
  if (isOnline && supabaseConnected) {
    return null;
  }
  
  return (
    <div className="sticky top-0 z-50 w-full" role="alert" aria-live="assertive">
      {!isOnline && (
        <div className="bg-red-600 text-white py-1 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <WifiOff className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm font-medium">You're offline. Some features may be limited.</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white border-white/40 text-xs py-1 px-2 h-auto"
            onClick={() => window.location.reload()}
            aria-label="Try reconnecting"
          >
            Try Reconnecting
          </Button>
        </div>
      )}
      
      {isOnline && !supabaseConnected && (
        <div className="bg-orange-600 text-white py-1 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="h-4 w-4 opacity-80" aria-hidden="true" />
            <span className="text-sm font-medium">Database connection issue. Some data may not sync.</span>
            {lastSyncTime && (
              <span className="text-xs opacity-80">
                Last sync: {new Date(lastSyncTime).toLocaleString()}
              </span>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white border-white/40 text-xs py-1 px-2 h-auto"
            onClick={() => window.location.reload()}
            aria-label="Try reconnecting to database"
          >
            Try Again
          </Button>
        </div>
      )}
      
      {reconnecting && (
        <Progress 
          value={50} 
          className="h-1" 
          aria-label="Reconnecting progress"
        />
      )}
    </div>
  );
}
