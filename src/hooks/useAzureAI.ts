
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
        throw new Error('Failed to get AI response');
      }

      return response.json();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      options.onError?.(error);
    },
    onSuccess: (data) => {
      options.onSuccess?.(data);
    },
  });
};
