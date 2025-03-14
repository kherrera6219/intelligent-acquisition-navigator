
import React from 'react';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { Tooltip } from '@/components/ui/tooltip';
import { format } from 'date-fns';

interface OfflineStatusIndicatorProps {
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const OfflineStatusIndicator: React.FC<OfflineStatusIndicatorProps> = ({
  className = '',
  showLabel = false,
  size = 'md'
}) => {
  const { isOnline, isReconnecting, supabaseConnected, lastSyncTime } = useNetworkMonitor();

  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'h-3 w-3';
      case 'lg': return 'h-5 w-5';
      case 'md':
      default: return 'h-4 w-4';
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'sm': return 'text-xs';
      case 'lg': return 'text-base';
      case 'md':
      default: return 'text-sm';
    }
  };

  const getLabelText = () => {
    if (!isOnline) return 'Offline';
    if (isReconnecting) return 'Reconnecting...';
    if (!supabaseConnected) return 'Limited Connectivity';
    return 'Online';
  };

  const getTooltipText = () => {
    if (!isOnline) {
      return 'You are currently offline. Some features may be unavailable.';
    }
    
    if (isReconnecting) {
      return 'Reconnecting to the server...';
    }
    
    if (!supabaseConnected) {
      return 'Connected to the internet, but unable to reach the server.';
    }
    
    return lastSyncTime 
      ? `Online. Last synchronized: ${format(lastSyncTime, 'MMM d, yyyy h:mm:ss a')}`
      : 'Online. All systems operational.';
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Tooltip content={getTooltipText()}>
        <div className="flex items-center">
          {!isOnline ? (
            <WifiOff className={`${getIconSize()} text-destructive`} />
          ) : isReconnecting ? (
            <RefreshCw className={`${getIconSize()} text-warning animate-spin`} />
          ) : !supabaseConnected ? (
            <Wifi className={`${getIconSize()} text-warning`} />
          ) : (
            <Wifi className={`${getIconSize()} text-success`} />
          )}
          
          {showLabel && (
            <span className={`ml-1 ${getFontSize()} ${
              !isOnline ? 'text-destructive' : 
              isReconnecting ? 'text-warning' : 
              !supabaseConnected ? 'text-warning' : 
              'text-success'
            }`}>
              {getLabelText()}
            </span>
          )}
        </div>
      </Tooltip>
    </div>
  );
};
