
import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { ImprovementChecklist } from '@/components/ui/checklist/ImprovementChecklist';
import { GlobalErrorBoundary } from '@/components/error/GlobalErrorBoundary';
import { ImprovementProvider } from '@/contexts/ImprovementContext';
import { QueryProvider } from '@/providers/QueryProvider';
import { Helmet } from 'react-helmet';

const ImproveApp: React.FC = () => {
  return (
    <GlobalErrorBoundary>
      <Helmet>
        <title>Application Improvement | Procurity</title>
        <meta name="description" content="Track progress on application improvements and provide feedback" />
        <link rel="manifest" href="/app.webmanifest" />
      </Helmet>
      <QueryProvider>
        <ImprovementProvider>
          <div className="container mx-auto px-4 py-8">
            <PageHeader
              title="Application Improvement"
              description="Track progress on application improvements and provide feedback"
            />
            
            <div className="mt-8">
              <ImprovementChecklist />
            </div>
          </div>
        </ImprovementProvider>
      </QueryProvider>
    </GlobalErrorBoundary>
  );
};

export default ImproveApp;
