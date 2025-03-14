
import React from 'react';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { useSupabaseHealth } from '@/hooks/useSupabaseHealth';
import { NetworkStatusTooltip } from './NetworkStatusTooltip';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export const NetworkStatusBanner = () => {
  const { isOnline, isReconnecting } = useNetworkMonitor();
  const { health, isChecking, checkHealth } = useSupabaseHealth();
  
  // Determine if Supabase connection is available - safely check for the status
  const supabaseConnected = health && 'status' in health ? health.status === 'available' : false;

  // Only show banner if there's an issue or we're reconnecting
  if (isOnline && supabaseConnected && !isReconnecting) {
    return null;
  }

  return (
    <div className={cn(
      "w-full px-4 py-2 flex justify-between items-center text-sm border-b transition-colors",
      !isOnline 
        ? "bg-destructive/10 border-destructive/20 text-destructive dark:bg-destructive/20" 
        : isReconnecting 
          ? "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400" 
          : "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400"
    )}>
      <div className="flex items-center gap-2">
        <NetworkStatusTooltip
          isOnline={isOnline}
          isReconnecting={isReconnecting}
          supabaseConnected={Boolean(supabaseConnected)}
        />
        <span className="sm:inline hidden">
          {!isOnline 
            ? "You're offline. Some features are unavailable." 
            : isReconnecting 
              ? "Reconnecting..." 
              : "Limited connection to services. Some features may be unavailable."}
        </span>
        <span className="sm:hidden inline">
          {!isOnline 
            ? "You're offline" 
            : isReconnecting 
              ? "Reconnecting..." 
              : "Limited connection"}
        </span>
      </div>
      
      <button 
        onClick={checkHealth}
        disabled={isChecking}
        className="text-xs flex items-center gap-1 px-2 py-1 bg-background/10 rounded hover:bg-background/20 transition-colors"
        aria-label="Check connection"
      >
        <RefreshCw className={cn("h-3 w-3", isChecking && "animate-spin")} />
        <span className="hidden sm:inline">Retry</span>
      </button>
    </div>
  );
};
