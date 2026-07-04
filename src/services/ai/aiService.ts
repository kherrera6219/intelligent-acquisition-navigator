
import { toast } from "@/hooks/use-toast";

export type AIProvider = "openai" | "gemini";

/**
 * Error thrown by the AI provider calls below, carrying the HTTP status code
 * (when available) so callers like useAIChat's retry logic can distinguish
 * permanent client errors (4xx — bad API key, malformed request) from
 * transient failures (5xx, network errors) worth retrying.
 */
export class AIServiceError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "AIServiceError";
    this.status = status;
  }
}

interface AIMessage {
  role: string;
  content: string;
}

interface AIResponse {
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
  messages: AIMessage[];
  maxTokens?: number;
  temperature?: number;
  topP?: number;
}

/** Determines which AI provider to use. Defaults to OpenAI. */
const getProvider = (): AIProvider => {
  const provider = (import.meta.env.VITE_AI_PROVIDER as string | undefined)?.toLowerCase();
  return provider === "gemini" ? "gemini" : "openai";
};

const getOpenAIConfig = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;
  const model = (import.meta.env.VITE_OPENAI_MODEL as string | undefined) || "gpt-4o-mini";

  if (!apiKey) {
    throw new Error("VITE_OPENAI_API_KEY is not configured");
  }

  return { apiKey, model };
};

const getGeminiConfig = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  const model = (import.meta.env.VITE_GEMINI_MODEL as string | undefined) || "gemini-1.5-flash";

  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not configured");
  }

  return { apiKey, model };
};

const callOpenAIChatCompletions = async ({
  messages,
  maxTokens = 4096,
  temperature = 1,
  topP = 1,
}: ChatCompletionRequest): Promise<AIResponse> => {
  const config = getOpenAIConfig();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      max_tokens: maxTokens,
      temperature,
      top_p: topP,
    }),
  });

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
    throw new AIServiceError(
      payload.error?.message || `OpenAI request failed (${response.status})`,
      response.status
    );
  }

  return {
    id: payload.id ?? crypto.randomUUID(),
    created: payload.created ?? Date.now(),
    model: payload.model ?? config.model,
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
};

const callGeminiChatCompletions = async ({
  messages,
  maxTokens = 4096,
  temperature = 1,
  topP = 1,
}: ChatCompletionRequest): Promise<AIResponse> => {
  const config = getGeminiConfig();

  // Gemini separates system instructions from the conversation turns, and uses
  // "model" instead of "assistant" for the AI role.
  const systemParts = messages.filter((m) => m.role === "system").map((m) => m.content);
  const contents = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  const body: Record<string, unknown> = {
    contents,
    generationConfig: {
      maxOutputTokens: maxTokens,
      temperature,
      topP,
    },
  };

  if (systemParts.length > 0) {
    body.systemInstruction = { parts: [{ text: systemParts.join("\n\n") }] };
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  const payload = (await response.json()) as {
    error?: { message?: string };
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }>; role?: string };
      finishReason?: string;
    }>;
    usageMetadata?: {
      promptTokenCount?: number;
      candidatesTokenCount?: number;
      totalTokenCount?: number;
    };
  };

  if (!response.ok) {
    throw new AIServiceError(
      payload.error?.message || `Gemini request failed (${response.status})`,
      response.status
    );
  }

  return {
    id: crypto.randomUUID(),
    created: Date.now(),
    model: config.model,
    object: "chat.completion",
    usage: {
      prompt_tokens: payload.usageMetadata?.promptTokenCount ?? 0,
      completion_tokens: payload.usageMetadata?.candidatesTokenCount ?? 0,
      total_tokens: payload.usageMetadata?.totalTokenCount ?? 0,
    },
    choices: (payload.candidates ?? []).map((candidate, index) => ({
      index,
      finish_reason: candidate.finishReason ?? "",
      message: {
        role: "assistant",
        content: (candidate.content?.parts ?? []).map((part) => part.text ?? "").join(""),
      },
    })),
  };
};

const callChatCompletions = async (request: ChatCompletionRequest): Promise<AIResponse> => {
  const provider = getProvider();
  return provider === "gemini" ? callGeminiChatCompletions(request) : callOpenAIChatCompletions(request);
};

export const getAICompletion = async (
  messages: AIMessage[],
  _apiKey?: string
) => {
  try {
    const result = await callChatCompletions({ messages });
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

    const result = await callChatCompletions({
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
