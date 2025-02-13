
import { useToast } from "@/hooks/use-toast";

interface RequestConfig extends RequestInit {
  baseURL?: string;
}

interface APIError extends Error {
  status?: number;
  code?: string;
}

class APIClient {
  private baseURL: string;
  private toast: ReturnType<typeof useToast>['toast'];

  constructor(baseURL: string = '', toast?: ReturnType<typeof useToast>['toast']) {
    this.baseURL = baseURL;
    this.toast = toast as ReturnType<typeof useToast>['toast'];
  }

  private handleError(error: unknown): never {
    const apiError: APIError = error instanceof Error ? error : new Error('An unknown error occurred');
    
    if (this.toast) {
      this.toast({
        title: apiError.code || "Error",
        description: apiError.message,
        variant: "destructive",
      });
    }
    
    throw apiError;
  }

  async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { baseURL = this.baseURL, headers = {}, ...restConfig } = config;
    
    try {
      const response = await fetch(`${baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        ...restConfig,
      });

      if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}`) as APIError;
        error.status = response.status;
        error.code = `HTTP_${response.status}`;
        throw error;
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async get<T>(endpoint: string, config: RequestConfig = {}) {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T>(endpoint: string, data: unknown, config: RequestConfig = {}) {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown, config: RequestConfig = {}) {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string, config: RequestConfig = {}) {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

export const createAPIClient = (baseURL: string, toast?: ReturnType<typeof useToast>['toast']) => {
  return new APIClient(baseURL, toast);
};
