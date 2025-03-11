
import React from 'react';
import { Database, DatabaseOff } from 'lucide-react';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const SupabaseStatus: React.FC = () => {
  const { supabaseConnected, isOnline } = useNetworkMonitor();
  
  const getStatusColor = () => {
    if (!isOnline) return 'text-red-500';
    return supabaseConnected ? 'text-green-500' : 'text-yellow-500';
  };
  
  const getStatusText = () => {
    if (!isOnline) return 'Offline';
    return supabaseConnected ? 'Connected to Database' : 'Database Connection Issue';
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-1 cursor-help">
            {supabaseConnected && isOnline ? (
              <Database className={`h-4 w-4 ${getStatusColor()}`} />
            ) : (
              <DatabaseOff className={`h-4 w-4 ${getStatusColor()}`} />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getStatusText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
