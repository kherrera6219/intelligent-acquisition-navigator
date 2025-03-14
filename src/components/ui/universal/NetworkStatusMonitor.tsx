
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { NetworkStatusBanner } from './NetworkStatusBanner';

export const NetworkStatusMonitor = () => {
  const { isOnline, isReconnecting, supabaseConnected } = useNetworkMonitor();
  
  // Don't show the banner if all is well
  if (isOnline && !isReconnecting && supabaseConnected) {
    return null;
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
