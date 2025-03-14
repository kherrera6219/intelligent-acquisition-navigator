
import React from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { CodeReviewChecklist } from '@/components/ui/codebase-review/CodeReviewChecklist';

const CodeReviewPage: React.FC = () => {
  return (
    <ProtectedPageLayout
      title="Code Review & Gap Analysis"
      description="Track and manage frontend code improvements"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Code Review', href: '/code-review' }
      ]}
    >
      <CodeReviewChecklist />
    </ProtectedPageLayout>
  );
};

export default CodeReviewPage;
