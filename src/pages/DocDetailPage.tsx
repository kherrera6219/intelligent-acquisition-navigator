
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { docCategories } from '@/components/docs/docsData';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';
import { DocsSidebar } from '@/components/docs/DocsSidebar';

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
    return (
      <ExternalPageLayout
        title="Loading... | ProcurityIQ Documentation"
        description="Loading documentation..."
      >
        <Container className="pt-16 pb-16">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </Container>
      </ExternalPageLayout>
    );
  }
  
  if (!doc) {
    return (
      <ExternalPageLayout
        title="Not Found | ProcurityIQ Documentation"
        description="The requested document was not found"
      >
        <Container className="pt-16 pb-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Document Not Found</h1>
          <p className="text-muted-foreground mb-8">
            We couldn't find the document you're looking for.
          </p>
          <Link 
            to="/docs"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Return to Documentation
          </Link>
        </Container>
      </ExternalPageLayout>
    );
  }
  
  return (
    <ExternalPageLayout
      title={`${doc.title} | ProcurityIQ Documentation`}
      description={doc.description}
    >
      <div className="bg-gradient-to-b from-background/80 to-background/30 pt-8 pb-6 border-b">
        <Container>
          <div className="space-y-4">
            <Link to="/docs" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Documents
            </Link>
            
            <div>
              <Badge variant={doc.level === 'beginner' ? 'default' : doc.level === 'intermediate' ? 'secondary' : 'destructive'}>
                {doc.level}
              </Badge>
              
              <h1 className="text-3xl md:text-4xl font-bold mt-2">{doc.title}</h1>
              
              <p className="text-muted-foreground mt-2 max-w-3xl">
                {doc.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{doc.readTime} min read</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    Updated {formatDistanceToNow(new Date(doc.updatedAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          </div>
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
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                This is a placeholder for the full content of the "{doc.title}" document.
                In a real application, this would contain the complete documentation with
                formatted text, code examples, images, and more.
              </p>
              
              <h2>Example Section</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
                Phasellus euismod, nisl eget aliquam tincidunt, nisl nisl aliquam nisl,
                eget aliquam nisl nisl eget nisl.
              </p>
              
              <h3>Subsection Example</h3>
              <p>
                Phasellus euismod, nisl eget aliquam tincidunt, nisl nisl aliquam nisl,
                eget aliquam nisl nisl eget nisl.
              </p>
              
              <pre className="bg-muted/50 p-4 rounded-md overflow-x-auto">
                <code>
                  // Example code
                  const fetchData = async () => {
                    const response = await fetch('/api/data');
                    const data = await response.json();
                    return data;
                  };
                </code>
              </pre>
              
              <h2>Additional Resources</h2>
              <ul>
                <li>
                  <a href="#" className="text-primary hover:underline">
                    Related Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline">
                    Video Tutorials
                  </a>
                </li>
              </ul>
              
              <Separator className="my-6" />
              
              <div className="bg-accent/20 p-4 rounded-md">
                <h4 className="text-lg font-medium mb-2">Was this document helpful?</h4>
                <div className="flex gap-2">
                  <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-1 rounded-md transition-colors">
                    Yes
                  </button>
                  <button className="bg-muted hover:bg-muted/80 px-4 py-1 rounded-md transition-colors">
                    No
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Container>
    </ExternalPageLayout>
  );
};

export default DocDetailPage;
