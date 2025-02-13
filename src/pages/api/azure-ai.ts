
import { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(
      'https://knowledgedev2443059259.services.ai.azure.com/openai/deployments/gpt-4o/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.AZURE_OPENAI_API_KEY || '',
        },
        body: JSON.stringify(req.body),
      }
    );

    if (!response.ok) {
      throw new Error('Azure API error');
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Azure AI API error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
