
import React from 'react';
import { AlertTriangle, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { formatDistanceToNow } from 'date-fns';

export interface NetworkStatusBannerProps {
  className?: string;
}

export const NetworkStatusBanner: React.FC<NetworkStatusBannerProps> = ({ className }) => {
  const { isOnline, isReconnecting, checkConnection, lastSyncTime } = useNetworkMonitor();

  // Don't render if online and not reconnecting
  if (isOnline && !isReconnecting) {
    return null;
  }

  return (
    <Alert 
      variant={isReconnecting ? "warning" : "destructive"} 
      className={`mb-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isReconnecting ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Reconnecting to network...</span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4" />
              <span>You are currently offline.</span>
              {lastSyncTime && (
                <span className="text-sm opacity-75">
                  Last online {formatDistanceToNow(lastSyncTime, { addSuffix: true })}
                </span>
              )}
            </>
          )}
        </div>
        
        {!isReconnecting && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => checkConnection()}
            className="ml-2"
          >
            Try reconnecting
          </Button>
        )}
      </div>
    </Alert>
  );
};
