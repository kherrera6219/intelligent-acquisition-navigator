
import React from 'react';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { WifiOff, Upload, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface OfflineSyncStatusProps {
  showControls?: boolean;
  compact?: boolean;
  className?: string;
}

export function OfflineSyncStatus({ 
  showControls = true,
  compact = false,
  className = ''
}: OfflineSyncStatusProps) {
  const { 
    isOnline, 
    pendingCount, 
    isSyncing,
    syncProgress, 
    syncOfflineData 
  } = useOfflineSync();
  
  if (compact) {
    // Compact version for headers or small spaces
    if (!isOnline) {
      return (
        <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
          <WifiOff className="h-3 w-3 mr-1" />
          Offline
        </Badge>
      );
    }
    
    if (pendingCount > 0) {
      return (
        <Badge 
          variant="outline" 
          className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 cursor-pointer"
          onClick={() => !isSyncing && syncOfflineData()}
        >
          {isSyncing ? (
            <>
              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
              Syncing
            </>
          ) : (
            <>
              <Upload className="h-3 w-3 mr-1" />
              {pendingCount} pending
            </>
          )}
        </Badge>
      );
    }
    
    return null; // Don't show anything when online and no pending operations
  }
  
  // Full version
  if (!isOnline) {
    return (
      <div className={`p-2 rounded-md bg-red-500/10 border border-red-500/20 ${className}`}>
        <div className="flex items-center">
          <WifiOff className="h-4 w-4 text-red-400 mr-2" />
          <span className="text-sm text-red-400">You're offline. Changes will sync when you reconnect.</span>
        </div>
      </div>
    );
  }
  
  if (pendingCount > 0 || isSyncing) {
    return (
      <div className={`p-3 rounded-md bg-yellow-500/10 border border-yellow-500/20 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isSyncing ? (
              <RefreshCw className="h-4 w-4 text-yellow-400 mr-2 animate-spin" />
            ) : (
              <Upload className="h-4 w-4 text-yellow-400 mr-2" />
            )}
            <span className="text-sm text-yellow-400">
              {isSyncing
                ? `Syncing offline changes (${syncProgress}%)...`
                : `${pendingCount} operation${pendingCount > 1 ? 's' : ''} pending to sync`}
            </span>
          </div>
          
          {showControls && !isSyncing && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs bg-yellow-500/20 border-yellow-500/30 hover:bg-yellow-500/30 text-yellow-400"
              onClick={syncOfflineData}
            >
              Sync Now
            </Button>
          )}
        </div>
        
        {isSyncing && (
          <Progress value={syncProgress} className="h-1 mt-2" indicatorClassName="bg-yellow-500" />
        )}
      </div>
    );
  }
  
  return null; // Don't show anything when online and no pending operations
}
