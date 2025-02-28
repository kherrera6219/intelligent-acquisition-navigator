
import { errorTracker } from './security/errorTracking';
import { auditLogger } from './utils/auditLogger';

/**
 * API response types
 */
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  statusCode: number;
  message?: string;
  success: boolean;
}

/**
 * Request options for API client
 */
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  retries?: number;
  authRequired?: boolean;
  timeout?: number;
}

/**
 * API client configuration
 */
interface ApiClientConfig {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
  defaultRetries?: number;
  defaultTimeout?: number;
}

/**
 * API client for making network requests
 */
export default function createAPIClient(config: ApiClientConfig) {
  const {
    baseUrl,
    defaultHeaders = {
      'Content-Type': 'application/json',
    },
    defaultRetries = 3,
    defaultTimeout = 10000,
  } = config;

  /**
   * Make API request with retry capability
   */
  async function request<T = any>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      retries = defaultRetries,
      timeout = defaultTimeout,
    } = options;

    let currentRetry = 0;

    const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;
    
    // Request timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Request timeout after ${timeout}ms`));
      }, timeout);
    });

    while (currentRetry <= retries) {
      try {
        const controller = new AbortController();
        const signal = controller.signal;

        const requestHeaders = {
          ...defaultHeaders,
          ...headers,
        };

        const requestBody = body ? JSON.stringify(body) : undefined;

        // Log audit event
        auditLogger({
          action: `${method} ${endpoint}`,
          details: `Attempt ${currentRetry + 1} of ${retries + 1}`,
          module: "APPLICATION"
        });

        // Race between fetch and timeout
        const response = await Promise.race([
          fetch(url, {
            method,
            headers: requestHeaders,
            body: requestBody,
            signal,
          }),
          timeoutPromise,
        ]);

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.error || `HTTP error ${response.status}`);
        }

        return {
          data: responseData,
          statusCode: response.status,
          success: true,
        };
      } catch (error) {
        currentRetry++;
        
        // Track error
        errorTracker(error, {
          method,
          url,
          retryAttempt: currentRetry,
        });

        // Log audit event for error
        auditLogger({
          action: `${method} ${endpoint} failed`,
          details: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          module: "APPLICATION",
          status: 'error',
        });

        // If we've used all retries, throw the error
        if (currentRetry > retries) {
          return {
            error: error instanceof Error ? error.message : 'Unknown error',
            statusCode: 500,
            success: false,
          };
        }

        // Wait before retrying (exponential backoff)
        await new Promise(resolve => {
          setTimeout(resolve, Math.pow(2, currentRetry) * 100);
        });
      }
    }

    // This should never be reached due to the previous error handling
    return {
      error: 'Maximum retries exceeded',
      statusCode: 500,
      success: false,
    };
  }

  return {
    get: <T = any>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) => 
      request<T>(endpoint, { ...options, method: 'GET' }),
    
    post: <T = any>(endpoint: string, body: any, options?: Omit<RequestOptions, 'method'>) => 
      request<T>(endpoint, { ...options, method: 'POST', body }),
    
    put: <T = any>(endpoint: string, body: any, options?: Omit<RequestOptions, 'method'>) => 
      request<T>(endpoint, { ...options, method: 'PUT', body }),
    
    patch: <T = any>(endpoint: string, body: any, options?: Omit<RequestOptions, 'method'>) => 
      request<T>(endpoint, { ...options, method: 'PATCH', body }),
    
    delete: <T = any>(endpoint: string, options?: Omit<RequestOptions, 'method'>) => 
      request<T>(endpoint, { ...options, method: 'DELETE' }),
  };
}
