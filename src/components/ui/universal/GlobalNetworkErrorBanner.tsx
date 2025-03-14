
import React from 'react';
import { AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GlobalNetworkErrorBannerProps {
  error?: Error | null;
  onRetry?: () => void;
  isRetrying?: boolean;
  className?: string;
}

export const GlobalNetworkErrorBanner: React.FC<GlobalNetworkErrorBannerProps> = ({
  error,
  onRetry,
  isRetrying = false,
  className
}) => {
  const isOnline = useNetworkStatus();
  
  if (!error) return null;
  
  const isNetworkError = error.message.includes('network') || 
                         error.message.includes('fetch') || 
                         error.message.includes('connection') ||
                         !isOnline;

  return (
    <Alert 
      variant="destructive" 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 rounded-none border-b shadow-md",
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="container mx-auto flex items-center justify-between py-1">
        <div className="flex items-center gap-2">
          {isNetworkError ? (
            <WifiOff className="h-4 w-4" />
          ) : (
            <AlertTriangle className="h-4 w-4" />
          )}
          <div>
            <AlertTitle className="text-sm font-medium">
              {isNetworkError 
                ? "Network Connection Issue" 
                : "Operation Failed"}
            </AlertTitle>
            <AlertDescription className="text-xs">
              {error.message || "Please check your connection and try again."}
            </AlertDescription>
          </div>
        </div>
        
        {onRetry && (
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRetry}
              disabled={isRetrying}
              className="h-8 text-xs bg-white/10 hover:bg-white/20 border-white/20"
            >
              {isRetrying ? (
                <span className="flex items-center gap-1">
                  <Wifi className="h-3 w-3 animate-pulse" />
                  Reconnecting...
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Wifi className="h-3 w-3" />
                  Retry
                </span>
              )}
            </Button>
          </div>
        )}
      </div>
    </Alert>
  );
};

export default GlobalNetworkErrorBanner;
