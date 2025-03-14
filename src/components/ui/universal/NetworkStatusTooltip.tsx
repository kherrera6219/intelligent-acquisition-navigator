
import React from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { 
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from '@/components/ui/tooltip';

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
  className = ''
}) => {
  const getStatusIcon = () => {
    if (isReconnecting) {
      return <RefreshCw className="h-5 w-5 text-amber-500 animate-spin" />;
    }
    if (!isOnline || !supabaseConnected) {
      return <WifiOff className="h-5 w-5 text-destructive" />;
    }
    return <Wifi className="h-5 w-5 text-success" />;
  };

  const getStatusMessage = () => {
    if (isReconnecting) {
      return "Reconnecting to the server...";
    }
    if (!isOnline) {
      return "You're offline. Some features are unavailable.";
    }
    if (!supabaseConnected) {
      return "Connection to database limited. Some features may be unavailable.";
    }
    return "Connected to all services";
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`cursor-help ${className}`}>
            {getStatusIcon()}
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" align="center">
          <p>{getStatusMessage()}</p>
          {(isOnline && supabaseConnected) && (
            <p className="text-xs text-success mt-1">All systems operational</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
