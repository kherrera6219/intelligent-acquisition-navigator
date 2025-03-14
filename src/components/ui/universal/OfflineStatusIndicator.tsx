
import React from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface OfflineStatusIndicatorProps {
  compact?: boolean;
  showLabel?: boolean;
  showRetry?: boolean;
}

export const OfflineStatusIndicator: React.FC<OfflineStatusIndicatorProps> = ({
  compact = false,
  showLabel = true,
  showRetry = true
}) => {
  const { isOnline, isReconnecting, checkConnection } = useNetworkMonitor();

  if (isOnline && !isReconnecting) {
    return null;
  }

  const handleRetry = () => {
    if (checkConnection) {
      checkConnection();
    }
  };

  return (
    <div className={`flex items-center gap-2 ${compact ? 'text-sm' : 'text-base'}`}>
      {isReconnecting ? (
        <>
          <RefreshCw size={compact ? 16 : 20} className="animate-spin text-amber-500" />
          {showLabel && <span className="text-amber-500">Reconnecting...</span>}
        </>
      ) : (
        <>
          <WifiOff size={compact ? 16 : 20} className="text-red-500" />
          {showLabel && <span className="text-red-500">Offline</span>}
        </>
      )}
      
      {showRetry && !isReconnecting && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 p-1 h-auto"
                onClick={handleRetry}
              >
                <RefreshCw size={compact ? 14 : 16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Try to reconnect</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
