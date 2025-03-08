
import React, { useState, useEffect } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { Card } from '@/components/ui/universal/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentList } from '@/components/documents/DocumentList';
import { DocumentSearchBar } from '@/components/documents/DocumentSearchBar';
import { FileText, Upload, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DocumentControlPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Simulate loading data
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load documents'));
        setIsLoading(false);
      }
    };
    
    loadDocuments();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <ProtectedPageLayout
      title="Document Control"
      description="Manage and organize your acquisition documents."
      isLoading={isLoading}
      error={error}
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Acquisition', href: '/acquisition' },
        { label: 'Document Control', href: '/acquisition/document-control' }
      ]}
      action={
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <DocumentSearchBar onSearch={handleSearch} />
          
          <Button variant="outline" size="sm" className="sm:self-end">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        
        <Card>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full border-b rounded-none">
              <TabsTrigger value="all" className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                All Documents
              </TabsTrigger>
              <TabsTrigger value="drafts" className="flex-1">
                Drafts
              </TabsTrigger>
              <TabsTrigger value="published" className="flex-1">
                Published
              </TabsTrigger>
              <TabsTrigger value="archived" className="flex-1">
                Archived
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="p-6">
              <DocumentList category="all" searchTerm={searchTerm} />
            </TabsContent>
            
            <TabsContent value="drafts" className="p-6">
              <DocumentList category="drafts" searchTerm={searchTerm} />
            </TabsContent>
            
            <TabsContent value="published" className="p-6">
              <DocumentList category="published" searchTerm={searchTerm} />
            </TabsContent>
            
            <TabsContent value="archived" className="p-6">
              <DocumentList category="archived" searchTerm={searchTerm} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </ProtectedPageLayout>
  );
}
