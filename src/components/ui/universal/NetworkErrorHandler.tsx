
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { NetworkStatusBanner } from './NetworkStatusBanner';

interface NetworkErrorHandlerProps {
  error: Error | null;
  children: React.ReactNode;
  onRetry?: () => void;
  isLoading?: boolean;
}

export const NetworkErrorHandler: React.FC<NetworkErrorHandlerProps> = ({
  error,
  children,
  onRetry,
  isLoading = false
}) => {
  const isNetworkError = error?.message?.includes('network') || error?.message?.includes('fetch');

  if (error) {
    if (isNetworkError) {
      return (
        <>
          <NetworkStatusBanner />
          <div className="flex flex-col items-center justify-center py-8">
            <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Network Error</h2>
            <p className="text-gray-500 mb-4 text-center max-w-md">
              There was a problem connecting to the server. Please check your internet connection and try again.
            </p>
            {onRetry && (
              <Button 
                onClick={onRetry} 
                disabled={isLoading}
                className="mt-2"
              >
                {isLoading ? 'Retrying...' : 'Retry'}
              </Button>
            )}
          </div>
        </>
      );
    }

    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error.message || 'An unexpected error occurred'}
        </AlertDescription>
        {onRetry && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry}
            disabled={isLoading}
            className="mt-2"
          >
            {isLoading ? 'Retrying...' : 'Retry'}
          </Button>
        )}
      </Alert>
    );
  }

  return <>{children}</>;
};
