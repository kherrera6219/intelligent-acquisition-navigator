
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface AIChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface AIError {
  error: string;
  code: string;
  status: number;
}

interface AIRequestError extends Error {
  code?: string;
  status?: number;
}

interface UseAzureAIOptions {
  enabled?: boolean;
  onSuccess?: (data: AIResponse) => void;
  onError?: (error: Error) => void;
}

export const useAzureAI = (
  messages: AIChatMessage[], 
  options: UseAzureAIOptions = {}
): UseMutationResult<AIResponse, Error, AIChatMessage[], unknown> => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (messages: AIChatMessage[]) => {
      const response = await fetch('/api/azure-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        const errorData: AIError = await response.json();
        const error: AIRequestError = new Error(errorData.error);
        error.code = errorData.code;
        error.status = errorData.status;
        throw error;
      }

      return response.json();
    },
    onSettled: (data, error) => {
      if (error) {
        const aiError = error as AIRequestError;
        toast({
          title: aiError.code || "Error",
          description: aiError.message,
          variant: "destructive",
        });
        options.onError?.(error);
      } else if (data) {
        options.onSuccess?.(data);
      }
    },
  });
};
