
import { OpenAIApi } from "@azure/openai";
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

let client: OpenAIApi | null = null;

const initializeClient = (apiKey: string) => {
  if (!apiKey) {
    throw new Error('Azure OpenAI API key is required');
  }
  
  try {
    client = new OpenAIApi(
      "https://knowledgedev2443059259.services.ai.azure.com/",
      apiKey
    );
    return client;
  } catch (error) {
    console.error('Failed to initialize Azure OpenAI client:', error);
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

    const deploymentId = 'gpt-4o';
    const result = await client.getChatCompletions(deploymentId, messages, {
      maxTokens: 4096,
      temperature: 1,
      topP: 1,
    });

    if (!result || !result.choices || result.choices.length === 0) {
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
    toast({
      title: "Error",
      description: "Failed to process AI request. Please try again later.",
      variant: "destructive",
    });
    console.error('Azure OpenAI Error:', error);
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
      'gpt-4o',
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
      throw new Error('No research completion generated');
    }

    return {
      content: result.choices[0].message.content,
      citations: extractFARCitations(result.choices[0].message.content),
      confidence: calculateConfidenceScore(result)
    };
  } catch (error) {
    toast({
      title: "Research Error",
      description: "Failed to process research request. Please try again.",
      variant: "destructive",
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
const calculateConfidenceScore = (result: any): number => {
  const baseScore = 0.8;
  const tokenRatio = (result.usage?.completionTokens || 0) / 4096;
  return Math.min(baseScore + (tokenRatio * 0.2), 1);
};
