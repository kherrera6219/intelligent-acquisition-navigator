
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { getAICompletion } from "@/services/azure/aiService";
import { errorTracker } from "@/lib/security/errorTracking";

export interface AIChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface AIResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
  }>;
}

interface UseAzureAIOptions {
  onSuccess?: (data: AIResponse) => void;
  onError?: (error: Error) => void;
}

/** Exponential backoff helper — waits 2^attempt * 1000ms, capped at 16s. */
const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const withRetry = async <T>(
  fn: () => Promise<T>,
  maxAttempts = 3
): Promise<T> => {
  let lastError: unknown;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      // Don't retry on 4xx (client errors) — only transient 5xx / network errors
      const status = (err as { status?: number }).status;
      if (status !== undefined && status >= 400 && status < 500 && status !== 429) {
        throw err;
      }
      if (attempt < maxAttempts - 1) {
        const backoffMs = Math.min(Math.pow(2, attempt) * 1000, 16000);
        await delay(backoffMs);
      }
    }
  }
  throw lastError;
};

export const useAzureAI = (
  _messages: AIChatMessage[],
  options: UseAzureAIOptions = {}
): UseMutationResult<AIResponse, Error, AIChatMessage[], unknown> => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (messages: AIChatMessage[]) => {
      const apiKey = import.meta.env.VITE_AZURE_OPENAI_API_KEY as string;
      if (!apiKey) {
        throw new Error('Azure OpenAI API key (VITE_AZURE_OPENAI_API_KEY) is not configured');
      }

      return withRetry(async () => {
        const response = await getAICompletion(messages, apiKey);
        // Normalise to the AIResponse shape expected by consumers
        return {
          choices: response.choices.map((c) => ({
            message: { content: c.message.content, role: c.message.role },
          })),
        } satisfies AIResponse;
      });
    },
    retry: 0, // retries handled by withRetry above
    onSettled: (data, error) => {
      if (error) {
        errorTracker.trackError({
          message: error.message,
          stack: error.stack,
          severity: 'HIGH',
          errorType: 'APPLICATION',
          status: 'NEW',
        });
        toast({
          title: "AI Service Error",
          description: error.message,
          variant: "destructive",
        });
        options.onError?.(error);
      } else if (data) {
        options.onSuccess?.(data);
      }
    },
  });
};
