
import React from 'react';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { Database, DatabaseOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SupabaseStatusProps {
  showDetails?: boolean;
  compact?: boolean;
  className?: string;
}

export function SupabaseStatus({ 
  showDetails = false,
  compact = true,
  className = '' 
}: SupabaseStatusProps) {
  const { isOnline, supabaseConnected, lastSyncTime } = useNetworkMonitor();
  
  // Format last sync time 
  const formatLastSync = () => {
    if (!lastSyncTime) return 'Never';
    
    const now = new Date();
    const diffMs = now.getTime() - lastSyncTime.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };
  
  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge 
              variant="outline" 
              className={cn(
                "cursor-default",
                supabaseConnected 
                  ? "bg-green-500/10 text-green-400 border-green-500/20" 
                  : "bg-orange-500/10 text-orange-400 border-orange-500/20",
                className
              )}
            >
              {supabaseConnected ? (
                <Database className="h-3 w-3 mr-1" />
              ) : (
                <DatabaseOff className="h-3 w-3 mr-1" />
              )}
              Supabase {supabaseConnected ? 'Connected' : 'Disconnected'}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Last synchronized: {formatLastSync()}</p>
            {!isOnline && <p>Reconnect to sync with the database</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  if (showDetails) {
    return (
      <div className={cn(
        "p-3 rounded-md flex items-start space-x-3",
        supabaseConnected 
          ? "bg-green-500/10 border border-green-500/20" 
          : "bg-orange-500/10 border border-orange-500/20",
        className
      )}>
        <div className="flex-shrink-0 mt-0.5">
          {supabaseConnected ? (
            <CheckCircle2 className="h-5 w-5 text-green-400" />
          ) : (
            <AlertCircle className="h-5 w-5 text-orange-400" />
          )}
        </div>
        <div>
          <h4 className={cn(
            "text-sm font-medium",
            supabaseConnected ? "text-green-500" : "text-orange-500"
          )}>
            Supabase {supabaseConnected ? 'Connected' : 'Disconnected'}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Last synchronized: {formatLastSync()}
          </p>
          {!isOnline && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              You're currently working offline. Your changes will sync when your connection is restored.
            </p>
          )}
        </div>
      </div>
    );
  }
  
  // Simple version
  return (
    <div className={cn(
      "flex items-center p-2 rounded-md",
      supabaseConnected 
        ? "bg-green-500/10 text-green-500" 
        : "bg-orange-500/10 text-orange-500",
      className
    )}>
      {supabaseConnected ? (
        <Database className="h-4 w-4 mr-2" />
      ) : (
        <DatabaseOff className="h-4 w-4 mr-2" />
      )}
      <span className="text-sm">
        Supabase {supabaseConnected ? 'Connected' : 'Disconnected'}
      </span>
    </div>
  );
}
