import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock AI service so tests don't make real API calls
vi.mock('@/services/ai/aiService', () => ({
  getAICompletion: vi.fn(),
}));

vi.mock('@/components/ui/use-toast', () => ({
  toast: vi.fn(),
}));

// Stub the API key
vi.stubEnv('VITE_OPENAI_API_KEY', 'test-key');

import { getAICompletion } from '@/services/ai/aiService';
import { processMasterLLM } from '../masterLLM';

const mockGetAICompletion = vi.mocked(getAICompletion);

describe('processMasterLLM', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('parses valid JSON response from LLM', async () => {
    mockGetAICompletion.mockResolvedValueOnce({
      choices: [{
        message: {
          content: JSON.stringify({
            suggestion: 'Use FAR 15.3 for competitive source selection.',
            confidence: 0.92,
            reasoning: 'Based on FAR Part 15 requirements.',
          }),
          role: 'assistant',
        },
        finish_reason: 'stop',
        index: 0,
      }],
      created: Date.now(),
      id: 'test-id',
      model: 'gpt-4o',
      object: 'chat.completion',
      usage: { prompt_tokens: 10, completion_tokens: 50, total_tokens: 60 },
    });

    const result = await processMasterLLM('How do I conduct a source selection?');

    expect(result.suggestion).toBe('Use FAR 15.3 for competitive source selection.');
    expect(result.confidence).toBe(0.92);
    expect(result.reasoning).toBe('Based on FAR Part 15 requirements.');
  });

  it('falls back gracefully when LLM returns non-JSON', async () => {
    mockGetAICompletion.mockResolvedValueOnce({
      choices: [{
        message: { content: 'Plain text response from model.', role: 'assistant' },
        finish_reason: 'stop',
        index: 0,
      }],
      created: Date.now(),
      id: 'test-id',
      model: 'gpt-4o',
      object: 'chat.completion',
      usage: { prompt_tokens: 5, completion_tokens: 10, total_tokens: 15 },
    });

    const result = await processMasterLLM('What is FAR Part 12?');

    expect(result.suggestion).toBe('Plain text response from model.');
    expect(result.confidence).toBe(0.70);
  });

  it('clamps confidence to [0, 1]', async () => {
    mockGetAICompletion.mockResolvedValueOnce({
      choices: [{
        message: {
          content: JSON.stringify({ suggestion: 'Test', confidence: 1.5, reasoning: '' }),
          role: 'assistant',
        },
        finish_reason: 'stop',
        index: 0,
      }],
      created: Date.now(),
      id: 'test-id',
      model: 'gpt-4o',
      object: 'chat.completion',
      usage: { prompt_tokens: 5, completion_tokens: 10, total_tokens: 15 },
    });

    const result = await processMasterLLM('test');
    expect(result.confidence).toBeLessThanOrEqual(1);
    expect(result.confidence).toBeGreaterThanOrEqual(0);
  });

  it('throws when AI service fails', async () => {
    mockGetAICompletion.mockRejectedValueOnce(new Error('Upstream unavailable'));
    await expect(processMasterLLM('test')).rejects.toThrow('Upstream unavailable');
  });
});
