
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Search, Database, FileText, AlertTriangle } from 'lucide-react';
import { queryVectorStore } from '../services/rag/vectorStore';
import { useQuery } from '@tanstack/react-query';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

interface RAGResult {
  augmentedResponse: string;
  retrievedContext: string[];
  confidence: number;
  farCitations: string[];
  recommendations: string[];
}

export const RAGProcessor = () => {
  const [query, setQuery] = useState('');
  const { toast } = useToast();

  const { data: ragResult, isLoading, refetch, isError } = useQuery<RAGResult>({
    queryKey: ['rag', query],
    queryFn: async () => {
      try {
        const vectorResults = await queryVectorStore(query);
        // This would be replaced with actual AI-enhanced response
        return {
          augmentedResponse: `Enhanced response for: ${query}`,
          retrievedContext: vectorResults.matches.map(m => m.metadata.text),
          confidence: vectorResults.matches[0]?.score || 0,
          farCitations: ['FAR 15.404-1', 'FAR 16.505', 'DFARS 215.371-2'],
          recommendations: [
            'Review market research documentation',
            'Validate price reasonableness approach',
            'Consider small business implications'
          ]
        };
      } catch (error) {
        toast({
          title: "Search Error",
          description: "Failed to process your research query. Please try again.",
          variant: "destructive"
        });
        throw error;
      }
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

  const getConfidenceColor = (score: number) => {
    if (score >= 0.8) return 'text-green-500';
    if (score >= 0.6) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Federal Acquisition Research
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter your acquisition research query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSearch}
              disabled={isLoading}
              className="min-w-[100px]"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              Search
            </Button>
          </div>

          {isLoading && (
            <div className="mt-6 space-y-4">
              <Skeleton className="h-[100px] w-full" />
              <Skeleton className="h-[80px] w-full" />
              <Skeleton className="h-[60px] w-full" />
            </div>
          )}

          {isError && (
            <div className="mt-6 p-4 bg-red-50 rounded-lg flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-5 h-5" />
              <p>Failed to process your research query. Please try again.</p>
            </div>
          )}

          {ragResult && (
            <div className="mt-6 space-y-4">
              <Card className="bg-violet-50 border-violet-200">
                <CardContent className="pt-6">
                  <h3 className="font-medium text-violet-900 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Analysis
                  </h3>
                  <p className="text-violet-800">{ragResult.augmentedResponse}</p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-blue-900 mb-2">FAR Citations</h3>
                    <ScrollArea className="h-[100px]">
                      <div className="space-y-2">
                        {ragResult.farCitations.map((citation, idx) => (
                          <Badge 
                            key={idx}
                            variant="secondary"
                            className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                          >
                            {citation}
                          </Badge>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card className="bg-emerald-50 border-emerald-200">
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-emerald-900 mb-2">Recommendations</h3>
                    <ScrollArea className="h-[100px]">
                      <ul className="space-y-2">
                        {ragResult.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-emerald-800 text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Confidence Score</span>
                <span className={`font-medium ${getConfidenceColor(ragResult.confidence)}`}>
                  {(ragResult.confidence * 100).toFixed(1)}%
                </span>
              </div>

              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="pt-6">
                  <h3 className="font-medium text-gray-900 mb-2">Retrieved Context</h3>
                  <ScrollArea className="h-[200px]">
                    <ul className="space-y-3">
                      {ragResult.retrievedContext.map((context, idx) => (
                        <li key={idx} className="text-gray-700 text-sm p-3 bg-white rounded-lg border border-gray-100">
                          {context}
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
