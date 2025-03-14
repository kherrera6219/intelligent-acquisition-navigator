
import React from 'react';
import { Tooltip } from '@/components/ui/tooltip';
import { Wifi, WifiOff, LucideIcon, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NetworkStatusTooltipProps {
  isOnline: boolean;
  isReconnecting: boolean;
  className?: string;
  children?: React.ReactNode;
  supabaseConnected?: boolean;
}

export const NetworkStatusTooltip: React.FC<NetworkStatusTooltipProps> = ({
  isOnline,
  isReconnecting,
  className,
  children,
  supabaseConnected = true
}) => {
  let tooltipContent = '';
  let Icon: LucideIcon;
  let statusClass = '';

  if (!isOnline) {
    tooltipContent = "You're offline. Some features may be unavailable.";
    Icon = WifiOff;
    statusClass = 'text-destructive';
  } else if (isReconnecting) {
    tooltipContent = "Reconnecting to server...";
    Icon = RefreshCw;
    statusClass = 'text-warning animate-spin';
  } else if (!supabaseConnected) {
    tooltipContent = "Limited connectivity to database. Some features may be unavailable.";
    Icon = Wifi;
    statusClass = 'text-warning';
  } else {
    tooltipContent = "You're online and connected.";
    Icon = Wifi;
    statusClass = 'text-success';
  }

  return (
    <Tooltip
      content={tooltipContent}
      side="left"
      align="center"
    >
      <div className={cn("flex items-center", className)}>
        {children ? (
          children
        ) : (
          <Icon className={cn("h-4 w-4", statusClass)} />
        )}
      </div>
    </Tooltip>
  );
};
