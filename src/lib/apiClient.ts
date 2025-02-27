
/**
 * Enhanced API client with optimistic updates and caching
 */
import { cachedFetch, CacheConfig } from '@/utils/cachedFetch';
import { createOptimisticUpdate, updateOptimisticStatus } from '@/utils/optimisticUpdates';
import { errorTracker } from '@/lib/security/errorTracking';

// Default API configuration
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// Enhanced API client with caching and optimistic updates
class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor(baseUrl: string = '', defaultHeaders: HeadersInit = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      ...DEFAULT_HEADERS,
      ...defaultHeaders,
    };
  }

  // Helper to build full URL
  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  // Helper to get CSRF token
  private getCsrfToken(): string | null {
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    return metaTag ? metaTag.getAttribute('content') : null;
  }

  // Generic request method with caching and optimistic updates
  async request<T>(
    endpoint: string,
    options: RequestInit = {},
    cacheConfig: CacheConfig = {}
  ): Promise<T> {
    const url = this.buildUrl(endpoint);
    
    // Set default headers and include CSRF token
    const csrfToken = this.getCsrfToken();
    const headers = {
      ...this.defaultHeaders,
      ...options.headers,
    };
    
    if (csrfToken) {
      headers['X-CSRF-Token'] = csrfToken;
    }

    // Determine resource type for optimistic updates
    const resourceType = cacheConfig.resourceType || endpoint.split('/').filter(Boolean).pop() || 'unknown';
    
    // Create optimistic update for write operations
    let optimisticUpdateId;
    const method = (options.method || 'GET').toUpperCase();
    
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      const action = method === 'POST' 
        ? 'create' 
        : method === 'DELETE' 
          ? 'delete' 
          : 'update';
      
      const resourceId = method !== 'POST' 
        ? endpoint.split('/').filter(Boolean).pop() 
        : undefined;
      
      const body = options.body 
        ? typeof options.body === 'string' 
          ? JSON.parse(options.body) 
          : options.body
        : undefined;
      
      const update = createOptimisticUpdate(
        resourceType,
        action,
        resourceId,
        undefined, // Original data not available here
        body
      );
      
      optimisticUpdateId = update.id;
    }

    try {
      const response = await cachedFetch<T>(url, {
        ...options,
        headers,
      }, cacheConfig);
      
      // Update optimistic status if applicable
      if (optimisticUpdateId) {
        updateOptimisticStatus(optimisticUpdateId, 'success');
      }
      
      return response;
    } catch (error) {
      // Update optimistic status if applicable
      if (optimisticUpdateId) {
        updateOptimisticStatus(optimisticUpdateId, 'error', error as Error);
      }
      
      // Track error
      errorTracker.trackError({
        message: error instanceof Error ? error.message : 'Unknown API error',
        severity: 'HIGH',
        errorType: 'API',
        status: 'NEW'
      });
      
      throw error;
    }
  }

  // CRUD methods with caching and optimistic updates
  async get<T>(endpoint: string, options: RequestInit = {}, cacheConfig: CacheConfig = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'GET',
    }, cacheConfig);
  }

  async post<T>(endpoint: string, data: any, options: RequestInit = {}, cacheConfig: CacheConfig = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }, cacheConfig);
  }

  async put<T>(endpoint: string, data: any, options: RequestInit = {}, cacheConfig: CacheConfig = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }, cacheConfig);
  }

  async patch<T>(endpoint: string, data: any, options: RequestInit = {}, cacheConfig: CacheConfig = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    }, cacheConfig);
  }

  async delete<T>(endpoint: string, options: RequestInit = {}, cacheConfig: CacheConfig = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'DELETE',
    }, cacheConfig);
  }
}

// Create a singleton instance
const apiClient = new ApiClient();

export default apiClient;
