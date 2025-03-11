
import React, { useState } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { GradientText } from '@/components/ui/universal/GradientText';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, FileText, BarChart, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  status: 'compliant' | 'non-compliant' | 'pending';
  regulation: string;
  lastChecked: string;
}

const CompliancePage: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample compliance data
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([
    {
      id: '1',
      title: 'FAR 15.304 - Evaluation factors and significant subfactors',
      description: 'All evaluation factors and subfactors are properly documented and aligned with acquisition objectives',
      status: 'compliant',
      regulation: 'FAR Part 15',
      lastChecked: '2023-11-15'
    },
    {
      id: '2',
      title: 'DFARS 204.73 - Safeguarding controlled unclassified information',
      description: 'System security requirements for CUI protection need further documentation',
      status: 'non-compliant',
      regulation: 'DFARS 204.73',
      lastChecked: '2023-11-12'
    },
    {
      id: '3',
      title: 'FAR 9.104 - Contractor responsibility standards',
      description: 'Pre-award responsibility determination procedures under review',
      status: 'pending',
      regulation: 'FAR Part 9',
      lastChecked: '2023-11-10'
    },
    {
      id: '4',
      title: 'FAR 19.5 - Set-asides for small business',
      description: 'Small business set-aside documentation complete and verified',
      status: 'compliant',
      regulation: 'FAR Part 19',
      lastChecked: '2023-11-14'
    },
    {
      id: '5',
      title: 'FAR 16.104 - Factors in selecting contract types',
      description: 'Contract type selection justification pending final review',
      status: 'pending',
      regulation: 'FAR Part 16',
      lastChecked: '2023-11-08'
    }
  ]);

  const runComplianceCheck = () => {
    setIsLoading(true);
    toast({
      title: "Compliance check initiated",
      description: "Running comprehensive compliance verification...",
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Compliance check completed",
        description: "All regulations checked. Found 3 compliant, 1 non-compliant, and 1 pending items.",
      });
    }, 2000);
  };

  const complianceStatistics = {
    total: complianceItems.length,
    compliant: complianceItems.filter(item => item.status === 'compliant').length,
    nonCompliant: complianceItems.filter(item => item.status === 'non-compliant').length,
    pending: complianceItems.filter(item => item.status === 'pending').length,
  };

  const pageTitle = "Compliance Management";

  return (
    <ProtectedPageLayout
      title={pageTitle}
      description="Monitor and ensure regulatory compliance for your acquisition activities"
      isLoading={isLoading}
      action={
        <Button onClick={runComplianceCheck} disabled={isLoading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Run Compliance Check
        </Button>
      }
      fullWidth={true}
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Compliance', href: '/compliance' }
      ]}
    >
      <GradientText className="text-3xl font-bold mb-4">{pageTitle}</GradientText>
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <Card className="p-4 bg-green-950/30 border-green-800/50">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-green-400">Compliant</h3>
                  <p className="text-3xl font-bold text-green-300">{complianceStatistics.compliant}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-red-950/30 border-red-800/50">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-red-400">Non-Compliant</h3>
                  <p className="text-3xl font-bold text-red-300">{complianceStatistics.nonCompliant}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-amber-950/30 border-amber-800/50">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-amber-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-amber-400">Pending Review</h3>
                  <p className="text-3xl font-bold text-amber-300">{complianceStatistics.pending}</p>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="mt-8 w-full">
            <h2 className="text-xl font-semibold mb-4">Recent Compliance Items</h2>
            <div className="space-y-4 w-full">
              {complianceItems.map((item) => (
                <Card key={item.id} className="p-4 w-full">
                  <div className="flex items-start">
                    {item.status === 'compliant' && <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />}
                    {item.status === 'non-compliant' && <AlertTriangle className="h-5 w-5 text-red-500 mt-1 mr-3 flex-shrink-0" />}
                    {item.status === 'pending' && <FileText className="h-5 w-5 text-amber-500 mt-1 mr-3 flex-shrink-0" />}
                    <div className="w-full">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <span className="bg-gray-800 px-2 py-1 rounded mr-2">{item.regulation}</span>
                        <span>Last checked: {item.lastChecked}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="requirements" className="w-full">
          <Card className="p-6 w-full">
            <h2 className="text-xl font-semibold mb-4">Compliance Requirements</h2>
            <p className="text-gray-400 mb-6">Detailed regulatory requirements and standards will be displayed here.</p>
            <div className="text-center py-6">
              <BarChart className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-500">Requirements analysis is in development</p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="w-full">
          <Card className="p-6 w-full">
            <h2 className="text-xl font-semibold mb-4">Compliance Reports</h2>
            <p className="text-gray-400 mb-6">Comprehensive compliance reports and documentation will be available here.</p>
            <div className="text-center py-6">
              <BarChart className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-500">Reporting features are in development</p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="w-full">
          <Card className="p-6 w-full">
            <h2 className="text-xl font-semibold mb-4">Compliance History</h2>
            <p className="text-gray-400 mb-6">Historical compliance records and audit trails will be shown here.</p>
            <div className="text-center py-6">
              <BarChart className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-500">History tracking is in development</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </ProtectedPageLayout>
  );
};

export default CompliancePage;
