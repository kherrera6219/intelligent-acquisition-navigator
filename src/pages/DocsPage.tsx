
import React, { useState } from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { DocsSearch } from '@/components/docs/DocsSearch';
import { DocNavigation } from '@/components/docs/DocNavigation';
import { Badge } from '@/components/ui/badge';
import { DocContent } from '@/components/docs/DocContent';
import { docCategories, getDocsByCategory } from '@/components/docs/docsData';

const DocsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(docCategories[0]?.id || 'getting-started');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const filteredDocs = searchQuery 
    ? getDocsByCategory('all', searchQuery) 
    : getDocsByCategory(activeCategory);
  
  return (
    <ExternalPageLayout
      title="Documentation | ProcurityIQ"
      description="Learn how to use ProcurityIQ acquisition framework effectively"
    >
      <div className="bg-gradient-to-b from-background/80 to-background/30 pt-8 pb-6 border-b">
        <Container>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                  Documentation <MsGradientText>Center</MsGradientText>
                </h1>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                  Comprehensive guides and resources to help you master the procurement process
                </p>
              </div>
              
              <DocsSearch onSearch={handleSearch} />
            </div>
            
            <DocNavigation 
              categories={docCategories} 
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </Container>
      </div>
      
      <Container className="pt-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-8">
          <aside className="hidden md:block">
            <DocsSidebar 
              categories={docCategories} 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory}
            />
          </aside>
          
          <main>
            {searchQuery ? (
              <div className="mb-6">
                <Badge variant="outline" className="mb-2">Search Results</Badge>
                <h2 className="text-2xl font-bold">
                  Results for "{searchQuery}"
                </h2>
                <p className="text-muted-foreground mt-1">
                  Found {filteredDocs.length} {filteredDocs.length === 1 ? 'document' : 'documents'}
                </p>
              </div>
            ) : (
              <div className="mb-6">
                <Badge variant="outline" className="mb-2">
                  {docCategories.find(c => c.id === activeCategory)?.label || 'All Documentation'}
                </Badge>
                <h2 className="text-2xl font-bold">
                  {docCategories.find(c => c.id === activeCategory)?.title || 'Documentation'}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {docCategories.find(c => c.id === activeCategory)?.description || 'Browse our comprehensive documentation'}
                </p>
              </div>
            )}
            
            {filteredDocs.length === 0 ? (
              <div className="text-center py-12 px-4 border rounded-lg bg-card/50">
                <h3 className="text-xl font-semibold mb-2">No documents found</h3>
                <p className="text-muted-foreground mb-4">
                  We couldn't find any documents matching your search criteria
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory(docCategories[0]?.id || 'getting-started');
                  }}
                  className="text-primary hover:underline"
                >
                  View all documentation
                </button>
              </div>
            ) : (
              <DocContent documents={filteredDocs} />
            )}
          </main>
        </div>
      </Container>
    </ExternalPageLayout>
  );
};

export default DocsPage;
