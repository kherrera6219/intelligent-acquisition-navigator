
import { AIChatMessage } from "@/types/chat";
import { fetchWithRetry } from "@/utils/retryMechanism";

interface AzureOpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// Securely store API endpoint and key
const AZURE_OPENAI_ENDPOINT = 'https://knowledgedev2443059259.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-08-01-preview';
// Note: In a production environment, this key should be stored in a secure backend service
const AZURE_OPENAI_API_KEY = 'eMT009c9UQ0DDyYHGyeyotsbX9SyCo1ic3lqeor4h6n1RzMVBhIRJQQJ99AKACLArgHXJ3w3AAAAACOGz4uN';

export async function getAzureOpenAICompletion(messages: AIChatMessage[]): Promise<AzureOpenAIResponse> {
  try {
    // Use fetchWithRetry instead of regular fetch
    const response = await fetchWithRetry(AZURE_OPENAI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages,
      }),
    }, {
      // Configure retry options
      maxRetries: 3,
      initialDelay: 1000,
      backoffFactor: 1.5,
      retryableStatuses: [408, 429, 500, 502, 503, 504],
    });

    if (!response.ok) {
      throw new Error(`Azure OpenAI API returned ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Azure OpenAI API error:', error);
    throw error;
  }
}
