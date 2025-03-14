
import React from 'react';
import { Tooltip } from '@/components/ui/tooltip/Tooltip';
import { cn } from '@/lib/utils';

interface NetworkStatusTooltipProps {
  isOnline: boolean;
  isReconnecting: boolean;
  supabaseConnected: boolean;
  className?: string;
}

export const NetworkStatusTooltip: React.FC<NetworkStatusTooltipProps> = ({
  isOnline,
  isReconnecting,
  supabaseConnected,
  className
}) => {
  let statusText = '';
  let statusColor = '';

  if (isReconnecting) {
    statusText = 'Reconnecting...';
    statusColor = 'bg-yellow-500';
  } else if (!isOnline) {
    statusText = 'Offline Mode';
    statusColor = 'bg-red-500';
  } else if (!supabaseConnected) {
    statusText = 'Limited Connectivity';
    statusColor = 'bg-amber-500';
  } else {
    statusText = 'Online';
    statusColor = 'bg-green-500';
  }

  return (
    <Tooltip content={statusText}>
      <div className={cn("flex items-center", className)}>
        <span className={cn("h-3 w-3 rounded-full", statusColor)} />
      </div>
    </Tooltip>
  );
};
