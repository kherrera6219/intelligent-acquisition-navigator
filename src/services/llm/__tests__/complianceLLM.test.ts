import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/services/azure/aiService', () => ({
  getAICompletion: vi.fn(),
}));

vi.mock('@/components/ui/use-toast', () => ({
  toast: vi.fn(),
}));

vi.stubEnv('VITE_AZURE_OPENAI_API_KEY', 'test-key');

import { getAICompletion } from '@/services/azure/aiService';
import { checkCompliance } from '../complianceLLM';

const mockGetAICompletion = vi.mocked(getAICompletion);

const makeResponse = (content: string) => ({
  choices: [{ message: { content, role: 'assistant' }, finish_reason: 'stop', index: 0 }],
  created: Date.now(),
  id: 'test',
  model: 'gpt-4o',
  object: 'chat.completion',
  usage: { prompt_tokens: 5, completion_tokens: 10, total_tokens: 15 },
});

describe('checkCompliance', () => {
  beforeEach(() => vi.clearAllMocks());

  it('parses approved compliance response', async () => {
    mockGetAICompletion.mockResolvedValueOnce(makeResponse(JSON.stringify({
      approved: true,
      reason: 'Compliant with FAR 15.305.',
      riskLevel: 'low',
      suggestions: [],
    })));

    const result = await checkCompliance('Source selection evaluation approach');
    expect(result.approved).toBe(true);
    expect(result.riskLevel).toBe('low');
    expect(result.reason).toContain('FAR');
  });

  it('parses failed compliance response', async () => {
    mockGetAICompletion.mockResolvedValueOnce(makeResponse(JSON.stringify({
      approved: false,
      reason: 'Fails FAR 6.302 — sole source justification missing.',
      riskLevel: 'high',
      suggestions: ['Obtain J&A approval before proceeding.'],
    })));

    const result = await checkCompliance('Sole source award without justification');
    expect(result.approved).toBe(false);
    expect(result.riskLevel).toBe('high');
    expect(result.suggestions).toHaveLength(1);
  });

  it('falls back to high risk when LLM returns non-JSON', async () => {
    mockGetAICompletion.mockResolvedValueOnce(makeResponse('Unable to evaluate.'));

    const result = await checkCompliance('test');
    expect(result.approved).toBe(false);
    expect(result.riskLevel).toBe('high');
    expect(result.suggestions.length).toBeGreaterThan(0);
  });

  it('normalises invalid riskLevel to medium', async () => {
    mockGetAICompletion.mockResolvedValueOnce(makeResponse(JSON.stringify({
      approved: true,
      reason: 'OK',
      riskLevel: 'unknown-level',
      suggestions: [],
    })));

    const result = await checkCompliance('test');
    expect(result.riskLevel).toBe('medium');
  });
});
