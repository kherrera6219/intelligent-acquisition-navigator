
import React from 'react';
import { SecuritySettings } from '@/components/settings/SecuritySettings';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { ExternalFooter } from '@/components/layout/ExternalFooter';
import UniversalInternalHeader from '@/components/layout/UniversalInternalHeader';

const SecurityPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <UniversalInternalHeader />
      
      <PageErrorBoundary>
        <main className="flex-grow">
          <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-6">Security Settings</h1>
            <SecuritySettings />
          </div>
        </main>
      </PageErrorBoundary>
      
      <ExternalFooter />
    </div>
  );
};

export default SecurityPage;
