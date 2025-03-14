
import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { format } from 'date-fns';

interface NetworkStatus {
  isOnline: boolean;
  isReconnecting: boolean;
  lastOnlineAt?: Date;
  lastSyncTime?: Date;
}

export const OfflineStatusIndicator: React.FC<{ status: NetworkStatus }> = ({ status }) => {
  const { isOnline, isReconnecting, lastOnlineAt, lastSyncTime } = status;
  
  if (isOnline && !isReconnecting) {
    return null;
  }
  
  const formattedLastOnline = lastOnlineAt ? format(lastOnlineAt, 'h:mm a') : 'Unknown';
  const formattedLastSync = lastSyncTime ? format(lastSyncTime, 'h:mm a') : 'No sync yet';
  
  const statusText = isReconnecting 
    ? 'Reconnecting to server...' 
    : `Offline mode. Last online: ${formattedLastOnline}. Last sync: ${formattedLastSync}`;
  
  return (
    <Tooltip content={statusText}>
      <div className="inline-flex items-center gap-1.5 text-sm">
        {isReconnecting ? (
          <Wifi className="h-4 w-4 text-yellow-500 animate-pulse" />
        ) : (
          <WifiOff className="h-4 w-4 text-red-500" />
        )}
        <span className={isReconnecting ? 'text-yellow-500' : 'text-red-500'}>
          {isReconnecting ? 'Reconnecting...' : 'Offline'}
        </span>
      </div>
    </Tooltip>
  );
};
