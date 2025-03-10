
import React, { useState, useEffect } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { FederalChatContainer, FederalChatMessage } from '@/components/federal/FederalChatContainer';
import { FederalReportCardGrid } from '@/components/federal/FederalReportCardGrid';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import { ReportCardProps } from '@/components/federal/FederalReportCard';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

const FederalAcquisitionPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'reports' | 'chat'>('reports');
  const [chatMessages, setChatMessages] = useState<FederalChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  
  // Example report data
  const [reports, setReports] = useState<ReportCardProps[]>([
    {
      title: "FAR Compliance Assessment Report",
      score: 92,
      status: 'approved',
      confidenceScore: 89,
      lastUpdated: "May 15, 2024"
    },
    {
      title: "Small Business Subcontracting Plan Review",
      score: 78,
      status: 'review',
      confidenceScore: 75,
      lastUpdated: "May 10, 2024"
    },
    {
      title: "Contract Clauses Verification",
      score: 85,
      status: 'completed',
      confidenceScore: 82,
      lastUpdated: "May 8, 2024"
    },
    {
      title: "Source Selection Documentation Audit",
      score: 63,
      status: 'pending',
      confidenceScore: 68,
      lastUpdated: "May 5, 2024"
    },
    {
      title: "Cost/Price Analysis Review",
      score: 90,
      status: 'approved',
      confidenceScore: 91,
      lastUpdated: "May 1, 2024"
    }
  ]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleReportCardClick = (index: number) => {
    toast({
      title: "Report details",
      description: `Viewing details for: ${reports[index].title}`,
    });
    // In a real app, navigate to report details or open a modal
  };

  const handleNewReportClick = () => {
    toast({
      title: "New Report",
      description: "Creating a new Federal Acquisition report...",
    });
    // In a real app, navigate to report creation page or open a modal
  };

  const handleSendMessage = (message: string) => {
    // Add user message
    const userMessage: FederalChatMessage = {
      id: uuidv4(),
      content: message,
      role: 'user',
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setIsSending(true);
    setTimeout(() => {
      const aiMessage: FederalChatMessage = {
        id: uuidv4(),
        content: `This is a simulated response to your query: "${message}". In a real application, this would come from an AI service.`,
        role: 'assistant',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiMessage]);
      setIsSending(false);
    }, 1500);
  };

  const handleClearChat = () => {
    setChatMessages([]);
    toast({
      title: "Chat cleared",
      description: "Conversation history has been cleared.",
    });
  };

  return (
    <ProtectedPageLayout
      title="Federal Acquisition Management"
      description="Manage and monitor federal acquisition compliance, documentation, and procedures."
      isLoading={isLoading}
      error={null}
      withCard={false}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-4">
            <Button
              variant={activeTab === 'reports' ? 'default' : 'outline'}
              onClick={() => setActiveTab('reports')}
            >
              Reports
            </Button>
            <Button
              variant={activeTab === 'chat' ? 'default' : 'outline'}
              onClick={() => setActiveTab('chat')}
            >
              AI Assistant
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" onClick={handleNewReportClick}>
              <Plus className="h-4 w-4 mr-2" />
              New Report
            </Button>
          </div>
        </div>
        
        {activeTab === 'reports' ? (
          <FederalReportCardGrid
            reports={reports}
            onCardClick={handleReportCardClick}
          />
        ) : (
          <div className="bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg p-4">
            <FederalChatContainer 
              messages={chatMessages}
              isLoading={isSending}
              input={messageInput}
              onInputChange={setMessageInput}
              onSendMessage={handleSendMessage}
              onClearChat={handleClearChat}
              onFileUpload={(file) => {
                toast({
                  title: "File uploaded",
                  description: `File "${file.name}" has been uploaded. This is a placeholder for actual file processing.`,
                });
              }}
            />
          </div>
        )}
      </div>
    </ProtectedPageLayout>
  );
};

export default FederalAcquisitionPage;
