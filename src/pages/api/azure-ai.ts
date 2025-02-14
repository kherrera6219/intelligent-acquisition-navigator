
import { Request, Response } from 'express';
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

const client = new OpenAIClient(
  "https://knowledgedev2443059259.services.ai.azure.com/",
  new AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY || '')
);

interface AIError extends Error {
  code?: string;
  status?: number;
}

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      code: 'METHOD_NOT_ALLOWED',
      status: 405 
    });
  }

  try {
    if (!process.env.AZURE_OPENAI_API_KEY) {
      throw Object.assign(new Error('Azure OpenAI API key not configured'), {
        code: 'CONFIGURATION_ERROR',
        status: 500
      });
    }

    const { messages, isResearch } = req.body;
    const deploymentId = 'gpt-4o';

    // Add rate limiting checks based on deployment settings
    // Rate limits: 414,000 tokens/min, 2,484 requests/min
    const result = await client.getChatCompletions(deploymentId, messages, {
      maxTokens: 4096,
      temperature: isResearch ? 0.7 : 1,
      topP: 1
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Azure AI API error:', error);
    
    const aiError = error as AIError;
    return res.status(aiError.status || 500).json({ 
      error: aiError.message || 'Failed to process request',
      code: aiError.code || 'AI_SERVICE_ERROR',
      status: aiError.status || 500
    });
  }
}
