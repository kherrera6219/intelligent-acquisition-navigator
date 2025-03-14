
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';
import { createRetryFunction } from '@/utils/retryMechanism';

interface NetworkOperationOptions {
  maxRetries?: number;
  initialDelay?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  showToasts?: boolean;
}

/**
 * Hook for handling network operations with retry mechanism
 */
export function useNetworkOperation<T>(options: NetworkOperationOptions = {}) {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    onSuccess,
    onError,
    showToasts = true
  } = options;
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();
  const { isOnline } = useNetworkMonitor();
  
  const executeOperation = useCallback(async (
    operation: () => Promise<T>,
  ): Promise<T | null> => {
    // Reset states
    setIsLoading(true);
    setError(null);
    setRetryCount(0);
    
    // Check if online before attempting operation
    if (!isOnline) {
      const offlineError = new Error('You are currently offline. Please check your connection and try again.');
      setError(offlineError);
      setIsLoading(false);
      
      if (showToasts) {
        toast({
          title: 'Offline',
          description: 'You are currently offline. Please check your connection and try again.',
          variant: 'destructive',
        });
      }
      
      if (onError) {
        onError(offlineError);
      }
      
      return null;
    }
    
    try {
      // Create a retry function
      const retryableOperation = createRetryFunction(operation, {
        maxRetries,
        initialDelay,
        onRetry: (currentRetryCount, retryError) => {
          setRetryCount(currentRetryCount);
          
          if (showToasts) {
            toast({
              title: `Retrying (${currentRetryCount}/${maxRetries})`,
              description: `Connection issue: ${retryError.message}. Attempting to reconnect...`,
            });
          }
        }
      });
      
      // Execute the operation with retry
      const result = await retryableOperation();
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err: any) {
      const errorInstance = err instanceof Error ? err : new Error(err?.message || 'An unknown error occurred');
      setError(errorInstance);
      
      if (showToasts) {
        toast({
          title: 'Operation Failed',
          description: `${errorInstance.message}`,
          variant: 'destructive',
        });
      }
      
      if (onError) {
        onError(errorInstance);
      }
      
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isOnline, maxRetries, initialDelay, onError, onSuccess, showToasts, toast]);
  
  return {
    executeOperation,
    isLoading,
    error,
    retryCount,
    isOnline,
    reset: () => {
      setError(null);
      setRetryCount(0);
    }
  };
}
