import { AIChatMessage } from "@/types/chat";
import { fetchWithRetry } from "@/utils/retryMechanism";
import { sanitizeHtml } from "@/utils/inputSanitization";
import { protectedFetch } from "@/utils/csrfProtection";
import { offlineFetch } from "@/utils/offlineStorage";
import { rateLimitManager } from "@/utils/rateLimitManager";

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
  // First check if we're rate limited
  const isAllowed = rateLimitManager.isAllowed({
    maxRequests: 50,  // 50 requests
    timeWindow: 60000,  // per minute
    key: 'azure-openai'
  });
  
  if (!isAllowed) {
    const timeRemaining = rateLimitManager.getTimeRemaining('azure-openai');
    throw new Error(`Rate limit exceeded. Please try again in ${Math.ceil(timeRemaining / 1000)} seconds.`);
  }
  
  try {
    // Sanitize messages to prevent XSS
    const sanitizedMessages = messages.map(msg => ({
      ...msg,
      content: sanitizeHtml(msg.content)
    }));
    
    // Try using offline-aware fetch first
    try {
      const response = await offlineFetch(AZURE_OPENAI_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': AZURE_OPENAI_API_KEY,
          'X-CSRF-Token': localStorage.getItem('app_csrf_token') || ''
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: sanitizedMessages,
        }),
        cacheMaxAge: 3600000, // 1 hour cache
        offlinePriority: 5, // High priority for this request when back online
      });
      
      if (!response.ok) {
        throw new Error(`Azure OpenAI API returned ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      // If offline fetch doesn't work, try with retry mechanism as fallback
      if (error instanceof TypeError && error.message.includes('network')) {
        throw error; // Re-throw network errors for proper handling
      }
      
      // Otherwise, try protected fetch with retry
      const response = await fetchWithRetry(AZURE_OPENAI_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': AZURE_OPENAI_API_KEY,
          'X-CSRF-Token': localStorage.getItem('app_csrf_token') || ''
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: sanitizedMessages,
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
    }
  } catch (error) {
    console.error('Azure OpenAI API error:', error);
    throw error;
  }
}
