
import React from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { NetworkStatusIcon } from './NetworkStatusIcon';

export interface OfflineStatusIndicatorProps {
  compact?: boolean;
}

export const OfflineStatusIndicator: React.FC<OfflineStatusIndicatorProps> = ({ 
  compact = false 
}) => {
  const { isOnline, lastOnlineAt, lastSyncTime } = useNetworkStatus();
  
  if (isOnline) {
    return null;
  }
  
  if (compact) {
    return (
      <div className="inline-flex items-center rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-500/20">
        <NetworkStatusIcon status="offline" className="mr-1 h-3 w-3" />
        Offline
      </div>
    );
  }

  return (
    <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-900/20">
      <div className="flex">
        <div className="flex-shrink-0">
          <NetworkStatusIcon status="offline" className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Offline Mode</h3>
          <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
            <p>
              You are currently working offline. Changes will be synced when you reconnect.
              {lastSyncTime && (
                <span className="block mt-1 text-xs">
                  Last synced: {new Date(lastSyncTime).toLocaleString()}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineStatusIndicator;
