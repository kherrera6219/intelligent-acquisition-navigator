
import { AIChatMessage } from "@/types/chat";

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

export async function getFederalAzureOpenAICompletion(messages: AIChatMessage[]): Promise<AzureOpenAIResponse> {
  try {
    const response = await fetch(AZURE_OPENAI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages,
      }),
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
