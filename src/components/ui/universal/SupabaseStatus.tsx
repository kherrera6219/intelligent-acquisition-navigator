
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Database } from 'lucide-react';
import { useNetworkMonitor } from './NetworkMonitorProvider';

export const SupabaseStatus: React.FC = () => {
  const { isSupabaseConnected } = useNetworkMonitor();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center justify-center">
            <Database 
              className={`h-5 w-5 ${isSupabaseConnected ? 'text-green-500' : 'text-red-500'}`} 
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Supabase: {isSupabaseConnected ? 'Connected' : 'Disconnected'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
