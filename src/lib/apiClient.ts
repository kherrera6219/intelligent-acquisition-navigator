
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { auditLogger } from '@/lib/audit';
import { useToast } from '@/hooks/use-toast';

export interface APIClientOptions {
  baseUrl?: string;
  timeout?: number;
  headers?: Record<string, string>;
  retryCount?: number;
  retryDelay?: number;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  retryCount?: number;
  retryDelay?: number;
}

export interface APIClient {
  get: <T>(path: string, options?: RequestOptions) => Promise<T>;
  post: <T>(path: string, data: any, options?: RequestOptions) => Promise<T>;
  put: <T>(path: string, data: any, options?: RequestOptions) => Promise<T>;
  patch: <T>(path: string, data: any, options?: RequestOptions) => Promise<T>;
  delete: <T>(path: string, options?: RequestOptions) => Promise<T>;
}

export interface APIError extends Error {
  status?: number;
  statusText?: string;
  data?: any;
}

export interface ErrorTracker {
  (error: Error, context?: Record<string, any>): void;
}

// Error tracker stub
const errorTracker: ErrorTracker = (error: Error, context?: Record<string, any>) => {
  console.error('Error tracked:', error, context);
  // In a real implementation, this would send error data to an error tracking service
};

export function createAPIClient(options: APIClientOptions = {}): APIClient {
  const {
    baseUrl = '/api',
    timeout = 30000,
    headers: defaultHeaders = {},
    retryCount = 3,
    retryDelay = 1000,
  } = options;

  const executeRequest = async <T>(
    path: string,
    method: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<T> => {
    const {
      headers = {},
      timeout: requestTimeout = timeout,
      retryCount: requestRetryCount = retryCount,
      retryDelay: requestRetryDelay = retryDelay,
    } = options;

    const url = path.startsWith('http') ? path : `${baseUrl}${path}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), requestTimeout);

    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders,
        ...headers,
      },
      signal: controller.signal,
    };

    if (data) {
      requestOptions.body = JSON.stringify(data);
    }

    let attempts = 0;
    let error: APIError | null = null;

    while (attempts < requestRetryCount) {
      try {
        const response = await fetch(url, requestOptions);
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          const responseData = await response.json().catch(() => ({}));
          error = new Error(response.statusText) as APIError;
          error.status = response.status;
          error.statusText = response.statusText;
          error.data = responseData;
          
          // Log failed API calls
          auditLogger.log({
            action: 'API_ERROR',
            resource: path,
            details: {
              method,
              status: response.status,
              statusText: response.statusText,
            },
            status: 'error',
          });
          
          throw error;
        }
        
        // Log successful API calls
        auditLogger.log({
          action: 'API_CALL',
          resource: path,
          details: {
            method,
          },
          status: 'success',
        });
        
        if (response.status === 204) {
          return {} as T;
        }
        
        return await response.json();
      } catch (err: any) {
        error = err;
        
        if (err.name === 'AbortError') {
          error.message = 'Request timed out';
          break;
        }
        
        // Don't retry if it's a 4xx error (client error)
        if (err.status && err.status >= 400 && err.status < 500) {
          break;
        }
        
        attempts++;
        
        if (attempts < requestRetryCount) {
          await new Promise(resolve => setTimeout(resolve, requestRetryDelay * attempts));
        }
      }
    }

    // Track the error
    console.error(`API Error (${attempts} attempts):`, error);
    
    // Additional error tracking
    errorTracker(error as Error, {
      path,
      method,
      attempts,
    });
    
    throw error;
  };

  return {
    get: <T>(path: string, options?: RequestOptions) => 
      executeRequest<T>(path, 'GET', undefined, options),
    post: <T>(path: string, data: any, options?: RequestOptions) => 
      executeRequest<T>(path, 'POST', data, options),
    put: <T>(path: string, data: any, options?: RequestOptions) => 
      executeRequest<T>(path, 'PUT', data, options),
    patch: <T>(path: string, data: any, options?: RequestOptions) => 
      executeRequest<T>(path, 'PATCH', data, options),
    delete: <T>(path: string, options?: RequestOptions) => 
      executeRequest<T>(path, 'DELETE', undefined, options),
  };
}

export function useAPI() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [client, setClient] = useState<APIClient | null>(null);

  useEffect(() => {
    const headers: Record<string, string> = {};
    
    if (user) {
      headers['Authorization'] = `Bearer ${user.id}`;
    }
    
    setClient(createAPIClient({
      headers,
      retryCount: 2,
    }));
  }, [user]);

  const handleAPIError = (error: APIError) => {
    let message = 'An error occurred';
    
    if (error.status === 401) {
      message = 'Authentication required. Please log in.';
    } else if (error.status === 403) {
      message = 'You do not have permission to perform this action.';
    } else if (error.status === 404) {
      message = 'The requested resource was not found.';
    } else if (error.status && error.status >= 500) {
      message = 'A server error occurred. Please try again later.';
    } else if (error.message) {
      message = error.message;
    }
    
    toast({
      title: 'Error',
      description: message,
      variant: 'destructive',
    });
  };

  return {
    client,
    handleAPIError,
  };
}
