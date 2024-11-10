import { Pinecone } from '@pinecone-database/pinecone';

if (!import.meta.env.VITE_PINECONE_API_KEY) {
  throw new Error('VITE_PINECONE_API_KEY environment variable is required');
}

const pinecone = new Pinecone({
  apiKey: import.meta.env.VITE_PINECONE_API_KEY
});

export const initVectorStore = async () => {
  return pinecone;
};

export const queryVectorStore = async (query: string) => {
  try {
    // This is a mock implementation - replace with actual Pinecone query
    return {
      matches: [
        {
          id: '1',
          score: 0.95,
          metadata: {
            text: 'Sample retrieved context for ' + query,
            source: 'knowledge_base_1'
          }
        }
      ]
    };
  } catch (error) {
    console.error('Error querying vector store:', error);
    throw error;
  }
};