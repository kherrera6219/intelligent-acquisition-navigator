
import React from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { GradientText } from '@/components/ui/universal/GradientText';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  BarChart4, 
  Calendar,
  Clock,
  DollarSign
} from 'lucide-react';

const ContractManagementPage: React.FC = () => {
  const pageTitle = "Contract Management";

  return (
    <ProtectedPageLayout
      title={pageTitle}
      description="Manage and monitor your contracts throughout their lifecycle"
      action={
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Contract
        </Button>
      }
      fullWidth={true}
    >
      <GradientText className="text-3xl font-bold mb-4">{pageTitle}</GradientText>
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6 w-full justify-start overflow-x-auto">
          <TabsTrigger value="active">Active Contracts</TabsTrigger>
          <TabsTrigger value="expirations">Upcoming Expirations</TabsTrigger>
          <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
          <TabsTrigger value="modifications">Modifications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <Card className="p-4 bg-blue-950/30 border-blue-800/50">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-400">Active Contracts</h3>
                  <p className="text-3xl font-bold text-blue-300">12</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-amber-950/30 border-amber-800/50">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-amber-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-amber-400">Expiring Soon</h3>
                  <p className="text-3xl font-bold text-amber-300">3</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-green-950/30 border-green-800/50">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-green-400">Total Value</h3>
                  <p className="text-3xl font-bold text-green-300">$2.5M</p>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="mt-8 w-full">
            <h2 className="text-xl font-semibold mb-4">Active Contract List</h2>
            <div className="space-y-4 w-full">
              <Card className="p-4 w-full">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div className="w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-medium">IT Services Agreement #2023-ITS-042</h3>
                      <span className="text-xs text-gray-400 mt-1 sm:mt-0">Expires: Dec 31, 2024</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Comprehensive IT support services for headquarters office</p>
                    <div className="flex flex-wrap items-center mt-2 gap-x-4 gap-y-2">
                      <span className="text-xs text-gray-500 flex items-center">
                        <DollarSign className="h-3.5 w-3.5 mr-1" />
                        Value: $450,000
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        Period: 1 of 3 years
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 w-full">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                  <div className="w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-medium">Facility Maintenance #2022-FM-018</h3>
                      <span className="text-xs text-gray-400 mt-1 sm:mt-0">Expires: Jun 15, 2024</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Building maintenance services including HVAC, electrical and plumbing</p>
                    <div className="flex flex-wrap items-center mt-2 gap-x-4 gap-y-2">
                      <span className="text-xs text-gray-500 flex items-center">
                        <DollarSign className="h-3.5 w-3.5 mr-1" />
                        Value: $320,000
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        Period: 2 of 2 years
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 w-full">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div className="w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-medium">Professional Services #2023-PS-031</h3>
                      <span className="text-xs text-gray-400 mt-1 sm:mt-0">Expires: Oct 31, 2024</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Management consulting and program support services</p>
                    <div className="flex flex-wrap items-center mt-2 gap-x-4 gap-y-2">
                      <span className="text-xs text-gray-500 flex items-center">
                        <DollarSign className="h-3.5 w-3.5 mr-1" />
                        Value: $1,200,000
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        Period: 1 of 5 years
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="expirations" className="w-full">
          <Card className="p-6 w-full">
            <h2 className="text-xl font-semibold mb-4">Upcoming Contract Expirations</h2>
            <p className="text-gray-400 mb-6">Contracts expiring within the next 90 days</p>
            <div className="space-y-4 w-full">
              <Card className="p-4 border-amber-800/50 bg-amber-950/20">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                  <div className="w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-medium">Facility Maintenance #2022-FM-018</h3>
                      <span className="text-xs text-amber-400 mt-1 sm:mt-0">Expires in: 45 days</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Extension option available (1 year)</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 border-amber-800/50 bg-amber-950/20">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                  <div className="w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-medium">Security Services #2022-SS-024</h3>
                      <span className="text-xs text-amber-400 mt-1 sm:mt-0">Expires in: 60 days</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Extension option available (2 years)</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 border-amber-800/50 bg-amber-950/20">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                  <div className="w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-medium">Janitorial Services #2022-JS-019</h3>
                      <span className="text-xs text-amber-400 mt-1 sm:mt-0">Expires in: 85 days</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">No extension option available - new procurement required</p>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="deliverables" className="w-full">
          <Card className="p-6 w-full">
            <h2 className="text-xl font-semibold mb-4">Contract Deliverables</h2>
            <p className="text-gray-400 mb-6">Upcoming and overdue deliverables from active contracts</p>
            <div className="text-center py-10">
              <FileText className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-500">Deliverables tracking is in development</p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="modifications" className="w-full">
          <Card className="p-6 w-full">
            <h2 className="text-xl font-semibold mb-4">Contract Modifications</h2>
            <p className="text-gray-400 mb-6">Recent and pending modifications to active contracts</p>
            <div className="text-center py-10">
              <FileText className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-500">Modifications tracking is in development</p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="w-full">
          <Card className="p-6 w-full">
            <h2 className="text-xl font-semibold mb-4">Contract Analytics</h2>
            <p className="text-gray-400 mb-6">Performance metrics and trends for contract management</p>
            <div className="text-center py-10">
              <BarChart4 className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-500">Analytics features are in development</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </ProtectedPageLayout>
  );
};

export default ContractManagementPage;
