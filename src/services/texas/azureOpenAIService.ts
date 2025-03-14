
import { AIChatMessage } from '@/types/chat';
import { supabase } from '@/integrations/supabase/client';

interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    index: number;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Gets a completion from Azure OpenAI
 */
export async function getAzureOpenAICompletion(
  messages: AIChatMessage[]
): Promise<OpenAIResponse> {
  try {
    const response = await supabase.functions.invoke('azure-openai', {
      body: { messages },
    });

    if (response.error) {
      throw new Error(`API request failed: ${response.error.message}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error calling Azure OpenAI:', error);
    throw error;
  }
}

/**
 * Gets a completion from Azure OpenAI with offline support
 */
export async function getAzureOpenAICompletionWithOfflineSupport(
  messages: AIChatMessage[],
  options = {
    bypassCache: false,
    offlineFallback: false
  }
): Promise<OpenAIResponse> {
  try {
    const response = await supabase.functions.invoke('azure-openai', {
      body: { 
        messages,
        options
      },
    });

    if (response.error) {
      throw new Error(`API request failed: ${response.error.message}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error calling Azure OpenAI:', error);
    throw error;
  }
}
