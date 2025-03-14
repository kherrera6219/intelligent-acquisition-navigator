
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ErrorMessages, handleError } from '@/lib/utils/errorHandling';

interface ErrorHandlingOptions {
  showToast?: boolean;
  autoRetry?: boolean;
  maxRetries?: number;
  retryDelay?: number;
  onSuccess?: (data: any) => void;
}

export function useGlobalErrorHandling(options: ErrorHandlingOptions = {}) {
  const {
    showToast = true,
    autoRetry = false,
    maxRetries = 3,
    retryDelay = 2000,
    onSuccess
  } = options;
  
  const [error, setError] = useState<Error | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();

  const handleOperationError = useCallback((err: unknown) => {
    const errorMessage = handleError(err);
    setError(err instanceof Error ? err : new Error(errorMessage));
    
    if (showToast) {
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
    
    return errorMessage;
  }, [showToast, toast]);

  const clearError = useCallback(() => {
    setError(null);
    setRetryCount(0);
    setIsRetrying(false);
  }, []);

  const retryOperation = useCallback(async (operation: () => Promise<any>) => {
    if (retryCount >= maxRetries) {
      toast({
        title: "Max retries reached",
        description: "Please try again later or contact support if the problem persists.",
        variant: "destructive"
      });
      return;
    }
    
    setIsRetrying(true);
    
    try {
      const result = await operation();
      clearError();
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      toast({
        title: "Success",
        description: "Operation completed successfully",
      });
      
      return result;
    } catch (err) {
      setRetryCount(prev => prev + 1);
      handleOperationError(err);
      
      toast({
        title: "Retry failed",
        description: `Attempt ${retryCount + 1} of ${maxRetries} failed. ${handleError(err)}`,
        variant: "destructive"
      });
      
      if (autoRetry && retryCount < maxRetries - 1) {
        setTimeout(() => retryOperation(operation), retryDelay);
      }
    } finally {
      setIsRetrying(false);
    }
  }, [retryCount, maxRetries, autoRetry, retryDelay, clearError, handleOperationError, onSuccess, toast]);

  const executeWithErrorHandling = useCallback(async (operation: () => Promise<any>) => {
    try {
      const result = await operation();
      clearError();
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      handleOperationError(err);
      
      if (autoRetry && retryCount < maxRetries) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => retryOperation(operation), retryDelay);
      }
      
      return null;
    }
  }, [autoRetry, clearError, handleOperationError, maxRetries, onSuccess, retryCount, retryDelay, retryOperation]);

  return {
    error,
    isRetrying,
    retryCount,
    handleError: handleOperationError,
    clearError,
    retryOperation,
    executeWithErrorHandling
  };
}
