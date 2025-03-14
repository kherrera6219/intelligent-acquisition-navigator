
import React from 'react';
import { AlertCircle, WifiOff, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNetworkMonitor } from './NetworkMonitorProvider';

export interface NetworkStatusBannerProps {
  isOffline?: boolean;
  isReconnecting?: boolean;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  isLoading?: boolean;
  variant?: string;
  className?: string;
}

export const NetworkStatusBanner: React.FC<NetworkStatusBannerProps> = ({
  isOffline: propIsOffline,
  isReconnecting: propIsReconnecting,
  message,
  actionLabel,
  onAction,
  isLoading,
  variant = "default",
  className
}) => {
  // Use props if provided, otherwise get from context
  const networkContext = useNetworkMonitor();
  const isOffline = propIsOffline !== undefined ? propIsOffline : !networkContext.isOnline;
  const isReconnecting = propIsReconnecting !== undefined ? propIsReconnecting : networkContext.isReconnecting;

  if (!isOffline && !message) {
    return null;
  }

  return (
    <div 
      className={cn(
        "fixed top-0 left-0 w-full z-50 p-2 text-center bg-red-700 text-white",
        isReconnecting && "bg-yellow-700",
        variant === "destructive" && "bg-red-800",
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center justify-center gap-2">
        {message ? (
          <>
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <span>{message}</span>
            {actionLabel && onAction && (
              <button 
                onClick={onAction}
                disabled={isLoading}
                className="ml-4 px-2 py-1 text-xs bg-white/20 hover:bg-white/30 rounded"
              >
                {isLoading ? <Loader className="h-3 w-3 animate-spin" /> : actionLabel}
              </button>
            )}
          </>
        ) : isReconnecting ? (
          <>
            <Loader className="animate-spin h-4 w-4" aria-hidden="true" />
            <span>Reconnecting to network...</span>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4" aria-hidden="true" />
            <span>You are offline. Some features may be unavailable.</span>
          </>
        )}
      </div>
    </div>
  );
};
