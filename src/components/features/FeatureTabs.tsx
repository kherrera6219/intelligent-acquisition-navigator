
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Shield, BarChart3 } from 'lucide-react';
import { FeatureTabContent } from './FeatureTabContent';
import { knowledgeFeatures, complianceFeatures, analyticsFeatures } from './featureData';

export const FeatureTabs: React.FC = () => {
  return (
    <Tabs defaultValue="knowledge" className="mb-20">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="knowledge" className="data-[state=active]:bg-blue-900/20 text-base">
          <BookOpen className="h-4 w-4 mr-2" />
          Knowledge Base
        </TabsTrigger>
        <TabsTrigger value="compliance" className="data-[state=active]:bg-blue-900/20 text-base">
          <Shield className="h-4 w-4 mr-2" />
          Compliance
        </TabsTrigger>
        <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-900/20 text-base">
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="knowledge">
        <FeatureTabContent
          title="Comprehensive Knowledge Management"
          description="Access comprehensive acquisition knowledge resources, from FAR regulations to agency-specific guidance, all in one centralized platform."
          features={knowledgeFeatures}
          image="/images/knowledge-base.jpg"
        />
      </TabsContent>
      
      <TabsContent value="compliance">
        <FeatureTabContent
          title="Automated Compliance Tools"
          description="Ensure adherence to acquisition regulations with powerful compliance tools that automate checks and streamline approvals."
          features={complianceFeatures}
          image="/images/compliance.jpg"
        />
      </TabsContent>
      
      <TabsContent value="analytics">
        <FeatureTabContent
          title="Advanced Analytics & Reporting"
          description="Gain actionable insights into your acquisition processes with comprehensive analytics and customizable reporting capabilities."
          features={analyticsFeatures}
          image="/images/analytics.jpg"
        />
      </TabsContent>
    </Tabs>
  );
};
