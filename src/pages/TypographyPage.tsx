
import React from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { TypographyDemo } from '@/components/ui/universal/TypographyDemo';

const TypographyPage: React.FC = () => {
  return (
    <ProtectedPageLayout
      title="Microsoft Fluent Typography"
      description="Typography system based on Microsoft Fluent UI design principles"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Typography', href: '/typography' }
      ]}
    >
      <TypographyDemo />
    </ProtectedPageLayout>
  );
};

export default TypographyPage;
