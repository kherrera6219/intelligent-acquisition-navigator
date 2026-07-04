import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}));

vi.stubEnv('VITE_AI_PROVIDER', 'openai');
vi.stubEnv('VITE_OPENAI_API_KEY', 'test-key');

import { getAICompletion, AIServiceError } from '../aiService';

describe('aiService — HTTP status propagation (code review Finding #4)', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.clearAllMocks();
  });

  it('attaches the HTTP status code to the thrown error on a 401 (invalid key)', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ error: { message: 'Invalid API key' } }),
    });

    await expect(getAICompletion([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      status: 401,
    });
  });

  it('thrown error is an instance of AIServiceError so callers can branch on .status', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ error: { message: 'Bad request' } }),
    });

    try {
      await getAICompletion([{ role: 'user', content: 'hi' }]);
      throw new Error('Expected getAICompletion to reject');
    } catch (err) {
      expect(err).toBeInstanceOf(AIServiceError);
      expect((err as AIServiceError).status).toBe(400);
    }
  });

  it('attaches a 5xx status for transient upstream failures', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 503,
      json: async () => ({ error: { message: 'Service unavailable' } }),
    });

    await expect(getAICompletion([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      status: 503,
    });
  });
});
