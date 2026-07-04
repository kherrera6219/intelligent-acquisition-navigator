
import { AzureKeyCredential, OpenAIClient } from "@azure/openai";
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

let client: OpenAIClient | null = null;

const getDeploymentId = (): string => {
  return (import.meta.env.VITE_AZURE_DEPLOYMENT_ID as string | undefined) || 'gpt-4o';
};

const initializeClient = (apiKey: string) => {
  if (!apiKey) {
    toast({
      title: "Missing API Key",
      description: "Please provide a valid Azure OpenAI API key",
      variant: "destructive"
    });
    throw new Error('Azure OpenAI API key is required');
  }
  
  try {
    const endpoint = import.meta.env.VITE_AZURE_ENDPOINT as string;
    if (!endpoint) {
      throw new Error('Azure OpenAI endpoint (VITE_AZURE_ENDPOINT) is not configured');
    }
    client = new OpenAIClient(
      endpoint,
      new AzureKeyCredential(apiKey)
    );
    return client;
  } catch (error) {
    toast({
      title: "Initialization Error",
      description: "Failed to initialize AI client. Please check your API key.",
      variant: "destructive"
    });
    throw error;
  }
};

export const getAICompletion = async (messages: Array<{ role: string; content: string }>, apiKey: string) => {
  try {
    if (!client) {
      initializeClient(apiKey);
    }

    if (!client) {
      throw new Error('Azure OpenAI client not initialized');
    }

    const deploymentId = getDeploymentId();
    const result = await client.getChatCompletions(deploymentId, messages, {
      maxTokens: 4096,
      temperature: 1,
      topP: 1,
    });

    if (!result || !result.choices || result.choices.length === 0) {
      toast({
        title: "No Response",
        description: "The AI service did not generate a response. Please try again.",
        variant: "destructive"
      });
      throw new Error('No completion generated');
    }

    const response: AzureAIResponse = {
      choices: result.choices.map(choice => ({
        message: {
          content: choice.message?.content || '',
          role: choice.message?.role || 'assistant'
        },
        finish_reason: choice.finishReason || '',
        index: choice.index
      })),
      created: Date.now(),
      id: result.id,
      model: deploymentId,
      object: 'chat.completion',
      usage: {
        prompt_tokens: result.usage?.promptTokens || 0,
        completion_tokens: result.usage?.completionTokens || 0,
        total_tokens: result.usage?.totalTokens || 0
      }
    };

    return response;
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

export const getResearchCompletion = async (query: string, apiKey: string) => {
  try {
    if (!client) {
      initializeClient(apiKey);
    }

    if (!client) {
      throw new Error('Azure OpenAI client not initialized');
    }

    const systemMessage = {
      role: "system",
      content: `You are an AI assistant specialized in federal acquisition research. 
                Focus on FAR compliance, procurement strategies, and market research. 
                Provide detailed, regulation-compliant responses with relevant FAR citations.`
    };

    const result = await client.getChatCompletions(
      getDeploymentId(),
      [
        systemMessage,
        { role: "user", content: query }
      ],
      {
        maxTokens: 4096,
        temperature: 0.7,
        topP: 0.95,
      }
    );

    if (!result.choices[0]?.message?.content) {
      toast({
        title: "Research Error",
        description: "No research results generated. Please try a different query.",
        variant: "destructive"
      });
      throw new Error('No research completion generated');
    }

    return {
      content: result.choices[0].message.content,
      citations: extractFARCitations(result.choices[0].message.content),
      confidence: calculateConfidenceScore(result)
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

// Helper function to extract FAR citations from the response
const extractFARCitations = (content: string): string[] => {
  const farRegex = /FAR\s+\d+(\.\d+)*(\([a-z]\))?/g;
  return Array.from(new Set(content.match(farRegex) || []));
};

// Helper function to calculate confidence score based on response metadata
const calculateConfidenceScore = (result: { usage?: { completionTokens?: number } }): number => {
  const baseScore = 0.8;
  const tokenRatio = (result.usage?.completionTokens || 0) / 4096;
  return Math.min(baseScore + (tokenRatio * 0.2), 1);
};
