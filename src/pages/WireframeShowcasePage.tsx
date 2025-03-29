
import React from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { WireframeShowcase } from '@/components/wireframe/WireframeShowcase';
import { Container } from '@/components/ui/universal/Container';
import { Helmet } from 'react-helmet';

export default function WireframeShowcasePage() {
  return (
    <ExternalPageLayout
      showHeader={true}
      showFooter={true}
    >
      <Helmet>
        <title>Wireframe Components | ProcurityIQ</title>
        <meta name="description" content="Explore wireframe layout components for different page types in the Fluent UI design system." />
      </Helmet>
      
      <Container className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WireframeShowcase />
      </Container>
    </ExternalPageLayout>
  );
}
