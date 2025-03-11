
/**
 * Retry Mechanism for Network Requests
 * Provides functionality to retry failed network requests with configurable backoff
 */
import { useToast } from "@/hooks/use-toast";

interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  backoffFactor?: number;
  retryableStatuses?: number[];
  retryableErrors?: string[];
  onRetry?: (retryCount: number, error: Error) => void;
}

/**
 * Creates a retry wrapper for async functions like fetch
 * @param fn The async function to retry
 * @param options Retry configuration options
 * @returns A function that will retry the original function on failure
 */
export function createRetryFunction<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: RetryOptions = {}
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    backoffFactor = 2,
    retryableStatuses = [408, 429, 500, 502, 503, 504],
    retryableErrors = ["fetch failed", "network error", "timeout", "connection"],
    onRetry = () => {},
  } = options;

  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    let lastError: any;
    
    for (let retryCount = 0; retryCount <= maxRetries; retryCount++) {
      try {
        if (retryCount > 0) {
          // Only log retry attempts after the first failure
          console.log(`Retry attempt ${retryCount}/${maxRetries}`);
          onRetry(retryCount, lastError);
        }
        
        const result = await fn(...args);
        
        // For fetch responses, check status code
        if (result instanceof Response) {
          if (!result.ok && retryableStatuses.includes(result.status)) {
            throw new Error(`HTTP error ${result.status}: ${result.statusText}`);
          }
          return result as any;
        }
        
        return result;
      } catch (error: any) {
        lastError = error;
        
        // Don't retry if we've hit max retries
        if (retryCount >= maxRetries) {
          break;
        }
        
        // Check if this is a retryable error
        const errorMessage = error.message?.toLowerCase() || '';
        const isRetryable = retryableErrors.some(e => errorMessage.includes(e.toLowerCase())) ||
                           (error.status && retryableStatuses.includes(error.status));
        
        if (!isRetryable) {
          throw error;
        }
        
        // Exponential backoff delay
        const delay = initialDelay * Math.pow(backoffFactor, retryCount);
        console.log(`Waiting ${delay}ms before retry ${retryCount + 1}/${maxRetries}`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // If we got here, we failed after all retries
    throw lastError;
  };
}

/**
 * Hook that provides a retry function with toast notifications for retry attempts
 */
export function useRetryWithToast(options: RetryOptions = {}) {
  const { toast } = useToast();
  
  const enhancedOptions: RetryOptions = {
    ...options,
    onRetry: (retryCount, error) => {
      toast({
        title: `Retrying request (${retryCount}/${options.maxRetries || 3})`,
        description: `Network issue: ${error.message}. Attempting to reconnect...`,
      });
      
      if (options.onRetry) {
        options.onRetry(retryCount, error);
      }
    }
  };
  
  return (fn: any) => createRetryFunction(fn, enhancedOptions);
}

/**
 * Fetch with retry functionality
 * @param input URL or Request object
 * @param init Fetch options
 * @param retryOptions Retry configuration
 * @returns Response object
 */
export async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: RequestInit,
  retryOptions?: RetryOptions
): Promise<Response> {
  const fetchFn = () => fetch(input, init);
  const retryFn = createRetryFunction(fetchFn, retryOptions);
  return retryFn();
}
