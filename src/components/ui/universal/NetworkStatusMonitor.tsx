
import React from 'react';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { NetworkStatusBanner } from './NetworkStatusBanner';
import { NetworkStatusTooltip } from './NetworkStatusTooltip';

export const NetworkStatusMonitor = () => {
  const { isOnline, isReconnecting, supabaseConnected } = useNetworkMonitor();
  
  // Don't show the banner if all is well
  if (isOnline && !isReconnecting && supabaseConnected) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <NetworkStatusTooltip 
          isOnline={isOnline} 
          isReconnecting={isReconnecting}
          supabaseConnected={supabaseConnected}
          className="bg-secondary/80 backdrop-blur-sm p-2 rounded-full shadow-md"
        />
      </div>
    );
  }
  
  return (
    <NetworkStatusBanner 
      isOffline={!isOnline}
      isReconnecting={isReconnecting}
      message={
        !isOnline 
          ? "You're offline. Some features may be unavailable." 
          : isReconnecting 
            ? "Reconnecting to the server..." 
            : "Limited connectivity. Some features may be unavailable."
      }
      variant={!isOnline ? 'destructive' : 'warning'}
    />
  );
};
