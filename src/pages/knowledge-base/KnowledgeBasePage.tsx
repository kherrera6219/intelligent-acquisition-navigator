
import React, { useState } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MsFluentCard } from '@/components/ui/universal/MsFluentCard';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, Database, Building, Cloud, Search, Filter, Tag, Plus } from 'lucide-react';
import { useKnowledgeBase } from '@/hooks/useKnowledgeBase';
import { KnowledgeBaseHeader } from '@/components/knowledge-base/KnowledgeBaseHeader';
import { KnowledgeSearch } from '@/components/knowledge-base/KnowledgeSearch';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const KnowledgeBasePage: React.FC = () => {
  const { entries, isLoading } = useKnowledgeBase();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Filter function for knowledge base items
  const handleFilterChange = (filters: { types: string[], tags: string[] }) => {
    setSelectedTypes(filters.types);
    setSelectedTags(filters.tags);
  };
  
  // Available tags for filtering
  const availableTags = ['federal', 'compliance', 'procurement', 'contracts', 'legal', 'texas'];
  
  // Document types
  const documentTypes = ['document', 'regulation', 'template', 'software', 'process', 'research'];
  
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
      action={
        <Button className="ms-button-primary flex items-center gap-2">
          <Plus size={16} />
          <span>Add Resource</span>
        </Button>
      }
    >
      <div className="ms-container">
        <KnowledgeBaseHeader 
          title="Enterprise Knowledge Base" 
          description="Centralized repository for all acquisition and compliance resources"
        />
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex gap-2 w-full">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                placeholder="Search knowledge base..."
                className="w-full px-4 py-2 pl-10 border rounded-md bg-background"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <KnowledgeSearch />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar filters */}
          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-3">Filter by Type</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {documentTypes.map(type => (
                  <Badge
                    key={type}
                    variant={selectedTypes.includes(type) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      const newTypes = selectedTypes.includes(type)
                        ? selectedTypes.filter(t => t !== type)
                        : [...selectedTypes, type];
                      handleFilterChange({ types: newTypes, tags: selectedTags });
                    }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Badge>
                ))}
              </div>
              
              <h3 className="text-sm font-medium mb-3">Filter by Tags</h3>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "secondary" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => {
                      const newTags = selectedTags.includes(tag)
                        ? selectedTags.filter(t => t !== tag)
                        : [...selectedTags, tag];
                      handleFilterChange({ types: selectedTypes, tags: newTags });
                    }}
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
            
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
                <Link to="/texas-acquisition" className="flex items-center p-2 hover:bg-secondary/10 rounded-md text-foreground/80 hover:text-foreground">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>Texas Regulations</span>
                </Link>
              </div>
            </MsFluentCard>
          </div>
          
          {/* Main content */}
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
                      <MsFluentCard className="p-6 text-center border border-border/30 bg-card/30 backdrop-blur-sm">
                        <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground mb-4">No documents available yet.</p>
                        <Button>
                          <Plus size={16} className="mr-2" />
                          Upload Document
                        </Button>
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
                      <MsFluentCard className="p-6 text-center border border-border/30 bg-card/30 backdrop-blur-sm">
                        <Cloud className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground mb-4">No software builds available yet.</p>
                        <Button>
                          <Plus size={16} className="mr-2" />
                          Add Software Build
                        </Button>
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
                      <MsFluentCard className="p-6 text-center border border-border/30 bg-card/30 backdrop-blur-sm">
                        <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground mb-4">No regulations available yet.</p>
                        <Button>
                          <Plus size={16} className="mr-2" />
                          Add Regulation
                        </Button>
                      </MsFluentCard>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="federal" className="space-y-6">
                <MsGradientText className="text-xl font-semibold mb-4">Federal Resources</MsGradientText>
                
                <Link to="/federal-knowledge-base">
                  <MsFluentCard className="p-6 text-center hover:bg-primary/5 transition-colors cursor-pointer border border-border/30 bg-card/30 backdrop-blur-sm">
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
