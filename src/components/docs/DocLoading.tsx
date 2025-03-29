
import React from 'react';
import { Container } from '@/components/ui/universal/Container';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';

export const DocLoading: React.FC = () => {
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
};
