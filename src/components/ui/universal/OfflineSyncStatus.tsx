
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DatabaseZap, WifiOff } from 'lucide-react';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { useOfflineSync } from '@/hooks/useOfflineSync';

interface OfflineSyncStatusProps {
  className?: string;
  compact?: boolean;
}

export const OfflineSyncStatus: React.FC<OfflineSyncStatusProps> = ({ 
  className = '',
  compact = false 
}) => {
  const { isOnline } = useNetworkMonitor();
  const { pendingRequestCount, syncing, syncNow } = useOfflineSync();

  // Don't show if there are no pending requests
  if (pendingRequestCount === 0) return null;

  return (
    <div className={`${className} ${compact ? 'p-2' : 'p-4'} bg-secondary/50 border border-secondary rounded-md shadow-sm`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {isOnline ? (
            <DatabaseZap className="h-4 w-4 text-primary" />
          ) : (
            <WifiOff className="h-4 w-4 text-muted-foreground" />
          )}
          <span className={`${compact ? 'text-sm' : 'text-base'} font-medium`}>
            {isOnline ? 'Sync Pending Changes' : 'Offline Changes'}
          </span>
        </div>
        
        {isOnline && (
          <Button
            variant="outline"
            size="sm"
            onClick={syncNow}
            disabled={syncing || !isOnline}
          >
            {syncing ? 'Syncing...' : 'Sync Now'}
          </Button>
        )}
      </div>
      
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-muted-foreground">
          {pendingRequestCount} {pendingRequestCount === 1 ? 'change' : 'changes'} pending
        </span>
        {syncing && (
          <span className="text-xs text-muted-foreground">Syncing...</span>
        )}
      </div>
      
      {syncing && (
        <Progress value={33} className="h-1" />
      )}
    </div>
  );
};
