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

interface ChatCompletionRequest {
  messages: Array<{ role: string; content: string }>;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
}

const getAzureConfig = () => {
  const endpoint = import.meta.env.VITE_AZURE_ENDPOINT as string | undefined;
  const apiKey = import.meta.env.VITE_AZURE_OPENAI_API_KEY as string | undefined;
  const deploymentId =
    (import.meta.env.VITE_AZURE_DEPLOYMENT_ID as string | undefined) || "gpt-4o";
  const apiVersion =
    (import.meta.env.VITE_AZURE_OPENAI_API_VERSION as string | undefined) || "2024-06-01";

  if (!endpoint) {
    throw new Error("VITE_AZURE_ENDPOINT is not configured");
  }
  if (!apiKey) {
    throw new Error("VITE_AZURE_OPENAI_API_KEY is not configured");
  }

  return {
    endpoint: endpoint.replace(/\/$/, ""),
    apiKey,
    deploymentId,
    apiVersion,
  };
};

const callAzureChatCompletions = async ({
  messages,
  maxTokens = 4096,
  temperature = 1,
  topP = 1,
}: ChatCompletionRequest): Promise<AzureAIResponse> => {
  const config = getAzureConfig();
  const response = await fetch(
    `${config.endpoint}/openai/deployments/${config.deploymentId}/chat/completions?api-version=${config.apiVersion}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": config.apiKey,
      },
      body: JSON.stringify({
        messages,
        max_tokens: maxTokens,
        temperature,
        top_p: topP,
      }),
    }
  );

  const payload = (await response.json()) as {
    error?: { message?: string };
    id?: string;
    created?: number;
    model?: string;
    object?: string;
    usage?: {
      prompt_tokens?: number;
      completion_tokens?: number;
      total_tokens?: number;
    };
    choices?: Array<{
      index?: number;
      finish_reason?: string;
      message?: { content?: string; role?: string };
    }>;
  };

  if (!response.ok) {
    throw new Error(payload.error?.message || `Azure request failed (${response.status})`);
  }

  const normalized: AzureAIResponse = {
    id: payload.id ?? crypto.randomUUID(),
    created: payload.created ?? Date.now(),
    model: payload.model ?? config.deploymentId,
    object: payload.object ?? "chat.completion",
    usage: {
      prompt_tokens: payload.usage?.prompt_tokens ?? 0,
      completion_tokens: payload.usage?.completion_tokens ?? 0,
      total_tokens: payload.usage?.total_tokens ?? 0,
    },
    choices: (payload.choices ?? []).map((choice, index) => ({
      index: choice.index ?? index,
      finish_reason: choice.finish_reason ?? "",
      message: {
        role: choice.message?.role ?? "assistant",
        content: choice.message?.content ?? "",
      },
    })),
  };

  return normalized;
};

export const getAICompletion = async (
  messages: Array<{ role: string; content: string }>,
  _apiKey?: string
) => {
  try {
    const result = await callAzureChatCompletions({ messages });
    if (!result.choices.length) {
      toast({
        title: "No Response",
        description: "The AI service did not generate a response. Please try again.",
        variant: "destructive",
      });
      throw new Error("No completion generated");
    }
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    toast({
      title: "AI Service Error",
      description: `Failed to process request: ${errorMessage}`,
      variant: "destructive",
    });
    throw error;
  }
};

export const getResearchCompletion = async (query: string, _apiKey?: string) => {
  try {
    const systemMessage = {
      role: "system",
      content: `You are an AI assistant specialized in federal acquisition research.
                Focus on FAR compliance, procurement strategies, and market research.
                Provide detailed, regulation-compliant responses with relevant FAR citations.`,
    };

    const result = await callAzureChatCompletions({
      messages: [systemMessage, { role: "user", content: query }],
      maxTokens: 4096,
      temperature: 0.7,
      topP: 0.95,
    });

    if (!result.choices[0]?.message?.content) {
      toast({
        title: "Research Error",
        description: "No research results generated. Please try a different query.",
        variant: "destructive",
      });
      throw new Error("No research completion generated");
    }

    return {
      content: result.choices[0].message.content,
      citations: extractFARCitations(result.choices[0].message.content),
      confidence: calculateConfidenceScore(result),
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    toast({
      title: "Research Error",
      description: `Failed to process research request: ${errorMessage}`,
      variant: "destructive",
    });
    throw error;
  }
};

const extractFARCitations = (content: string): string[] => {
  const farRegex = /FAR\s+\d+(\.\d+)*(\([a-z]\))?/g;
  return Array.from(new Set(content.match(farRegex) || []));
};

const calculateConfidenceScore = (result: { usage?: { completion_tokens?: number } }): number => {
  const baseScore = 0.8;
  const tokenRatio = (result.usage?.completion_tokens || 0) / 4096;
  return Math.min(baseScore + tokenRatio * 0.2, 1);
};
