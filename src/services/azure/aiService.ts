
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
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Helper function to extract FAR citations from the response
const extractFARCitations = (content: string): string[] => {
  const farRegex = /FAR\s+\d+(\.\d+)*(\([a-z]\))?/g;
  return Array.from(new Set(content.match(farRegex) || []));
};

// Helper function to calculate confidence score based on token usage
const calculateConfidenceScore = (result: AzureAIResponse): number => {
  const baseScore = 0.8;
  const tokenRatio = (result.usage?.completion_tokens || 0) / 16000;
  return Math.min(baseScore + (tokenRatio * 0.2), 1);
};

/**
 * Send messages to the AI service via the internal API endpoint.
 * The API key is kept server-side only; this function never exposes it to the browser.
 */
export const getAICompletion = async (
  messages: Array<{ role: string; content: string }>,
  // apiKey is kept for backwards-compat call sites but is no longer used client-side
  _apiKey?: string
): Promise<AzureAIResponse> => {
  try {
    const response = await fetch('/api/azure-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      toast({
        title: "AI Service Error",
        description: errorData.message || 'Failed to process request',
        variant: "destructive"
      });
      throw new Error(errorData.message || `Request failed: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    toast({
      title: "AI Service Error",
      description: `Failed to process request: ${errorMessage}`,
      variant: "destructive"
    });
    throw error;
  }
};

export const getResearchCompletion = async (query: string, _apiKey?: string) => {
  try {
    const response = await fetch('/api/azure-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: query }],
        isResearch: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      toast({
        title: "Research Error",
        description: errorData.message || 'Failed to process research request',
        variant: "destructive"
      });
      throw new Error(errorData.message || `Request failed: ${response.status}`);
    }

    const data: AzureAIResponse = await response.json();
    const content = data.choices[0]?.message?.content || '';

    return {
      content,
      citations: extractFARCitations(content),
      confidence: calculateConfidenceScore(data),
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    toast({
      title: "Research Error",
      description: `Failed to process research request: ${errorMessage}`,
      variant: "destructive"
    });
    throw error;
  }
};
