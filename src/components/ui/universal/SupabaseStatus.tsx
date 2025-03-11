
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import { useNetworkMonitor } from './NetworkMonitorProvider';

export const SupabaseStatus: React.FC = () => {
  const { isOnline } = useNetworkMonitor();
  
  return (
    <Tooltip 
      content={isOnline ? 'Connected to Supabase' : 'Disconnected from Supabase'}
    >
      <Badge variant={isOnline ? "default" : "destructive"} className="h-2 w-2 rounded-full p-0">
        <span className="sr-only">{isOnline ? 'Supabase Connected' : 'Supabase Disconnected'}</span>
      </Badge>
    </Tooltip>
  );
};
