
import React from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { GradientText } from '@/components/ui/universal/GradientText';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  FileText, 
  CheckSquare, 
  BarChart4, 
  Users, 
  CalendarDays, 
  ClipboardList 
} from 'lucide-react';

const SourceSelectionPage: React.FC = () => {
  const pageTitle = "Source Selection";

  return (
    <ProtectedPageLayout
      title={pageTitle}
      description="Evaluate and select the optimal sources for your procurement needs"
      action={
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Evaluation
        </Button>
      }
      fullWidth={true}
    >
      <GradientText className="text-3xl font-bold mb-4">{pageTitle}</GradientText>
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6 w-full justify-start overflow-x-auto">
          <TabsTrigger value="active">Active Evaluations</TabsTrigger>
          <TabsTrigger value="templates">Evaluation Templates</TabsTrigger>
          <TabsTrigger value="completed">Completed Evaluations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-6 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <Card className="p-5 hover:border-primary/60 transition-colors cursor-pointer">
              <div className="flex items-start space-x-3">
                <FileText className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-lg">IT Services RFP #2024-IT-001</h3>
                  <p className="text-sm text-gray-400 mt-1">Technical evaluation in progress</p>
                  <div className="flex items-center mt-3 gap-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      <span>5 Offerors</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>Due: May 15, 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-5 hover:border-primary/60 transition-colors cursor-pointer">
              <div className="flex items-start space-x-3">
                <FileText className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-lg">Facility Maintenance #2024-FM-003</h3>
                  <p className="text-sm text-gray-400 mt-1">Price analysis underway</p>
                  <div className="flex items-center mt-3 gap-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      <span>3 Offerors</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>Due: May 22, 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-5 hover:border-primary/60 transition-colors cursor-pointer">
              <div className="flex items-start space-x-3">
                <FileText className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-lg">Professional Services #2024-PS-007</h3>
                  <p className="text-sm text-gray-400 mt-1">Past performance evaluation</p>
                  <div className="flex items-center mt-3 gap-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      <span>7 Offerors</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>Due: June 5, 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="templates" className="w-full">
          <Card className="p-6 w-full">
            <h2 className="text-xl font-semibold mb-4">Evaluation Templates</h2>
            <p className="text-gray-400 mb-6">Standardized evaluation templates for different procurement types</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              <Card className="p-4 hover:border-primary/60 transition-colors cursor-pointer">
                <div className="flex items-start space-x-3">
                  <ClipboardList className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">Information Technology Services</h3>
                    <p className="text-xs text-gray-400 mt-1">Technical, management, and past performance factors</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 hover:border-primary/60 transition-colors cursor-pointer">
                <div className="flex items-start space-x-3">
                  <ClipboardList className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">Construction Services</h3>
                    <p className="text-xs text-gray-400 mt-1">Technical approach, schedule, and safety factors</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 hover:border-primary/60 transition-colors cursor-pointer">
                <div className="flex items-start space-x-3">
                  <ClipboardList className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">Professional Services</h3>
                    <p className="text-xs text-gray-400 mt-1">Experience, expertise, and methodology factors</p>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="w-full">
          <Card className="p-6 w-full">
            <h2 className="text-xl font-semibold mb-4">Completed Evaluations</h2>
            <p className="text-gray-400 mb-6">Historical record of finalized source selection evaluations</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              <Card className="p-4 hover:border-primary/60 transition-colors cursor-pointer">
                <div className="flex items-start space-x-3">
                  <CheckSquare className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">Security Services #2023-SS-012</h3>
                    <p className="text-xs text-gray-400 mt-1">Completed March 15, 2024</p>
                    <div className="text-xs text-gray-500 mt-2">5 offerors evaluated</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 hover:border-primary/60 transition-colors cursor-pointer">
                <div className="flex items-start space-x-3">
                  <CheckSquare className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">IT Hardware #2023-IT-005</h3>
                    <p className="text-xs text-gray-400 mt-1">Completed February 28, 2024</p>
                    <div className="text-xs text-gray-500 mt-2">8 offerors evaluated</div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 hover:border-primary/60 transition-colors cursor-pointer">
                <div className="flex items-start space-x-3">
                  <CheckSquare className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">Janitorial Services #2023-JS-009</h3>
                    <p className="text-xs text-gray-400 mt-1">Completed January 22, 2024</p>
                    <div className="text-xs text-gray-500 mt-2">4 offerors evaluated</div>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="w-full">
          <Card className="p-6 w-full">
            <h2 className="text-xl font-semibold mb-4">Evaluation Analytics</h2>
            <p className="text-gray-400 mb-6">Performance metrics and trends for source selection activities</p>
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

export default SourceSelectionPage;
