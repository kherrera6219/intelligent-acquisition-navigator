
import { Request, Response } from 'express';
import { AzureKeyCredential, OpenAIClient } from "@azure/openai";

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
      status: 405,
      message: 'This endpoint only accepts POST requests'
    });
  }

  try {
    if (!process.env.AZURE_OPENAI_API_KEY) {
      throw Object.assign(new Error('Azure OpenAI API key not configured'), {
        code: 'CONFIGURATION_ERROR',
        status: 500,
        message: 'The API key has not been configured on the server'
      });
    }

    const { messages, isResearch } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: 'Invalid request body',
        code: 'INVALID_REQUEST',
        status: 400,
        message: 'Messages must be provided as an array'
      });
    }

    const deploymentId = 'gpt-4o';

    const result = await client.getChatCompletions(deploymentId, messages, {
      maxTokens: 4096,
      temperature: isResearch ? 0.7 : 1,
      topP: 1
    });

    if (!result || !result.choices || result.choices.length === 0) {
      throw Object.assign(new Error('No completion generated'), {
        code: 'NO_COMPLETION',
        status: 500,
        message: 'The AI service did not generate a response'
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Azure AI API error:', error);
    
    const aiError = error as AIError;
    return res.status(aiError.status || 500).json({ 
      error: aiError.message || 'Failed to process request',
      code: aiError.code || 'AI_SERVICE_ERROR',
      status: aiError.status || 500,
      message: aiError instanceof Error ? aiError.message : 'An unknown error occurred'
    });
  }
}
