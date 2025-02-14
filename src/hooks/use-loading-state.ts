
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { errorTracker } from '@/lib/security/errorTracking';
import { auditLogger } from '@/lib/audit';

interface UseLoadingStateOptions {
  onError?: (error: Error) => void;
  toastError?: boolean;
}

export function useLoadingState(options: UseLoadingStateOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAsync = useCallback(async <T>(
    promise: Promise<T>,
    successMessage?: string
  ): Promise<T | undefined> => {
    setIsLoading(true);

    try {
      const result = await promise;
      
      if (successMessage) {
        toast({
          title: "Success",
          description: successMessage
        });
      }

      return result;
    } catch (error) {
      const err = error as Error;
      
      // Track error
      errorTracker.trackError({
        message: err.message,
        severity: 'MEDIUM',
        errorType: 'APPLICATION',
        status: 'NEW'
      });

      // Log to audit system
      auditLogger.log({
        action: 'OPERATION_FAILED',
        resourceType: 'APPLICATION',
        resourceId: 'async_operation',
        severity: 'WARNING',
        details: { error: err.message }
      }).catch(console.error);

      // Handle error
      if (options.onError) {
        options.onError(err);
      }

      if (options.toastError !== false) {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.message || "An unexpected error occurred"
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [toast, options]);

  return { isLoading, handleAsync };
}
