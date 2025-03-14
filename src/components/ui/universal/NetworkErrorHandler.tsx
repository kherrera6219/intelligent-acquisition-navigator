
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { Card } from '@/components/ui/universal/Card';
import { AlertTriangle, WifiOff, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NetworkErrorHandlerProps {
  children: React.ReactNode;
  errorMessage?: string;
  autoRetry?: boolean;
  retryInterval?: number;
  alertPosition?: 'top' | 'inline';
  className?: string;
  onRetry?: () => void;
  isLoading?: boolean;
}

export const NetworkErrorHandler: React.FC<NetworkErrorHandlerProps> = ({
  children,
  errorMessage = "We're having trouble connecting to the server. Please check your internet connection and try again.",
  autoRetry = false,
  retryInterval = 10000, // 10 seconds
  alertPosition = 'inline',
  className,
  onRetry,
  isLoading = false,
}) => {
  const { isOnline } = useNetworkMonitor();
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [retryTimeLeft, setRetryTimeLeft] = useState(0);
  const [showError, setShowError] = useState(!isOnline);

  // Update error visibility when network status changes
  useEffect(() => {
    if (isOnline) {
      // If we're back online, hide the error after a short delay
      const timeout = setTimeout(() => {
        setShowError(false);
        setIsRetrying(false);
        setRetryTimeLeft(0);
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      setShowError(true);
    }
  }, [isOnline]);

  // Handle auto-retry functionality
  useEffect(() => {
    if (!autoRetry || isOnline || !showError) {
      return;
    }

    let timerId: NodeJS.Timeout;

    if (isRetrying) {
      if (retryTimeLeft > 0) {
        timerId = setTimeout(() => {
          setRetryTimeLeft(prev => prev - 1);
        }, 1000);
      } else {
        // Attempt to reload/retry
        if (onRetry) {
          onRetry();
        } else {
          window.location.reload();
        }
        setIsRetrying(false);
        setRetryCount(prev => prev + 1);
      }
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [autoRetry, isOnline, showError, isRetrying, retryTimeLeft, onRetry]);

  // Function to start retry countdown
  const handleRetry = () => {
    if (isRetrying) return;
    
    setIsRetrying(true);
    setRetryTimeLeft(Math.round(retryInterval / 1000));
  };

  // Function to immediately retry
  const handleImmediateRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  if (!showError) {
    return <>{children}</>;
  }

  if (alertPosition === 'top') {
    return (
      <div className={cn("space-y-4", className)} role="alert" aria-live="assertive">
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>
            {errorMessage}
            <div className="mt-2 flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleImmediateRetry}
                className="text-xs"
                disabled={isLoading}
              >
                <RefreshCw className={cn("h-3 w-3 mr-1", isLoading && "animate-spin")} />
                {isLoading ? "Retrying..." : "Retry Now"}
              </Button>
              {autoRetry && !isRetrying && !isLoading && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={handleRetry}
                  className="text-xs"
                >
                  Auto-retry
                </Button>
              )}
              {isRetrying && (
                <span className="text-xs flex items-center">
                  Retrying in {retryTimeLeft}s...
                </span>
              )}
            </div>
          </AlertDescription>
        </Alert>
        <div 
          className={cn("bg-card p-4 rounded-md border border-border", retryCount > 0 && "opacity-60")}
          role="status"
          aria-live="polite"
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)} role="alert" aria-live="assertive">
      <div 
        className="bg-card/50 p-6 rounded-lg border border-red-800/30 flex flex-col items-center justify-center text-center"
        role="status"
      >
        <WifiOff className="h-10 w-10 text-red-500/80 mb-3" />
        <h3 className="text-lg font-semibold mb-1">Network Error</h3>
        <p className="text-muted-foreground mb-4 max-w-md">{errorMessage}</p>
        
        <div className="flex gap-3">
          <Button 
            variant="default" 
            onClick={handleImmediateRetry}
            disabled={isLoading}
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
            {isLoading ? "Retrying..." : "Retry Now"}
          </Button>
          
          {autoRetry && !isRetrying && !isLoading && (
            <Button 
              variant="outline"
              onClick={handleRetry}
            >
              Auto-retry
            </Button>
          )}
        </div>
        
        {isRetrying && (
          <p className="mt-3 text-sm">
            Automatically retrying in {retryTimeLeft} seconds...
          </p>
        )}
      </div>
    </div>
  );
};
