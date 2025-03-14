
import React from 'react';
import { Wifi, WifiOff, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface OfflineStatusIndicatorProps {
  className?: string;
  compact?: boolean;
}

export const OfflineStatusIndicator: React.FC<OfflineStatusIndicatorProps> = ({
  className,
  compact = false
}) => {
  const { isOnline, isReconnecting, lastOnlineTime } = useNetworkMonitor();
  
  const statusIcon = () => {
    if (isReconnecting) {
      return <Loader className="h-4 w-4 text-yellow-500 animate-spin" aria-hidden="true" />;
    }
    
    if (isOnline) {
      return <Wifi className="h-4 w-4 text-green-500" aria-hidden="true" />;
    }
    
    return <WifiOff className="h-4 w-4 text-red-500" aria-hidden="true" />;
  };
  
  const statusText = () => {
    if (isReconnecting) {
      return "Reconnecting...";
    }
    
    if (isOnline) {
      return "Online";
    }
    
    return "Offline";
  };
  
  const tooltipText = () => {
    if (isReconnecting) {
      return "Trying to reconnect to the network...";
    }
    
    if (isOnline) {
      return "Connected to the network";
    }
    
    if (lastOnlineTime) {
      return `Offline. Last connected: ${lastOnlineTime.toLocaleString()}`;
    }
    
    return "Offline. No recent connection.";
  };
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "flex items-center gap-2",
            isOnline ? "network-status-online" : "network-status-offline",
            isReconnecting && "network-status-reconnecting",
            className
          )}
          aria-live="polite"
          role="status"
        >
          {statusIcon()}
          {!compact && <span className="text-sm">{statusText()}</span>}
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{tooltipText()}</p>
      </TooltipContent>
    </Tooltip>
  );
};
