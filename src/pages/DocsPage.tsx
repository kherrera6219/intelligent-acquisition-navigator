
import React, { useState } from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { DocContentDisplay } from '@/components/docs/DocContent';
import { docCategories } from '@/components/docs/docsData';
import { DocsSearch } from '@/components/docs/DocsSearch';
import { Link } from 'react-router-dom';

const DocsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Additional search logic can be added here
    console.log('Searching for:', query);
  };

  return (
    <ExternalPageLayout
      title="Documentation | ProcurityIQ"
      description="Browse through our documentation"
    >
      <Container className="pt-8 pb-16">
        <h1 className="text-4xl font-bold mb-8">Documentation</h1>
        
        <div className="mb-8">
          <DocsSearch onSearch={handleSearch} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-8">
          <aside>
            <DocsSidebar categories={docCategories} activeCategory="" onCategoryChange={() => {}} />
          </aside>
          
          <main>
            <p className="text-lg mb-6">
              Select a document from the sidebar to view its contents.
            </p>
            
            <div className="space-y-8">
              {docCategories.map((category) => (
                <div key={category.id} className="space-y-4">
                  <h2 className="text-2xl font-semibold">{category.title}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {category.items.map((doc) => (
                      <div 
                        key={doc.slug} 
                        className="p-4 rounded-lg border hover:border-primary hover:bg-card/50 transition-colors"
                      >
                        <h3 className="font-medium mb-1">
                          <Link to={`/docs/${doc.slug}`}>{doc.title}</Link>
                        </h3>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </Container>
    </ExternalPageLayout>
  );
};

export default DocsPage;
