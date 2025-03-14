
import React from 'react';
import { SecuritySettings } from '@/components/settings/SecuritySettings';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';

const SecurityPage: React.FC = () => {
  return (
    <PageErrorBoundary>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Security Settings</h1>
        <SecuritySettings />
      </div>
    </PageErrorBoundary>
  );
};

export default SecurityPage;
