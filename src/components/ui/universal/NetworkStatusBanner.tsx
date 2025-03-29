
import React from 'react';
import { AlertTriangle, Wifi, WifiOff, ServerOff, RefreshCw } from 'lucide-react';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { cn } from '@/lib/utils';

export const NetworkStatusBanner: React.FC = () => {
  const { isOnline, isReconnecting, supabaseConnected, reconnect } = useNetworkMonitor();
  
  // Don't render if everything is fine
  if (isOnline && supabaseConnected && !isReconnecting) {
    return null;
  }
  
  // Determine banner style based on state
  const getBannerStyle = () => {
    if (!isOnline) {
      return {
        className: 'bg-destructive/10 text-destructive border-destructive/20',
        icon: WifiOff
      };
    }
    
    if (isReconnecting) {
      return {
        className: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        icon: RefreshCw
      };
    }
    
    if (!supabaseConnected) {
      return {
        className: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        icon: ServerOff
      };
    }
    
    return {
      className: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      icon: Wifi
    };
  };
  
  const { className, icon: Icon } = getBannerStyle();
  
  return (
    <div className={cn(
      'ms-network-status-banner px-4 py-2 text-sm border-b flex items-center justify-between',
      className
    )}>
      <div className="flex items-center gap-2">
        <Icon className={cn(
          'h-4 w-4',
          isReconnecting && 'animate-spin'
        )} />
        <span>
          {!isOnline && 'You are offline. Check your internet connection.'}
          {isOnline && isReconnecting && 'Reconnecting to server...'}
          {isOnline && !supabaseConnected && !isReconnecting && 'Database connection issue. Some features may be unavailable.'}
        </span>
      </div>
      
      {isOnline && (
        <button 
          onClick={reconnect}
          className="text-xs px-2 py-1 rounded border hover:bg-background/50 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
};
