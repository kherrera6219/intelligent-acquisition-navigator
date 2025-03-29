
import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/universal/Container';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';

export const DocNotFound: React.FC = () => {
  return (
    <ExternalPageLayout
      title="Not Found | ProcurityIQ Documentation"
      description="The requested document was not found"
    >
      <Container className="pt-16 pb-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-400">Document Not Found</h1>
        <p className="text-amber-300 mb-8">
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
};
