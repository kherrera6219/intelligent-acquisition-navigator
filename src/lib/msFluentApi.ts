
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useState, useCallback } from 'react';

interface MsFluentApiOptions {
  baseUrl?: string;
  headers?: Record<string, string>;
  timeout?: number;
  showToasts?: boolean;
  retryCount?: number;
  retryDelay?: number;
}

interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  endpoint: string;
  data?: any;
  headers?: Record<string, string>;
  skipAuth?: boolean;
  showToast?: boolean;
}

interface UseMsFluentApiReturn {
  request: <T = any>(options: RequestOptions) => Promise<T>;
  isLoading: boolean;
  error: Error | null;
  clearError: () => void;
}

/**
 * Microsoft Fluent UI styled API client hook
 * Provides a consistent way to make API requests and handle responses
 * with proper loading states and error handling
 */
export function useMsFluentApi(options: MsFluentApiOptions = {}): UseMsFluentApiReturn {
  const {
    baseUrl = '/api',
    headers: defaultHeaders = {},
    timeout = 30000,
    showToasts = true,
    retryCount = 2,
    retryDelay = 1000
  } = options;

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const request = useCallback(
    async <T = any>({
      method,
      endpoint,
      data,
      headers = {},
      skipAuth = false,
      showToast = showToasts
    }: RequestOptions): Promise<T> => {
      setIsLoading(true);
      setError(null);

      const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      // Prepare headers with authentication if needed
      let requestHeaders = { ...defaultHeaders, ...headers };
      if (!skipAuth && user) {
        try {
          // Instead of getAccessToken, we'll use the user session directly
          // This assumes the token is available in the user object or we're using
          // another authentication mechanism that doesn't require explicit token retrieval
          if (user.session) {
            requestHeaders['Authorization'] = `Bearer ${user.session.access_token}`;
          } else {
            console.warn('User is authenticated but no session token is available');
          }
        } catch (err) {
          console.error('Failed to get auth token:', err);
        }
      }

      // Get content type if not provided
      if (!requestHeaders['Content-Type'] && method !== 'GET' && data) {
        requestHeaders['Content-Type'] = 'application/json';
      }

      const requestOptions: RequestInit = {
        method,
        headers: requestHeaders,
        signal: controller.signal
      };

      // Add body for non-GET requests
      if (method !== 'GET' && data) {
        requestOptions.body = JSON.stringify(data);
      }

      // Implement retry logic
      let attempts = 0;
      let lastError: any = null;

      while (attempts <= retryCount) {
        try {
          const response = await fetch(url, requestOptions);
          clearTimeout(timeoutId);

          if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const errorMessage = errorData?.message || response.statusText || 'Request failed';
            throw new Error(errorMessage);
          }

          setIsLoading(false);
          
          // Handle no content responses
          if (response.status === 204) {
            return {} as T;
          }

          return await response.json();
        } catch (err: any) {
          lastError = err;
          attempts++;

          // Don't retry if it's an abort error or a 4xx error
          if (err.name === 'AbortError' || (err.status && err.status >= 400 && err.status < 500)) {
            break;
          }

          // If we've reached max retries, break the loop
          if (attempts > retryCount) {
            break;
          }

          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, retryDelay * attempts));
        }
      }

      // Handle final error state
      setIsLoading(false);
      setError(lastError);

      // Show error toast if enabled
      if (showToast) {
        toast({
          title: "An error occurred",
          description: lastError?.message || "Failed to complete the request",
          variant: "destructive"
        });
      }

      throw lastError;
    },
    [baseUrl, defaultHeaders, retryCount, retryDelay, showToasts, timeout, user]
  );

  return { request, isLoading, error, clearError };
}

/**
 * Custom hook for specific API operations with Microsoft Fluent UI styling
 * @param endpoint The API endpoint
 * @param options Additional options for the API request
 */
export function useMsFluentApiOperation<TData = any, TInput = any>(
  endpoint: string,
  options: Omit<MsFluentApiOptions, 'endpoint'> & {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
    successToast?: {
      title?: string;
      description?: string;
    };
    errorToast?: {
      title?: string;
      description?: string;
    };
  } = {}
) {
  const {
    method = 'GET',
    onSuccess,
    onError,
    successToast,
    errorToast,
    ...apiOptions
  } = options;

  const { request, isLoading, error, clearError } = useMsFluentApi(apiOptions);

  const execute = useCallback(
    async (data?: TInput): Promise<TData> => {
      try {
        const response = await request<TData>({
          method,
          endpoint,
          data,
          showToast: false
        });

        if (successToast) {
          toast({
            title: successToast.title || 'Success',
            description: successToast.description || 'Operation completed successfully',
            variant: 'default'
          });
        }

        onSuccess?.(response);
        return response;
      } catch (err: any) {
        if (errorToast) {
          toast({
            title: errorToast.title || 'Error',
            description: errorToast.description || err.message || 'Operation failed',
            variant: 'destructive'
          });
        }

        onError?.(err);
        throw err;
      }
    },
    [request, method, endpoint, onSuccess, onError, successToast, errorToast]
  );

  return { execute, isLoading, error, clearError };
}
