import { describe, it, expect, vi, beforeEach } from 'vitest';

// ----------------------------------------------------------------
// Test the vectorStore in "no Pinecone key" mode (graceful degradation)
// ----------------------------------------------------------------
vi.stubEnv('VITE_PINECONE_API_KEY', '');
vi.stubEnv('VITE_PINECONE_INDEX_NAME', '');

// Import AFTER env stubs so the module initialises with empty key
const { queryVectorStore } = await import('@/services/rag/vectorStore');

describe('queryVectorStore (no Pinecone key)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns empty matches when Pinecone is not configured', async () => {
    const result = await queryVectorStore('FAR 15.3 source selection');
    expect(result).toHaveProperty('matches');
    expect(Array.isArray(result.matches)).toBe(true);
    expect(result.matches).toHaveLength(0);
  });

  it('does not throw even for unusual query strings', async () => {
    await expect(queryVectorStore('')).resolves.not.toThrow();
    await expect(queryVectorStore('<script>alert(1)</script>')).resolves.not.toThrow();
  });
});
