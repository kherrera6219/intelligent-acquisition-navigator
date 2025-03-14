
import React, { useState } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { FederalChatContainer } from '@/components/federal/FederalChatContainer';
import { FederalTabNavigation } from '@/components/federal/FederalTabNavigation';
import { FederalTabContent } from '@/components/federal/FederalTabContent';
import { FederalReportCardGrid } from '@/components/federal/FederalReportCardGrid';
import { useNetworkOperation } from '@/hooks/useNetworkOperation';
import { useToast } from '@/hooks/use-toast';

const FederalAcquisitionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('chat');
  const { toast } = useToast();
  
  const { executeOperation, isLoading, error } = useNetworkOperation({
    maxRetries: 3,
    showToasts: true,
    offlineMessage: 'You are offline. Some features may be limited.',
    errorMessage: 'Failed to load federal acquisition data.',
    successMessage: 'Federal acquisition data loaded successfully.'
  });

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const loadTabData = async (tabId: string) => {
    try {
      await executeOperation(async () => {
        // Simulate loading data for the tab
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true };
      });
    } catch (error) {
      console.error('Failed to load data for tab:', tabId, error);
      toast({
        title: "Error",
        description: `Failed to load data for ${tabId} tab`,
        variant: "destructive"
      });
    }
  };

  return (
    <ProtectedPageLayout
      title="Federal Acquisition"
      description="Access federal acquisition regulations and chat with our AI assistant"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Federal Acquisition', href: '/federal-acquisition' }
      ]}
    >
      <FederalTabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      
      <div className="mt-6">
        {activeTab === 'chat' && (
          <FederalChatContainer />
        )}
        
        {activeTab === 'reports' && (
          <FederalReportCardGrid />
        )}
        
        {activeTab !== 'chat' && activeTab !== 'reports' && (
          <FederalTabContent tabId={activeTab} isLoading={isLoading} error={error?.message} />
        )}
      </div>
    </ProtectedPageLayout>
  );
};

export default FederalAcquisitionPage;
