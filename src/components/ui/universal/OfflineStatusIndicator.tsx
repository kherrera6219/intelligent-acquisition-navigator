
import React from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { formatDistanceToNow } from 'date-fns';
import { Tooltip } from '@/components/ui/tooltip';
import { NetworkStatusIcon } from './NetworkStatusIcon';

interface OfflineStatusIndicatorProps {
  compact?: boolean;
  className?: string;
}

export const OfflineStatusIndicator: React.FC<OfflineStatusIndicatorProps> = ({
  compact = false,
  className
}) => {
  const { isOnline, lastOnlineAt, lastSyncTime } = useNetworkStatus();

  if (compact) {
    return (
      <Tooltip content={isOnline ? 'Online' : 'Offline Mode'}>
        <div className={className}>
          <NetworkStatusIcon 
            isOnline={isOnline} 
            status={isOnline ? 'online' : 'offline'} 
            className="h-4 w-4" 
          />
        </div>
      </Tooltip>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <NetworkStatusIcon 
        isOnline={isOnline} 
        status={isOnline ? 'online' : 'offline'} 
        className="h-5 w-5" 
      />
      <span className="text-sm font-medium">
        {isOnline 
          ? 'Online' 
          : `Offline (Last online: ${lastOnlineAt ? formatDistanceToNow(lastOnlineAt, { addSuffix: true }) : 'unknown'})`
        }
      </span>
      {lastSyncTime && (
        <span className="text-xs text-muted-foreground">
          Last sync: {formatDistanceToNow(lastSyncTime, { addSuffix: true })}
        </span>
      )}
    </div>
  );
};
