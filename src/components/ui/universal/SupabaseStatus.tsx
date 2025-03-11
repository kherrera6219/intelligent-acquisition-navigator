
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useNetworkMonitor } from './NetworkMonitorProvider';

export const SupabaseStatus: React.FC = () => {
  const { isOnline } = useNetworkMonitor();
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={isOnline ? "success" : "destructive"} className="h-2 w-2 rounded-full p-0">
            <span className="sr-only">{isOnline ? 'Supabase Connected' : 'Supabase Disconnected'}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isOnline ? 'Connected to Supabase' : 'Disconnected from Supabase'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
