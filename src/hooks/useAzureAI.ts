
import { useRef } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { getAICompletion, type AzureAIResponse } from "@/services/azure/aiService";

interface AIChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AIRequestError extends Error {
  code?: string;
  status?: number;
}

interface UseAzureAIOptions {
  onSuccess?: (data: AzureAIResponse) => void;
  onError?: (error: Error) => void;
}

export const useAzureAI = (
  _messages: AIChatMessage[],
  options: UseAzureAIOptions = {}
): UseMutationResult<AzureAIResponse, Error, AIChatMessage[], unknown> => {
  const { toast } = useToast();
  const abortControllerRef = useRef<AbortController | null>(null);

  return useMutation({
    mutationFn: async (messages: AIChatMessage[]) => {
      // Cancel any in-flight request before starting a new one
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      return getAICompletion(messages, undefined, abortControllerRef.current.signal);
    },
    onSettled: (data, error) => {
      if (error) {
        // Ignore AbortError — user intentionally cancelled
        if (error.name === 'AbortError') return;

        const aiError = error as AIRequestError;
        toast({
          title: aiError.code || "AI Error",
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
