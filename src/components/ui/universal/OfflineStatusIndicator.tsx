
import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip/Tooltip';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { cn } from '@/lib/utils';

interface OfflineStatusIndicatorProps {
  compact?: boolean;
  className?: string;
}

export const OfflineStatusIndicator: React.FC<OfflineStatusIndicatorProps> = ({
  compact = false,
  className
}) => {
  const { isOnline, isReconnecting } = useNetworkMonitor();
  
  if (!isOnline || isReconnecting) {
    if (compact) {
      return (
        <Tooltip content={isReconnecting ? "Reconnecting..." : "You are offline"}>
          <div className={cn("flex items-center", className)}>
            {isReconnecting ? (
              <span className="flex h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
          </div>
        </Tooltip>
      );
    }
    
    return (
      <div className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full",
        isReconnecting ? "bg-yellow-500/10" : "bg-red-500/10",
        className
      )}>
        {isReconnecting ? (
          <>
            <span className="flex h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-sm text-yellow-500 font-medium">Reconnecting...</span>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-500 font-medium">Offline</span>
          </>
        )}
      </div>
    );
  }
  
  if (compact) {
    return null; // Don't show anything when online and in compact mode
  }
  
  return (
    <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10", className)}>
      <Wifi className="h-4 w-4 text-green-500" />
      <span className="text-sm text-green-500 font-medium">Online</span>
    </div>
  );
};
