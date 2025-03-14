
import React from 'react';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export interface NetworkStatusBannerProps {
  isOffline?: boolean;
  isReconnecting?: boolean;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  isLoading?: boolean;
  variant?: "default" | "destructive";
}

export const NetworkStatusBanner: React.FC<NetworkStatusBannerProps> = ({
  isOffline,
  isReconnecting,
  message,
  actionLabel,
  onAction,
  isLoading = false,
  variant = "destructive"
}) => {
  const statusMessage = message || (isOffline ? 'You are currently offline.' : (isReconnecting ? 'Reconnecting...' : ''));
  
  // Only render if there's a message to show
  if (!statusMessage && !isOffline && !isReconnecting) return null;

  return (
    <Alert variant={variant} className="mb-4" role="alert">
      <div className="flex items-center gap-2">
        {isOffline ? <WifiOff className="h-4 w-4" /> : 
         isReconnecting ? <Wifi className="h-4 w-4 animate-pulse" /> : 
         <AlertCircle className="h-4 w-4" />}
        <AlertDescription className="flex-grow">{statusMessage}</AlertDescription>
        {actionLabel && onAction && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onAction}
            disabled={isLoading}
            className="ml-2"
          >
            {isLoading ? "Loading..." : actionLabel}
          </Button>
        )}
      </div>
    </Alert>
  );
};
