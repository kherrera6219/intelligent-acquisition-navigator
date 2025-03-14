
import React from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface OfflineStatusIndicatorProps {
  compact?: boolean;
  showButton?: boolean;
}

export const OfflineStatusIndicator: React.FC<OfflineStatusIndicatorProps> = ({
  compact = false,
  showButton = false,
}) => {
  const { isOnline, reconnecting, supabaseConnected, lastSyncTime, lastOnlineTime } = useNetworkMonitor();

  // Don't show anything if we're online and connected
  if (isOnline && supabaseConnected && !reconnecting && compact) {
    return null;
  }

  const getStatusText = () => {
    if (!isOnline) {
      return 'Offline';
    }
    if (reconnecting) {
      return 'Reconnecting...';
    }
    if (!supabaseConnected) {
      return 'Connection limited';
    }
    return 'Online';
  };

  const getTooltipText = () => {
    if (!isOnline) {
      return 'You are currently offline. Changes will be saved locally and synced when you reconnect.';
    }
    if (reconnecting) {
      return 'Attempting to reconnect to the server...';
    }
    if (!supabaseConnected) {
      return 'Connection to the database is limited. Some features may not work properly.';
    }
    return `Online. Last synced: ${lastSyncTime ? format(lastSyncTime, 'MMM d, h:mm a') : 'Never'}`;
  };

  const getIcon = () => {
    if (!isOnline) {
      return <WifiOff className="h-4 w-4" />;
    }
    if (reconnecting) {
      return <RefreshCw className="h-4 w-4 animate-spin" />;
    }
    if (!supabaseConnected) {
      return <Wifi className="h-4 w-4 text-amber-500" />;
    }
    return <Wifi className="h-4 w-4 text-green-500" />;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`flex items-center space-x-2 ${
              compact ? 'text-sm' : 'text-base p-2'
            } ${!isOnline ? 'text-red-500' : reconnecting ? 'text-amber-500' : !supabaseConnected ? 'text-amber-500' : 'text-green-500'}`}
          >
            {getIcon()}
            {!compact && <span>{getStatusText()}</span>}
            {showButton && isOnline && !supabaseConnected && (
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 h-6 w-6 p-0"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-3 w-3" />
                <span className="sr-only">Retry connection</span>
              </Button>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {getTooltipText()}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
