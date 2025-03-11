
import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { ImprovementChecklist } from '@/components/ui/checklist/ImprovementChecklist';
import { GlobalErrorBoundary } from '@/components/error/GlobalErrorBoundary';

const ImproveApp: React.FC = () => {
  return (
    <GlobalErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Application Improvement"
          description="Track progress on application improvements and provide feedback"
        />
        
        <div className="mt-8">
          <ImprovementChecklist />
        </div>
      </div>
    </GlobalErrorBoundary>
  );
};

export default ImproveApp;
