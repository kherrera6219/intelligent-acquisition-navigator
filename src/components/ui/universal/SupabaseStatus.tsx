
import React from 'react';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { Badge } from "@/components/ui/badge";
import { Database, Wifi, WifiOff, RefreshCw, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from 'date-fns';

interface SupabaseStatusProps {
  showDetails?: boolean;
  className?: string;
}

export function SupabaseStatus({ showDetails = false, className = '' }: SupabaseStatusProps) {
  const { isOnline, reconnecting, supabaseConnected, lastSyncTime } = useNetworkMonitor();
  
  // Basic version with just a badge
  if (!showDetails) {
    if (reconnecting) {
      return (
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
          <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
          Reconnecting...
        </Badge>
      );
    }
    
    if (!isOnline) {
      return (
        <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
          <WifiOff className="h-3 w-3 mr-1" />
          Offline
        </Badge>
      );
    }
    
    if (!supabaseConnected) {
      return (
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
          <Database className="h-3 w-3 mr-1" />
          DB Disconnected
        </Badge>
      );
    }
    
    return (
      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
        <Database className="h-3 w-3 mr-1" />
        Connected
      </Badge>
    );
  }
  
  // Detailed version with more information
  return (
    <div className={`p-3 rounded-md border ${className} ${
      !isOnline ? 'bg-red-500/10 border-red-500/20' :
      !supabaseConnected ? 'bg-yellow-500/10 border-yellow-500/20' :
      'bg-green-500/10 border-green-500/20'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {!isOnline ? (
            <>
              <WifiOff className="h-4 w-4 text-red-400" />
              <span className="font-medium text-red-400">Offline</span>
            </>
          ) : reconnecting ? (
            <>
              <RefreshCw className="h-4 w-4 text-yellow-400 animate-spin" />
              <span className="font-medium text-yellow-400">Reconnecting...</span>
            </>
          ) : !supabaseConnected ? (
            <>
              <Database className="h-4 w-4 text-yellow-400" />
              <span className="font-medium text-yellow-400">Database Disconnected</span>
            </>
          ) : (
            <>
              <Database className="h-4 w-4 text-green-400" />
              <span className="font-medium text-green-400">Connected to Supabase</span>
            </>
          )}
        </div>
        
        {lastSyncTime && (
          <div className="flex items-center text-xs text-gray-400">
            <Clock className="h-3 w-3 mr-1" />
            <span>Last sync: {formatDistanceToNow(lastSyncTime, { addSuffix: true })}</span>
          </div>
        )}
      </div>
      
      {isOnline && !supabaseConnected && (
        <Button 
          size="sm" 
          variant="outline" 
          className="mt-2 text-xs"
          onClick={() => window.location.reload()}
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Reconnect
        </Button>
      )}
    </div>
  );
}
