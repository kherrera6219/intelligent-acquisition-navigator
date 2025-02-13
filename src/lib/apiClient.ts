
import { useToast } from "@/hooks/use-toast";

interface RequestConfig extends RequestInit {
  baseURL?: string;
}

class APIClient {
  private baseURL: string;
  private toast: ReturnType<typeof useToast>;

  constructor(baseURL: string = '', toast?: ReturnType<typeof useToast>) {
    this.baseURL = baseURL;
    this.toast = toast as ReturnType<typeof useToast>;
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      if (this.toast) {
        this.toast({
          title: "Error",
          description: error instanceof Error ? error.message : "An error occurred",
          variant: "destructive",
        });
      }
      throw error;
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

export const createAPIClient = (baseURL: string, toast?: ReturnType<typeof useToast>) => {
  return new APIClient(baseURL, toast);
};
