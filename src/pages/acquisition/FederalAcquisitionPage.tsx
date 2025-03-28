
import React, { useState, useEffect } from 'react';
import { AcquisitionLayout, AcquisitionTab } from '@/components/layout/AcquisitionLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  PlusCircle, 
  MessageSquare, 
  BookOpen
} from 'lucide-react';
import { FederalChatContainer } from '@/components/federal/FederalChatContainer';
import { FederalReportCardGrid } from '@/components/federal/FederalReportCardGrid';
import { ReportCardProps } from '@/components/federal/FederalReportCard';
import { useMsFluentApi } from '@/lib/msFluentApi';
import { useToast } from '@/hooks/use-toast';

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
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { request } = useMsFluentApi();

  // Load initial data when the component mounts
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load data:', error);
      toast({
        title: "Error",
        description: "Failed to load federal acquisition data",
        variant: "destructive"
      });
      setIsLoading(false);
    }
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

  // Define tabs for the acquisition layout
  const tabs: AcquisitionTab[] = [
    {
      id: 'chat',
      label: 'Federal Acquisition Chat',
      content: (
        <Card className="p-6">
          <FederalChatContainer />
        </Card>
      )
    },
    {
      id: 'reports',
      label: 'FAR Reports',
      content: (
        <Card className="p-6">
          <FederalReportCardGrid 
            reports={mockReports} 
            onCardClick={handleReportClick}
          />
        </Card>
      )
    },
    {
      id: 'regulations',
      label: 'Regulations Library',
      content: (
        <Card className="p-6">
          <div className="text-center py-10">
            <BookOpen className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Federal Acquisition Regulations Library</h2>
            <p className="text-muted-foreground">Regulation library is in development</p>
          </div>
        </Card>
      )
    }
  ];

  const metrics = [
    {
      title: 'FAR Reports',
      value: mockReports.length,
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      className: 'bg-blue-950/30 border-blue-800/50'
    },
    {
      title: 'Avg. Confidence',
      value: `${Math.round(mockReports.reduce((acc, r) => acc + r.confidenceScore, 0) / mockReports.length)}%`,
      icon: <MessageSquare className="h-8 w-8 text-green-500" />,
      className: 'bg-green-950/30 border-green-800/50'
    },
    {
      title: 'Pending Analysis',
      value: mockReports.filter(r => r.status === 'pending').length,
      icon: <FileText className="h-8 w-8 text-amber-500" />,
      className: 'bg-amber-950/30 border-amber-800/50'
    }
  ];

  return (
    <AcquisitionLayout
      title="Federal Acquisition"
      description="Access federal acquisition regulations and chat with our AI assistant"
      tabs={tabs}
      metrics={metrics}
      defaultTab="chat"
      action={
        <Button onClick={handleNewReport}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Report
        </Button>
      }
      isLoading={isLoading}
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Acquisition', href: '/acquisition' },
        { label: 'Federal Acquisition', href: '/acquisition/federal-acquisition' }
      ]}
    />
  );
};

export default FederalAcquisitionPage;
