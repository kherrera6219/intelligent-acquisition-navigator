
import React, { useState } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MsFluentCard } from '@/components/ui/universal/MsFluentCard';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, Database, Building, Cloud } from 'lucide-react';
import { useKnowledgeBase } from '@/hooks/useKnowledgeBase';

// Import the necessary components with proper props
import { KnowledgeSearch } from '@/components/knowledge-base/KnowledgeSearch';

const KnowledgeBasePage: React.FC = () => {
  const { entries, isLoading } = useKnowledgeBase();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Filter function for knowledge base items
  const handleFilterChange = (filters: { types: any[], tags: string[] }) => {
    setSelectedTypes(filters.types);
    setSelectedTags(filters.tags);
  };
  
  // Available tags for filtering
  const availableTags = ['federal', 'compliance', 'procurement', 'contracts', 'legal'];
  
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
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">Enterprise Knowledge Base</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial sm:w-64">
              <input
                placeholder="Search knowledge base..."
                className="w-full px-4 py-2 pl-8 border rounded"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <KnowledgeSearch />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          <div className="space-y-6">
            <div className="mb-6 space-y-4">
              <h3 className="text-sm font-medium mb-2">Filter by Type</h3>
              <div className="flex flex-wrap gap-2">
                {['document', 'regulation', 'template', 'software', 'process', 'research'].map(type => (
                  <button
                    key={type}
                    className={`px-3 py-1 text-sm rounded ${selectedTypes.includes(type) ? 'bg-primary text-white' : 'bg-secondary/10'}`}
                    onClick={() => {
                      const newTypes = selectedTypes.includes(type)
                        ? selectedTypes.filter(t => t !== type)
                        : [...selectedTypes, type];
                      handleFilterChange({ types: newTypes, tags: selectedTags });
                    }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
              
              <h3 className="text-sm font-medium mb-2 mt-4">Filter by Tags</h3>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <span
                    key={tag}
                    className={`px-2 py-1 text-xs rounded cursor-pointer ${selectedTags.includes(tag) ? 'bg-primary/80 text-white' : 'bg-secondary/20'}`}
                    onClick={() => {
                      const newTags = selectedTags.includes(tag)
                        ? selectedTags.filter(t => t !== tag)
                        : [...selectedTags, tag];
                      handleFilterChange({ types: selectedTypes, tags: newTags });
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
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
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {isLoading ? (
                    Array(6).fill(0).map((_, i) => (
                      <div key={i} className="h-24 bg-gray-800/30 rounded-lg animate-pulse"></div>
                    ))
                  ) : (
                    <div className="col-span-full">
                      <MsFluentCard className="p-6 text-center">
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
                      <MsFluentCard className="p-6 text-center">
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
                      <MsFluentCard className="p-6 text-center">
                        <p className="text-muted-foreground">No regulations available.</p>
                      </MsFluentCard>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="federal" className="space-y-6">
                <MsGradientText className="text-xl font-semibold mb-4">Federal Resources</MsGradientText>
                
                <Link to="/federal-knowledge-base">
                  <MsFluentCard className="p-6 text-center hover:bg-primary/5 transition-colors cursor-pointer">
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
