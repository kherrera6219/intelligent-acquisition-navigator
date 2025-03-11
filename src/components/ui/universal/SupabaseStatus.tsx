
import React from 'react';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Database } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SupabaseStatusProps {
  className?: string;
}

export const SupabaseStatus: React.FC<SupabaseStatusProps> = ({ className = '' }) => {
  const { supabaseConnected, lastSyncTime } = useNetworkMonitor();
  
  const lastSyncText = lastSyncTime 
    ? `Last synced ${formatDistanceToNow(lastSyncTime, { addSuffix: true })}`
    : 'Not yet synced';
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-center space-x-1.5 cursor-help ${className}`}>
            <div className={`h-2 w-2 rounded-full ${supabaseConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <Database 
              className={`h-4 w-4 ${supabaseConnected ? 'text-green-500' : 'text-red-500'}`} 
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">
            {supabaseConnected 
              ? `Database connected. ${lastSyncText}.` 
              : 'Database disconnected. Some features may be limited.'
            }
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
