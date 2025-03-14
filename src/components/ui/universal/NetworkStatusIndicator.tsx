
import React from 'react';
import { NetworkStatus } from '@/types/dashboard';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface NetworkStatusIndicatorProps {
  status: NetworkStatus;
  compact?: boolean;
  className?: string;
}

export const NetworkStatusIndicator: React.FC<NetworkStatusIndicatorProps> = ({
  status,
  compact = false,
  className
}) => {
  const { isOnline, isReconnecting, lastOnlineAt, lastSyncTime } = status;
  
  const getIcon = () => {
    if (isReconnecting) return <RefreshCw className="h-4 w-4 animate-spin text-yellow-500" />;
    return isOnline 
      ? <Wifi className="h-4 w-4 text-green-500" /> 
      : <WifiOff className="h-4 w-4 text-red-500" />;
  };
  
  const getStatusText = () => {
    if (isReconnecting) return "Reconnecting...";
    return isOnline ? "Online" : "Offline";
  };
  
  const getTooltipContent = () => {
    let content = getStatusText();
    
    if (!isOnline && lastOnlineAt) {
      content += ` (Last online ${formatDistanceToNow(lastOnlineAt)} ago)`;
    }
    
    if (lastSyncTime) {
      content += `\nLast synced: ${formatDistanceToNow(lastSyncTime)} ago`;
    }
    
    return content;
  };

  if (compact) {
    return (
      <Tooltip content={getTooltipContent()}>
        <div className={cn("flex items-center", className)} aria-live="polite">
          {getIcon()}
          <span className="sr-only">{getStatusText()}</span>
        </div>
      </Tooltip>
    );
  }
  
  return (
    <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/50", className)} aria-live="polite">
      {getIcon()}
      <span className="text-sm font-medium">
        {getStatusText()}
      </span>
    </div>
  );
};
