
import React from 'react';
import { NetworkStatusBanner } from './NetworkStatusBanner';
import { useNetworkMonitor } from './NetworkMonitorProvider';

// No props needed since we access state via context
export const NetworkStatusMonitor: React.FC = () => {
  const { isOnline, isReconnecting, supabaseConnected } = useNetworkMonitor();
  
  // Only show if there's an issue
  if (isOnline && supabaseConnected && !isReconnecting) {
    return null;
  }
  
  return <NetworkStatusBanner />;
};
