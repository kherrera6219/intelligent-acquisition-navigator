
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, Clock, Calendar, Star } from "lucide-react";
import { LoadingState } from "@/components/ui/universal/LoadingState";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/universal/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';

interface SearchResult {
  id: string;
  document_name: string;
  file_url: string;
  created_at: string;
  metadata: any;
  relevance: number;
}

interface KnowledgeSearchProps {
  className?: string;
}

export const KnowledgeSearch: React.FC<KnowledgeSearchProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [assistantResponse, setAssistantResponse] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('documents');
  const { toast } = useToast();
  const { isOnline } = useNetworkMonitor();
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast({
        title: "Empty search",
        description: "Please enter a search query",
        variant: "destructive"
      });
      return;
    }
    
    if (!isOnline) {
      toast({
        title: "Offline mode",
        description: "Search is not available while offline. Please reconnect to the internet.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSearching(true);
      
      const { data, error } = await supabase.functions.invoke('search-knowledge', {
        body: {
          query: searchQuery,
          filters: {} // Add filters if needed
        }
      });
      
      if (error) {
        throw new Error(`Search failed: ${error.message}`);
      }
      
      setResults(data.results || []);
      setAssistantResponse(data.assistantResponse || []);
      
      if (data.results.length === 0) {
        toast({
          title: "No results found",
          description: "Try a different search query or upload more documents",
          variant: "default"
        });
      }
      
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: error.message || "There was an error searching the knowledge base",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <Card className={`p-4 ${className}`}>
      <h3 className="text-lg font-medium mb-4">Search Documents</h3>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search the knowledge base..."
            className="pr-12"
            disabled={isSearching || !isOnline}
          />
          <Button
            type="submit"
            size="sm"
            variant="default"
            className="absolute right-1 top-1 h-8"
            disabled={isSearching || !isOnline}
          >
            {isSearching ? (
              <LoadingState variant="inline" size="sm" message="" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>
        {!isOnline && (
          <p className="text-xs text-destructive mt-2">
            Search is not available while offline. Please reconnect to the internet.
          </p>
        )}
      </form>
      
      {(results.length > 0 || assistantResponse.length > 0) && (
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="documents">Documents ({results.length})</TabsTrigger>
            <TabsTrigger value="answer">AI Answer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="documents">
            <div className="space-y-3">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="p-3 border border-gray-800 rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => window.open(result.file_url, '_blank')}
                >
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-blue-400 mt-0.5 mr-2" />
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{result.document_name}</h4>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span className="mr-3">{formatDate(result.created_at)}</span>
                        <Star className="h-3 w-3 mr-1" />
                        <span className="mr-3">{result.relevance.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="answer">
            <div className="bg-gray-900/50 p-4 rounded-lg">
              {assistantResponse.length > 0 ? (
                <div className="prose prose-invert text-gray-300 max-w-none">
                  {assistantResponse.map((response, index) => (
                    <p key={index}>{response}</p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center">No AI answer available for this query.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}
      
      {isSearching && (
        <div className="mt-6">
          <LoadingState message="Searching documents..." variant="skeleton" skeletonCount={3} />
        </div>
      )}
    </Card>
  );
};
