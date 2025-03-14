
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface NetworkStatusBannerProps {
  isOffline?: boolean;
  isReconnecting?: boolean;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  isLoading?: boolean;
  variant?: 'default' | 'destructive' | 'warning';
}

export const NetworkStatusBanner: React.FC<NetworkStatusBannerProps> = ({
  isOffline = false,
  isReconnecting = false,
  message,
  actionLabel,
  onAction,
  isLoading = false,
  variant = 'default'
}) => {
  if (!isOffline && !isReconnecting && !message) return null;

  // Map the variant to the alert variant which only supports default/destructive
  const alertVariant = variant === 'warning' ? 'default' : variant;

  return (
    <Alert 
      variant={alertVariant} 
      className={`${variant === 'warning' ? 'bg-amber-100 border-amber-500 text-amber-900 dark:bg-amber-900/20 dark:border-amber-500 dark:text-amber-200' : ''} fixed top-0 left-0 right-0 z-50 rounded-none px-6 py-2 flex items-center justify-between`}
    >
      <div className="flex items-center space-x-2">
        {isOffline && (
          <WifiOff className="h-4 w-4" />
        )}
        {isReconnecting && (
          <RefreshCw className="h-4 w-4 animate-spin" />
        )}
        {!isOffline && !isReconnecting && (
          <AlertCircle className="h-4 w-4" />
        )}
        <AlertDescription>
          {message || (
            isOffline 
              ? "You're offline. Some features may be unavailable." 
              : isReconnecting 
                ? "Reconnecting to the server..." 
                : "Connection issue detected."
          )}
        </AlertDescription>
      </div>

      {onAction && actionLabel && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onAction} 
          disabled={isLoading}
          className="ml-4"
        >
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Retrying...
            </>
          ) : (
            actionLabel
          )}
        </Button>
      )}
    </Alert>
  );
};
