
import React from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KnowledgeBaseFilters } from '@/components/knowledge-base/KnowledgeBaseFilters';
import { KnowledgeBaseHeader } from '@/components/knowledge-base/KnowledgeBaseHeader';
import { KnowledgeSearch } from '@/components/knowledge-base/KnowledgeSearch';
import { SoftwareBuildCard } from '@/components/knowledge-base/SoftwareBuildCard';
import { DocumentUploader } from '@/components/knowledge-base/DocumentUploader';
import { useKnowledgeBase } from '@/hooks/useKnowledgeBase';
import { MsFluentCard } from '@/components/ui/universal/MsFluentCard';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, Database, Building, Cloud } from 'lucide-react';

const KnowledgeBasePage: React.FC = () => {
  const { data: knowledgeData, isLoading, error } = useKnowledgeBase();
  
  const tabs = [
    { id: 'documents', label: 'Documents', icon: <FileText className="h-4 w-4 mr-2" /> },
    { id: 'software', label: 'Software Builds', icon: <Cloud className="h-4 w-4 mr-2" /> },
    { id: 'regulations', label: 'Regulations', icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { id: 'federal', label: 'Federal Resources', icon: <Building className="h-4 w-4 mr-2" /> },
  ];

  return (
    <ProtectedPageLayout
      title="Knowledge Base"
      description="Access and manage enterprise acquisition resources"
      fullWidth
    >
      <div className="ms-container">
        <KnowledgeBaseHeader 
          title="Enterprise Knowledge Base"
          description="Access documents, regulations, software builds, and federal acquisition resources"
        />
        
        <div className="mb-6">
          <KnowledgeSearch />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          <div className="space-y-6">
            <KnowledgeBaseFilters />
            
            <MsFluentCard className="p-4">
              <h3 className="text-lg font-medium mb-3">Related Resources</h3>
              <div className="space-y-2">
                <Link to="/federal-knowledge-base" className="flex items-center p-2 hover:bg-secondary/10 rounded-md text-foreground/80 hover:text-foreground">
                  <Building className="h-4 w-4 mr-2" />
                  <span>Federal Guidelines</span>
                </Link>
                <Link to="/market-research" className="flex items-center p-2 hover:bg-secondary/10 rounded-md text-foreground/80 hover:text-foreground">
                  <Database className="h-4 w-4 mr-2" />
                  <span>Market Research</span>
                </Link>
                <Link to="/document-control" className="flex items-center p-2 hover:bg-secondary/10 rounded-md text-foreground/80 hover:text-foreground">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Document Control</span>
                </Link>
              </div>
            </MsFluentCard>
          </div>
          
          <div>
            <Tabs defaultValue="documents" className="w-full">
              <TabsList className="mb-6">
                {tabs.map(tab => (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center">
                    {tab.icon}
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="documents" className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <MsGradientText className="text-xl font-semibold">Enterprise Documents</MsGradientText>
                  <DocumentUploader />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {isLoading ? (
                    Array(6).fill(0).map((_, i) => (
                      <div key={i} className="h-24 bg-gray-800/30 rounded-lg animate-pulse"></div>
                    ))
                  ) : (
                    <div className="col-span-full">
                      <MsFluentCard padding="lg" className="text-center">
                        <p className="text-muted-foreground">No documents available.</p>
                      </MsFluentCard>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="software" className="space-y-6">
                <MsGradientText className="text-xl font-semibold mb-4">Software Builds</MsGradientText>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {isLoading ? (
                    Array(4).fill(0).map((_, i) => (
                      <div key={i} className="h-32 bg-gray-800/30 rounded-lg animate-pulse"></div>
                    ))
                  ) : (
                    <div className="col-span-full">
                      <MsFluentCard padding="lg" className="text-center">
                        <p className="text-muted-foreground">No software builds available.</p>
                      </MsFluentCard>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="regulations" className="space-y-6">
                <MsGradientText className="text-xl font-semibold mb-4">Acquisition Regulations</MsGradientText>
                
                <div className="grid grid-cols-1 gap-4">
                  {isLoading ? (
                    Array(4).fill(0).map((_, i) => (
                      <div key={i} className="h-16 bg-gray-800/30 rounded-lg animate-pulse"></div>
                    ))
                  ) : (
                    <div className="col-span-full">
                      <MsFluentCard padding="lg" className="text-center">
                        <p className="text-muted-foreground">No regulations available.</p>
                      </MsFluentCard>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="federal" className="space-y-6">
                <MsGradientText className="text-xl font-semibold mb-4">Federal Resources</MsGradientText>
                
                <Link to="/federal-knowledge-base">
                  <MsFluentCard 
                    padding="lg" 
                    className="text-center hover:bg-primary/5 transition-colors cursor-pointer"
                  >
                    <Building className="h-12 w-12 mx-auto mb-4 text-primary/70" />
                    <h3 className="text-lg font-medium mb-2">Federal Knowledge Base</h3>
                    <p className="text-muted-foreground">
                      Access federal acquisition resources, guidelines, and regulations
                    </p>
                  </MsFluentCard>
                </Link>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ProtectedPageLayout>
  );
};

export default KnowledgeBasePage;
