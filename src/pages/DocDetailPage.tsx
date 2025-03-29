
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { docCategories } from '@/components/docs/docsData';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { DocHeader } from '@/components/docs/DocHeader';
import { DocContentDisplay } from '@/components/docs/DocContent';
import { DocLoading } from '@/components/docs/DocLoading';
import { DocNotFound } from '@/components/docs/DocNotFound';

const DocDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  // Find the document by slug
  const allDocs = docCategories.flatMap(category => category.items);
  const doc = allDocs.find(d => d.slug === slug);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [slug]);
  
  if (isLoading) {
    return <DocLoading />;
  }
  
  if (!doc) {
    return <DocNotFound />;
  }
  
  return (
    <ExternalPageLayout
      title={`${doc.title} | ProcurityIQ Documentation`}
      description={doc.description}
    >
      <div className="bg-gradient-to-b from-background/80 to-background/30 pt-8 pb-6 border-b">
        <Container>
          <DocHeader doc={doc} />
        </Container>
      </div>
      
      <Container className="pt-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-8">
          <aside className="hidden md:block">
            <DocsSidebar 
              categories={docCategories} 
              activeCategory={doc.category} 
              onCategoryChange={() => {}}
            />
          </aside>
          
          <main>
            <DocContentDisplay doc={doc} />
          </main>
        </div>
      </Container>
    </ExternalPageLayout>
  );
};

export default DocDetailPage;
