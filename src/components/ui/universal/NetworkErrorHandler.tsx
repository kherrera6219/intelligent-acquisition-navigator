
import React, { ReactNode, useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

interface NetworkErrorHandlerProps {
  children: ReactNode;
  errorMessage?: string;
  autoRetry?: boolean;
  onRetry?: () => void;
  isLoading?: boolean;
  alertPosition?: 'top' | 'inline';
}

export const NetworkErrorHandler: React.FC<NetworkErrorHandlerProps> = ({
  children,
  errorMessage,
  autoRetry = false,
  onRetry,
  isLoading = false,
  alertPosition = 'inline'
}) => {
  const isOnline = useNetworkStatus();
  const [retryAttempts, setRetryAttempts] = useState(0);
  const [showError, setShowError] = useState(!!errorMessage);
  
  // Reset error state when going back online
  useEffect(() => {
    if (isOnline && errorMessage && autoRetry) {
      const timer = setTimeout(() => {
        if (onRetry) {
          setRetryAttempts(prev => prev + 1);
          onRetry();
        }
      }, 3000); // Auto retry after 3 seconds when back online
      
      return () => clearTimeout(timer);
    }
  }, [isOnline, errorMessage, autoRetry, onRetry]);
  
  // Reset error display when error message changes
  useEffect(() => {
    setShowError(!!errorMessage);
  }, [errorMessage]);
  
  const handleRetry = () => {
    if (onRetry) {
      setRetryAttempts(prev => prev + 1);
      onRetry();
    } else {
      // Default behavior - reload the page
      window.location.reload();
    }
  };
  
  const alertStyles = {
    top: 'sticky top-0 z-10 mb-4',
    inline: 'my-4'
  };
  
  return (
    <>
      {showError && (
        <Alert 
          variant="destructive" 
          className={alertStyles[alertPosition]}
        >
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{!isOnline ? 'Network Error' : 'Error'}</AlertTitle>
          <div className="flex items-center justify-between">
            <AlertDescription>
              {errorMessage || (isOnline 
                ? 'An error occurred. Please try again.' 
                : 'You are currently offline. Some features may be limited.')}
            </AlertDescription>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRetry}
              disabled={isLoading || (!isOnline && !onRetry)}
              className="ml-4 bg-white/10 hover:bg-white/20 text-white"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Retrying...' : 'Retry'}
            </Button>
          </div>
        </Alert>
      )}
      {children}
    </>
  );
};
