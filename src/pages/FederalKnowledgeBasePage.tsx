
import React from 'react';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { GradientText } from '@/components/ui/universal/GradientText';
import { Card } from '@/components/ui/universal/Card';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';
import { NetworkErrorHandler } from '@/components/ui/universal/NetworkErrorHandler';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FederalReportCardGrid } from '@/components/federal/FederalReportCardGrid';
import { FederalReportCard } from '@/components/federal/FederalReportCard';
import { Link } from 'react-router-dom';

const FederalKnowledgeBasePage: React.FC = () => {
  const { isOnline } = useNetworkMonitor();
  
  const dummyReports = [
    {
      title: "Federal Acquisition Regulation Overview",
      score: 92,
      status: 'completed' as const,
      confidenceScore: 90,
      lastUpdated: "2024-05-15"
    },
    {
      title: "Defense Federal Acquisition Regulation Supplement",
      score: 85,
      status: 'completed' as const,
      confidenceScore: 88,
      lastUpdated: "2024-05-12"
    },
    {
      title: "Federal Procurement Policy",
      score: 78,
      status: 'review' as const,
      confidenceScore: 75,
      lastUpdated: "2024-05-10"
    },
    {
      title: "Small Business Requirements",
      score: 95,
      status: 'approved' as const,
      confidenceScore: 92,
      lastUpdated: "2024-05-09"
    }
  ];

  return (
    <main className="flex-grow">
      <Container>
        <NetworkErrorHandler
          errorMessage={!isOnline ? "You are currently offline. Some content may be limited." : undefined}
        >
          <div className="space-y-8 py-6 bg-noise"
            style={{
              backgroundImage: `
                linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.15) 100%),
                radial-gradient(at 50% 0%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.2) 75%)
              `,
              backgroundAttachment: 'fixed',
              backgroundColor: 'var(--background)'
            }}
          >
            <PageHeader
              title={<GradientText>Federal Acquisition Knowledge Base</GradientText>}
              description="Access comprehensive information on federal acquisition regulations and compliance"
            />
            
            <Tabs defaultValue="regulations" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="regulations">Regulations</TabsTrigger>
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>
              
              <TabsContent value="regulations">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dummyReports.map((report, index) => (
                    <FederalReportCard 
                      key={index}
                      title={report.title}
                      score={report.score}
                      status={report.status}
                      confidenceScore={report.confidenceScore}
                      lastUpdated={report.lastUpdated}
                      onClick={() => console.log(`Clicked on ${report.title}`)}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="guides">
                <Card variant="metal" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Acquisition Guides</h2>
                  <p className="text-gray-400 mb-4">
                    Access comprehensive guides on federal acquisition processes, best practices, and compliance requirements.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                    <li>Step-by-step guide to federal procurement</li>
                    <li>Small business contracting requirements</li>
                    <li>Contract negotiation best practices</li>
                    <li>Contractor performance evaluation</li>
                  </ul>
                </Card>
              </TabsContent>
              
              <TabsContent value="templates">
                <Card variant="metal" className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Document Templates</h2>
                  <p className="text-gray-400 mb-4">
                    Download standardized templates for various acquisition documents.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                    <li>Request for Proposal (RFP) templates</li>
                    <li>Statement of Work (SOW) templates</li>
                    <li>Contract templates</li>
                    <li>Performance Work Statement (PWS) templates</li>
                  </ul>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-center mt-8">
              <Link to="/federal-acquisition">
                <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded">
                  Return to Federal Acquisition
                </button>
              </Link>
            </div>
          </div>
        </NetworkErrorHandler>
      </Container>
    </main>
  );
};

export default FederalKnowledgeBasePage;
