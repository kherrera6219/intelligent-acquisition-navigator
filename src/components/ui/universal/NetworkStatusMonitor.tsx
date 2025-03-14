
import React from 'react';
import { useNetworkMonitor } from './NetworkMonitorProvider';

export const NetworkStatusMonitor: React.FC = () => {
  const { isOnline, isReconnecting, lastOnlineTime } = useNetworkMonitor();
  
  // This component is primarily for monitoring - it renders nothing visible
  return (
    <div className="hidden" aria-hidden="true">
      <div id="network-status-data" 
        data-is-online={isOnline.toString()} 
        data-is-reconnecting={isReconnecting.toString()} 
        data-last-online={lastOnlineTime?.toISOString() || ""}
      />
    </div>
  );
};
