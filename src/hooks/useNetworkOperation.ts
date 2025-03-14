
import { useState, useCallback } from 'react';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';
import { useToast } from './use-toast';

interface NetworkOperationOptions {
  maxRetries?: number;
  initialDelay?: number;
  backoffFactor?: number;
  showToasts?: boolean;
  offlineMessage?: string;
  errorMessage?: string;
  successMessage?: string;
}

export function useNetworkOperation({
  maxRetries = 3,
  initialDelay = 1000,
  backoffFactor = 2,
  showToasts = false,
  offlineMessage = 'You are currently offline. This operation will be queued until you reconnect.',
  errorMessage = 'Operation failed. Please try again.',
  successMessage = 'Operation completed successfully.',
}: NetworkOperationOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { isOnline } = useNetworkMonitor();
  const { toast } = useToast();

  const reset = useCallback(() => {
    setError(null);
  }, []);

  const executeOperation = useCallback(
    async <T,>(operation: () => Promise<T>): Promise<T | undefined> => {
      if (!isOnline) {
        const offlineError = new Error(offlineMessage);
        setError(offlineError);
        if (showToasts) {
          toast({
            title: 'Offline',
            description: offlineMessage,
            variant: 'destructive',
          });
        }
        return undefined;
      }

      setIsLoading(true);
      setError(null);
      let retries = 0;
      let delay = initialDelay;

      const executeWithRetry = async (): Promise<T> => {
        try {
          const result = await operation();
          setIsLoading(false);
          if (showToasts) {
            toast({
              title: 'Success',
              description: successMessage,
            });
          }
          return result;
        } catch (err) {
          console.error('Operation failed:', err);
          
          // Check if we should retry
          if (retries < maxRetries) {
            retries++;
            
            // Implement exponential backoff
            await new Promise(resolve => setTimeout(resolve, delay));
            delay = delay * backoffFactor;
            
            // Retry the operation
            return executeWithRetry();
          } else {
            // We've exhausted retries, set error state
            const thrownError = err instanceof Error ? err : new Error(String(err));
            setError(thrownError);
            setIsLoading(false);
            
            if (showToasts) {
              toast({
                title: 'Error',
                description: thrownError.message || errorMessage,
                variant: 'destructive',
              });
            }
            
            throw thrownError;
          }
        }
      };

      try {
        return await executeWithRetry();
      } catch (finalError) {
        // This catch is for handling the error at the call site
        // We've already set the error state and shown toast in the executeWithRetry function
        return undefined;
      }
    },
    [
      isOnline, 
      initialDelay, 
      maxRetries, 
      backoffFactor, 
      showToasts, 
      offlineMessage, 
      errorMessage, 
      successMessage, 
      toast
    ]
  );

  return { executeOperation, isLoading, error, reset };
}
