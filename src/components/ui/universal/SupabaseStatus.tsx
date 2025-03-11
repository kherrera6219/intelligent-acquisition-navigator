
import { useState } from 'react';
import { Database } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { format } from 'date-fns';

export function SupabaseStatus() {
  const { supabaseConnected, lastSyncTime } = useNetworkMonitor();
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-help">
            <div className={`h-2 w-2 rounded-full ${supabaseConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <Database className="h-4 w-4 text-gray-400" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="p-1">
            <p className="font-medium text-sm">
              Database Status: {supabaseConnected ? 'Connected' : 'Disconnected'}
            </p>
            {lastSyncTime && (
              <p className="text-xs text-gray-400 mt-1">
                Last synced: {format(lastSyncTime, 'MMM d, yyyy h:mm a')}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
