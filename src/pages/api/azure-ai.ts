
import { Request, Response } from 'express';
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

const client = new OpenAIClient(
  "https://knowledgedev2443059259.services.ai.azure.com/",
  new AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY || '')
);

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, isResearch } = req.body;
    const deploymentId = 'gpt-4o';

    if (isResearch) {
      // Enhanced context for research queries
      messages.unshift({
        role: "system",
        content: `You are an AI assistant specialized in federal acquisition research. 
                  Provide detailed, regulation-compliant responses with FAR citations.`
      });
    }

    const result = await client.getChatCompletions(deploymentId, messages, {
      maxTokens: 4096,
      temperature: isResearch ? 0.7 : 1,
      topP: isResearch ? 0.95 : 1,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Azure AI API error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
