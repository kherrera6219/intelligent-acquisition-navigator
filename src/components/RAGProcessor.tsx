import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Search, Database } from 'lucide-react';
import { queryVectorStore } from '../services/rag/vectorStore';
import { useQuery } from '@tanstack/react-query';

interface RAGResult {
  augmentedResponse: string;
  retrievedContext: string[];
  confidence: number;
}

export const RAGProcessor = () => {
  const [query, setQuery] = useState('');
  const { toast } = useToast();

  const { data: ragResult, isLoading, refetch } = useQuery<RAGResult>({
    queryKey: ['rag', query],
    queryFn: async () => {
      const vectorResults = await queryVectorStore(query);
      // Mock augmented response - replace with actual LLM call
      return {
        augmentedResponse: `Enhanced response for: ${query}`,
        retrievedContext: vectorResults.matches.map(m => m.metadata.text),
        confidence: vectorResults.matches[0]?.score || 0
      };
    },
    enabled: false
  });

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Query Required",
        description: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }
    refetch();
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            RAG Processor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter your query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              Search
            </Button>
          </div>

          {ragResult && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-violet-50 rounded-lg">
                <h3 className="font-medium text-violet-900 mb-2">Augmented Response</h3>
                <p className="text-violet-800">{ragResult.augmentedResponse}</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Retrieved Context</h3>
                <ul className="space-y-2">
                  {ragResult.retrievedContext.map((context, idx) => (
                    <li key={idx} className="text-gray-700 text-sm">
                      {context}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Confidence Score:</span>
                <span className="font-medium">
                  {(ragResult.confidence * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};