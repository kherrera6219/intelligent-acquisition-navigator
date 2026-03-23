
import { Pinecone } from '@pinecone-database/pinecone';
import { errorTracker } from '@/lib/security/errorTracking';

export interface VectorMatch {
  id: string;
  score: number;
  metadata: {
    text: string;
    source: string;
    [key: string]: unknown;
  };
}

export interface VectorQueryResult {
  matches: VectorMatch[];
}

let pinecone: Pinecone | null = null;

const getPineconeClient = (): Pinecone | null => {
  if (pinecone) return pinecone;
  const apiKey = import.meta.env.VITE_PINECONE_API_KEY as string | undefined;
  if (!apiKey) return null;
  pinecone = new Pinecone({ apiKey });
  return pinecone;
};

export const initVectorStore = async (): Promise<Pinecone | null> => {
  return getPineconeClient();
};

export const queryVectorStore = async (
  query: string,
  topK = 5
): Promise<VectorQueryResult> => {
  const client = getPineconeClient();

  if (!client) {
    // Graceful degradation: warn and return empty results so the reasoning
    // engine continues with whatever context it has from the LLM alone.
    errorTracker.trackError({
      message: 'Pinecone API key not configured — vector store unavailable',
      severity: 'MEDIUM',
      errorType: 'SYSTEM',
      status: 'NEW',
    });
    return { matches: [] };
  }

  try {
    const indexName = (import.meta.env.VITE_PINECONE_INDEX_NAME as string | undefined)
      ?? 'acquisition-knowledge-base';

    const index = client.index(indexName);

    // Pinecone requires a dense vector for query. We generate a simple
    // deterministic embedding from the query text using a seeded hash so the
    // integration works end-to-end without a separate embedding service.
    // Replace this with a real text-embedding-ada-002 call when available.
    const vector = pseudoEmbedding(query, 1536);

    const result = await index.query({
      vector,
      topK,
      includeMetadata: true,
    });

    const matches: VectorMatch[] = (result.matches ?? []).map((m) => ({
      id: m.id,
      score: m.score ?? 0,
      metadata: {
        text: (m.metadata?.text as string) ?? '',
        source: (m.metadata?.source as string) ?? 'knowledge_base',
        ...(m.metadata as Record<string, unknown>),
      },
    }));

    return { matches };
  } catch (error) {
    errorTracker.trackError({
      message: error instanceof Error ? error.message : 'Vector store query failed',
      stack: error instanceof Error ? error.stack : undefined,
      severity: 'HIGH',
      errorType: 'SYSTEM',
      status: 'NEW',
    });
    // Return empty matches so downstream callers degrade gracefully
    return { matches: [] };
  }
};

/**
 * Generates a pseudo-embedding vector from a string for index compatibility.
 * This is a placeholder — replace with a real embedding model call
 * (e.g., Azure OpenAI text-embedding-ada-002) for semantic similarity.
 */
function pseudoEmbedding(text: string, dimensions: number): number[] {
  const vec = new Array<number>(dimensions).fill(0);
  for (let i = 0; i < text.length; i++) {
    vec[i % dimensions] += text.charCodeAt(i) / 255;
  }
  // L2-normalize
  const norm = Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0)) || 1;
  return vec.map((v) => v / norm);
}
