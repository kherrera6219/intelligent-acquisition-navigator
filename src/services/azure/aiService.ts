
import { toast } from "@/hooks/use-toast";

interface AzureAIResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
    index: number;
  }>;
  created: number;
  id: string;
  model: string;
  object: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export const getAICompletion = async (messages: Array<{ role: string; content: string }>) => {
  try {
    const response = await fetch('/api/azure-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        max_tokens: 4096,
        temperature: 1,
        top_p: 1,
      }),
    });

    if (!response.ok) {
      toast({
        title: "Error",
        description: "Failed to get AI completion",
        variant: "destructive",
      });
      throw new Error('Failed to get AI completion');
    }

    const data: AzureAIResponse = await response.json();
    return data;
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to process AI request. Please try again later.",
      variant: "destructive",
    });
    throw error;
  }
};
