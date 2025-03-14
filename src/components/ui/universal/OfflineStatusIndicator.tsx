
import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { format } from 'date-fns';
import { NetworkStatus } from '@/types/dashboard';

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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
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
        </TooltipTrigger>
        <TooltipContent>
          <p>{statusText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
