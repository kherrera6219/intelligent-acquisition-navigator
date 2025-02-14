
import { Pinecone } from '@pinecone-database/pinecone';

const MOCK_VECTOR_STORE = {
  matches: [
    {
      id: '1',
      score: 0.95,
      metadata: {
        text: 'Sample retrieved context',
        source: 'knowledge_base_1'
      }
    }
  ]
};

let pinecone: Pinecone | null = null;

if (import.meta.env.VITE_PINECONE_API_KEY) {
  pinecone = new Pinecone({
    apiKey: import.meta.env.VITE_PINECONE_API_KEY
  });
}

export const initVectorStore = async () => {
  return pinecone;
};

export const queryVectorStore = async (query: string) => {
  try {
    if (!pinecone) {
      console.warn('Using mock vector store as Pinecone API key is not configured');
      return {
        matches: MOCK_VECTOR_STORE.matches.map(match => ({
          ...match,
          metadata: {
            ...match.metadata,
            text: `${match.metadata.text} for ${query}`
          }
        }))
      };
    }

    // This is where you would implement the actual Pinecone query
    // For now, we'll still return mock data
    return {
      matches: MOCK_VECTOR_STORE.matches.map(match => ({
        ...match,
        metadata: {
          ...match.metadata,
          text: `Sample retrieved context for ${query}`
        }
      }))
    };
  } catch (error) {
    console.error('Error querying vector store:', error);
    throw error;
  }
};