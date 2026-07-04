import { describe, it, expect, vi, beforeEach } from 'vitest';

const { queryVectorStore } = await import('@/services/rag/vectorStore');

describe('queryVectorStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns lexical matches from local knowledge base', async () => {
    const result = await queryVectorStore('FAR 15.3 source selection');
    expect(result.matches.length).toBeGreaterThan(0);
    expect(result.matches[0].metadata.text.toLowerCase()).toContain('far');
  });

  it('returns empty matches for unrelated query', async () => {
    const result = await queryVectorStore('zzzz unrelated token');
    expect(result.matches).toEqual([]);
  });
});
