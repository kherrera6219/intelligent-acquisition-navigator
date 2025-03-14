
import React, { useState, useEffect } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { Card } from '@/components/ui/universal/Card';
import { DocumentList } from '@/components/documents/DocumentList';
import { DocumentSearchBar } from '@/components/documents/DocumentSearchBar';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import UniversalInternalHeader from '@/components/layout/UniversalInternalHeader';
import { InternalFooter } from '@/components/layout/InternalFooter';

const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchDocuments = async () => {
      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockDocuments = Array.from({ length: 10 }, (_, i) => ({
          id: `doc-${i + 1}`,
          title: `Document ${i + 1}`,
          type: i % 3 === 0 ? 'PDF' : i % 3 === 1 ? 'DOCX' : 'XLSX',
          size: Math.floor(Math.random() * 10000) + 100,
          uploadedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(),
          status: i % 4 === 0 ? 'DRAFT' : 'PUBLISHED',
          createdBy: `user-${i % 3 + 1}`,
        }));
        
        setDocuments(mockDocuments);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching documents:', error);
        setIsLoading(false);
      }
    };
    
    fetchDocuments();
  }, []);

  return (
    <>
      <UniversalInternalHeader />
      <ProtectedPageLayout
        title="Documents"
        description="Manage and organize your documents"
        isLoading={isLoading}
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Documents', href: '/documents' }
        ]}
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        }
      >
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <DocumentSearchBar onSearch={() => {}} />
            
            <Button variant="outline" size="sm" className="sm:self-end">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          
          <Card className="p-6">
            <DocumentList documents={documents} />
          </Card>
        </div>
      </ProtectedPageLayout>
      <InternalFooter />
    </>
  );
};

export default DocumentsPage;
