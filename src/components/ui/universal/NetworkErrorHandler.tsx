
import React, { useEffect, useState } from 'react';
import { AlertTriangle, WifiOff, RefreshCw } from 'lucide-react';
import { Card } from "@/components/ui/universal/Card";
import { Button } from "@/components/ui/button";
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { useToast } from '@/hooks/use-toast';

interface NetworkErrorHandlerProps {
  children: React.ReactNode;
  onRetry?: () => void;
  errorMessage?: string;
  isLoading?: boolean;
  autoRetry?: boolean;
  retryInterval?: number; // in milliseconds
  className?: string;
  alertPosition?: 'top' | 'inline';
}

export function NetworkErrorHandler({
  children,
  onRetry,
  errorMessage,
  isLoading = false,
  autoRetry = false,
  retryInterval = 10000, // 10 seconds default
  className = '',
  alertPosition = 'inline',
}: NetworkErrorHandlerProps) {
  const isOnline = useNetworkStatus();
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [nextRetryTime, setNextRetryTime] = useState(0);
  const { toast } = useToast();
  
  // Reset retry count when error is resolved
  useEffect(() => {
    if (!errorMessage) {
      setRetryCount(0);
      setIsRetrying(false);
      setNextRetryTime(0);
    }
  }, [errorMessage]);
  
  // Auto-retry logic
  useEffect(() => {
    let retryTimer: NodeJS.Timeout | null = null;
    
    if (autoRetry && errorMessage && isOnline && !isRetrying && onRetry) {
      setIsRetrying(true);
      
      // Exponential backoff for retry (capped at 1 minute)
      const delay = Math.min(retryInterval * Math.pow(1.5, retryCount), 60000);
      const retryAt = Date.now() + delay;
      setNextRetryTime(retryAt);
      
      retryTimer = setTimeout(() => {
        if (isOnline) {
          setRetryCount(prev => prev + 1);
          onRetry();
        }
        setIsRetrying(false);
      }, delay);
      
      // Update countdown timer
      const countdownInterval = setInterval(() => {
        setNextRetryTime(prev => {
          if (prev <= Date.now()) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev;
        });
      }, 1000);
      
      return () => {
        if (retryTimer) clearTimeout(retryTimer);
        clearInterval(countdownInterval);
      };
    }
    
    return () => {
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [autoRetry, errorMessage, isOnline, isRetrying, onRetry, retryCount, retryInterval]);
  
  // Handle going offline and coming back online
  useEffect(() => {
    if (!isOnline) {
      toast({
        title: "You're offline",
        description: "Please check your internet connection.",
        variant: "destructive",
      });
    } else if (retryCount > 0) {
      toast({
        title: "Back online",
        description: "Your connection has been restored.",
      });
    }
  }, [isOnline, retryCount, toast]);
  
  // Format countdown timer
  const formatCountdown = () => {
    if (nextRetryTime === 0) return '';
    const secondsLeft = Math.ceil((nextRetryTime - Date.now()) / 1000);
    return secondsLeft > 0 ? `in ${secondsLeft}s` : 'now';
  };
  
  // Position classes for alert
  const positionClasses = alertPosition === 'top' 
    ? 'sticky top-0 z-50 mb-4' 
    : 'mb-6';
  
  if (!isOnline) {
    return (
      <>
        <div 
          className={`p-4 border border-yellow-500/20 bg-yellow-500/5 ${positionClasses} ${className} rounded-lg shadow-sm`}
          role="alert" 
          aria-live="assertive"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <WifiOff className="h-5 w-5 text-yellow-500" aria-hidden="true" />
              <div>
                <h3 className="font-medium text-white">You're offline</h3>
                <p className="text-sm text-gray-400">
                  Please check your internet connection to continue.
                </p>
              </div>
            </div>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              size="sm"
              className="bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500/30 text-yellow-100"
            >
              <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
              <span>Try Again</span>
            </Button>
          </div>
        </div>
        {children}
      </>
    );
  }
  
  if (errorMessage) {
    return (
      <>
        <div 
          className={`p-4 border border-red-500/20 bg-red-500/5 ${positionClasses} ${className} rounded-lg shadow-sm`}
          role="alert"
          aria-live="assertive"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500" aria-hidden="true" />
              <div>
                <h3 className="font-medium text-white">Network Error</h3>
                <p className="text-sm text-gray-400">
                  {errorMessage}
                  {isRetrying && nextRetryTime > 0 && ` Retrying ${formatCountdown()}.`}
                </p>
              </div>
            </div>
            {onRetry && (
              <Button 
                onClick={() => {
                  setRetryCount(prev => prev + 1);
                  onRetry();
                }}
                className="flex items-center gap-2"
                size="sm"
                disabled={isRetrying || isLoading}
                aria-label="Retry connection"
              >
                <RefreshCw className={`h-4 w-4 ${isRetrying ? 'animate-spin' : ''}`} aria-hidden="true" />
                <span>Retry Now</span>
              </Button>
            )}
          </div>
        </div>
        {children}
      </>
    );
  }
  
  return <>{children}</>;
}
