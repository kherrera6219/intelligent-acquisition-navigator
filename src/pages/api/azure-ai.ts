
import { Request, Response } from 'express';
import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-opus-4-6';

let client: Anthropic | null = null;

const getClient = (): Anthropic => {
  if (!client) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
};

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

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({
      error: 'AI service not configured',
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

  // Separate system messages from conversation messages
  const systemMessages = messages.filter((m: { role: string }) => m.role === 'system');
  const conversationMessages = messages.filter((m: { role: string }) => m.role !== 'system');

  const systemPrompt = systemMessages.map((m: { content: string }) => m.content).join('\n') ||
    (isResearch
      ? 'You are an AI assistant specialized in federal acquisition research. Focus on FAR compliance, procurement strategies, and market research. Provide detailed, regulation-compliant responses with relevant FAR citations.'
      : 'You are an expert AI assistant for federal acquisition professionals. Provide accurate, regulation-compliant guidance.');

  try {
    // Use streaming to avoid HTTP timeouts on long responses
    const stream = await getClient().messages.stream({
      model: MODEL,
      max_tokens: 16000,
      thinking: { type: 'adaptive' },
      system: systemPrompt,
      messages: conversationMessages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });

    const message = await stream.finalMessage();

    const textContent = message.content.find(b => b.type === 'text');
    const responseText = textContent && textContent.type === 'text' ? textContent.text : '';

    return res.status(200).json({
      choices: [{
        message: {
          content: responseText,
          role: 'assistant',
        },
        finish_reason: message.stop_reason,
        index: 0,
      }],
      model: MODEL,
      usage: {
        prompt_tokens: message.usage.input_tokens,
        completion_tokens: message.usage.output_tokens,
        total_tokens: message.usage.input_tokens + message.usage.output_tokens,
      },
    });
  } catch (error) {
    console.error('Claude API error:', error);

    if (error instanceof Anthropic.AuthenticationError) {
      return res.status(401).json({ error: 'Invalid API key', code: 'AUTHENTICATION_ERROR', status: 401, message: 'The configured API key is invalid.' });
    }
    if (error instanceof Anthropic.RateLimitError) {
      return res.status(429).json({ error: 'Rate limit exceeded', code: 'RATE_LIMIT_ERROR', status: 429, message: 'Too many requests. Please try again shortly.' });
    }
    if (error instanceof Anthropic.BadRequestError) {
      return res.status(400).json({ error: 'Bad request', code: 'INVALID_REQUEST', status: 400, message: 'The request could not be processed.' });
    }

    const aiError = error as AIError;
    return res.status(aiError.status || 500).json({
      error: 'Failed to process request',
      code: aiError.code || 'AI_SERVICE_ERROR',
      status: aiError.status || 500,
      message: 'An error occurred while processing your request.'
    });
  }
}
