
import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-opus-4-6';
const MAX_TOKENS = 16000;

/**
 * Number of recent conversation turns to include in each request.
 * Prevents context-window overflow on long conversations.
 */
const CONTEXT_WINDOW_MESSAGES = 20;

/**
 * Characters allowed per individual message before truncation.
 * Prevents a single huge paste from exhausting the budget.
 */
const MAX_CHARS_PER_MESSAGE = 8_000;

export interface AzureAIResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
    index: number;
  }>;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Lazy singleton — initialised once the key is available
let _client: Anthropic | null = null;

const getClient = (): Anthropic => {
  if (!_client) {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error(
        'VITE_ANTHROPIC_API_KEY is not configured. ' +
        'Add VITE_ANTHROPIC_API_KEY=<your-key> to your .env.local file.'
      );
    }
    _client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
  }
  return _client;
};

/** Truncate a message body that exceeds the per-message character cap. */
const truncateContent = (content: string): string =>
  content.length > MAX_CHARS_PER_MESSAGE
    ? content.slice(0, MAX_CHARS_PER_MESSAGE) + '\n[Content truncated for length]'
    : content;

/**
 * Apply a sliding context window:
 *   1. Separate system messages (always kept).
 *   2. Keep only the last CONTEXT_WINDOW_MESSAGES non-system messages.
 *   3. Truncate any individual message that exceeds MAX_CHARS_PER_MESSAGE.
 */
const buildContext = (
  messages: Array<{ role: string; content: string }>
): { system: string; conversation: Array<{ role: 'user' | 'assistant'; content: string }> } => {
  const systemParts = messages.filter((m) => m.role === 'system');
  const conversation = messages
    .filter((m) => m.role !== 'system')
    .slice(-CONTEXT_WINDOW_MESSAGES)
    .map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: truncateContent(m.content),
    }));

  const system = systemParts.map((m) => m.content).join('\n') ||
    'You are an expert AI assistant for federal acquisition professionals. Provide accurate, regulation-compliant guidance.';

  return { system, conversation };
};

// Helper — extract FAR citations from response text
export const extractFARCitations = (content: string): string[] => {
  const farRegex = /FAR\s+\d+(\.\d+)*(\([a-z]\))?/g;
  return Array.from(new Set(content.match(farRegex) || []));
};

/**
 * Core completion function. Calls Claude directly from the browser via the
 * official Anthropic SDK (dangerouslyAllowBrowser mode).
 *
 * Accepts an optional AbortSignal so callers can cancel in-flight requests.
 */
export const getAICompletion = async (
  messages: Array<{ role: string; content: string }>,
  // Legacy param — no longer used; kept for call-site compatibility
  _apiKey?: string,
  signal?: AbortSignal
): Promise<AzureAIResponse> => {
  const { system, conversation } = buildContext(messages);

  const response = await getClient().messages.create(
    {
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system,
      messages: conversation,
    },
    { signal }
  );

  const textBlock = response.content.find((b) => b.type === 'text');
  const responseText = textBlock && textBlock.type === 'text' ? textBlock.text : '';

  return {
    choices: [
      {
        message: { content: responseText, role: 'assistant' },
        finish_reason: response.stop_reason ?? 'end_turn',
        index: 0,
      },
    ],
    model: response.model,
    usage: {
      prompt_tokens: response.usage.input_tokens,
      completion_tokens: response.usage.output_tokens,
      total_tokens: response.usage.input_tokens + response.usage.output_tokens,
    },
  };
};

const calculateConfidenceScore = (result: AzureAIResponse): number => {
  const tokenRatio = (result.usage?.completion_tokens || 0) / MAX_TOKENS;
  return Math.min(0.8 + tokenRatio * 0.2, 1);
};

/**
 * Research-focused completion with FAR citation extraction.
 */
export const getResearchCompletion = async (query: string, _apiKey?: string) => {
  const messages = [
    {
      role: 'system',
      content:
        'You are an AI assistant specialized in federal acquisition research. ' +
        'Focus on FAR compliance, procurement strategies, and market research. ' +
        'Provide detailed, regulation-compliant responses with relevant FAR citations.',
    },
    { role: 'user', content: truncateContent(query) },
  ];

  const data = await getAICompletion(messages);
  const content = data.choices[0]?.message?.content || '';

  return {
    content,
    citations: extractFARCitations(content),
    confidence: calculateConfidenceScore(data),
  };
};
