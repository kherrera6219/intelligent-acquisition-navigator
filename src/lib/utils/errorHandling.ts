
import { toast } from "@/hooks/use-toast"

// Predefined error messages for common scenarios
export const ErrorMessages = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  TIMEOUT_ERROR: "Request timed out. Please try again.",
  SERVER_ERROR: "Server error. Please try again later.",
  UNKNOWN_ERROR: "An unexpected error occurred.",
  RETRY_MESSAGE: "Retrying request..."
} as const;

// Error handler that provides consistent error messaging
export const handleError = (error: unknown): string => {
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return ErrorMessages.NETWORK_ERROR;
  }

  if (error instanceof Error) {
    // Check if it's a timeout error
    if (error.message.toLowerCase().includes("timeout")) {
      return ErrorMessages.TIMEOUT_ERROR;
    }
    
    // Return the actual error message if it exists
    return error.message || ErrorMessages.UNKNOWN_ERROR;
  }

  return ErrorMessages.UNKNOWN_ERROR;
};

interface RetryConfig {
  maxAttempts?: number;
  delayMs?: number;
  onRetry?: (attempt: number) => void;
}

// Retry mechanism for failed requests
export async function withRetry<T>(
  fn: () => Promise<T>,
  config: RetryConfig = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    delayMs = 1000,
    onRetry = (attempt: number) => {
      toast({
        title: ErrorMessages.RETRY_MESSAGE,
        description: `Attempt ${attempt} of ${maxAttempts}`,
        variant: "default"
      });
    }
  } = config;

  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt < maxAttempts) {
        onRetry(attempt);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError;
}
