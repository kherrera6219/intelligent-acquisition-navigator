
import React, { useState, useEffect } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { FederalChatContainer } from '@/components/federal/FederalChatContainer';
import { FederalTabNavigation } from '@/components/federal/FederalTabNavigation';
import { FederalTabContent } from '@/components/federal/FederalTabContent';
import { FederalReportCardGrid } from '@/components/federal/FederalReportCardGrid';
import { useNetworkOperation } from '@/hooks/useNetworkOperation';
import { useToast } from '@/hooks/use-toast';
import { ReportCardProps } from '@/components/federal/FederalReportCard';

const mockReports: ReportCardProps[] = [
  {
    title: "Federal Acquisition Regulation Analysis",
    description: "Analysis of recent FAR updates and their impact on procurement processes",
    date: "2023-05-15",
    status: "completed",
    confidenceScore: 95,
    score: 95,
    lastUpdated: "2023-05-15"
  },
  {
    title: "DFARS Compliance Review",
    description: "Evaluation of defense procurement compliance with current DFARS requirements",
    date: "2023-04-22",
    status: "review",
    confidenceScore: 87,
    score: 87,
    lastUpdated: "2023-04-22"
  },
  {
    title: "Small Business Set-Aside Analysis",
    description: "Review of small business set-aside opportunities under federal regulations",
    date: "2023-03-10",
    status: "pending",
    confidenceScore: 74,
    score: 74,
    lastUpdated: "2023-03-10"
  }
];

const FederalAcquisitionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'reports'>('chat');
  const { toast } = useToast();
  
  const { executeOperation, isLoading, error } = useNetworkOperation({
    maxRetries: 3,
    showToasts: true,
    offlineMessage: 'You are offline. Some features may be limited.',
    errorMessage: 'Failed to load federal acquisition data.',
    successMessage: 'Federal acquisition data loaded successfully.'
  });

  // Load initial data when the component mounts
  useEffect(() => {
    loadTabData(activeTab);
  }, []);

  const handleTabChange = (tabId: 'chat' | 'reports') => {
    setActiveTab(tabId);
    loadTabData(tabId);
  };

  const handleNewReport = () => {
    toast({
      title: "Create Report",
      description: "Creating a new report...",
      variant: "default"
    });
  };

  const handleReportClick = (index: number) => {
    toast({
      title: "Report Selected",
      description: `Viewing details for "${mockReports[index].title}"`,
      variant: "default"
    });
  };

  const loadTabData = async (tabId: 'chat' | 'reports') => {
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
      <FederalTabNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        onNewReport={handleNewReport} 
      />
      
      <div className="mt-6">
        {activeTab === 'chat' && (
          <FederalChatContainer />
        )}
        
        {activeTab === 'reports' && (
          <FederalReportCardGrid 
            reports={mockReports} 
            onCardClick={handleReportClick}
          />
        )}
      </div>
    </ProtectedPageLayout>
  );
};

export default FederalAcquisitionPage;
