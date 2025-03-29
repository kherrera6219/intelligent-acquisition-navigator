
import React from 'react';
import { Helmet } from 'react-helmet';
import { TypographyDemo } from '@/components/ui/universal/TypographyDemo';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';

const TypographyDemoPage: React.FC = () => {
  return (
    <ProtectedPageLayout
      title="Typography System"
      description="Microsoft Fluent UI Typography Standards and Guidelines"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'UI System', href: '/ui-system' },
        { label: 'Typography', href: '/typography' }
      ]}
    >
      <Helmet>
        <title>Typography System | ProcurityIQ</title>
        <meta name="description" content="Microsoft Fluent UI Typography Standards and Guidelines" />
      </Helmet>
      
      <TypographyDemo />
    </ProtectedPageLayout>
  );
};

export default TypographyDemoPage;
