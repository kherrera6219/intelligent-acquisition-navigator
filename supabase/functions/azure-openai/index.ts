
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { AzureKeyCredential, OpenAIClient } from 'npm:@azure/openai';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the API key from environment
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    const endpoint = Deno.env.get('AZURE_OPENAI_ENDPOINT');

    if (!apiKey || !endpoint) {
      throw new Error('Missing API key or endpoint configuration');
    }

    // Parse the request body
    const requestData = await req.json();
    const { messages, options = {} } = requestData;

    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid request format: messages array is required');
    }

    // Setup Azure OpenAI client
    const client = new OpenAIClient(
      endpoint,
      new AzureKeyCredential(apiKey)
    );

    // Get the deployment name from environment or use default
    const deploymentName = Deno.env.get('AZURE_OPENAI_DEPLOYMENT_NAME') || 'gpt-4-turbo';

    console.log(`Using deployment: ${deploymentName}`);
    console.log(`Messages count: ${messages.length}`);

    // Call Azure OpenAI API
    const result = await client.getChatCompletions(
      deploymentName,
      messages,
      {
        temperature: options.temperature || 0.7,
        maxTokens: options.maxTokens || 1000,
        topP: options.topP || 0.95,
        presencePenalty: options.presencePenalty || 0,
        frequencyPenalty: options.frequencyPenalty || 0,
        stopSequences: options.stopSequences || [],
      }
    );

    console.log(`Response received with ${result.choices.length} choices`);

    // Return the response
    return new Response(
      JSON.stringify({
        id: result.id,
        object: 'chat.completion',
        created: Date.now(),
        model: deploymentName,
        choices: result.choices.map(choice => ({
          message: {
            role: choice.message.role,
            content: choice.message.content,
          },
          index: choice.index,
          finish_reason: choice.finishReason,
        })),
        usage: {
          prompt_tokens: result.usage?.promptTokens || 0,
          completion_tokens: result.usage?.completionTokens || 0,
          total_tokens: result.usage?.totalTokens || 0,
        },
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    
    return new Response(
      JSON.stringify({
        error: {
          message: error.message || 'An unexpected error occurred',
          type: error.name || 'UnknownError',
          param: null,
          code: error.status || 500,
        },
      }),
      {
        status: error.status || 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
})
