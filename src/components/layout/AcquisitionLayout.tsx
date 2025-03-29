
import React from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { GradientText } from '@/components/ui/universal/GradientText';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface AcquisitionTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface AcquisitionMetric {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
}

export interface AcquisitionLayoutProps {
  title: string;
  description?: string;
  tabs: AcquisitionTab[];
  metrics?: AcquisitionMetric[];
  defaultTab?: string;
  action?: React.ReactNode;
  breadcrumbs?: { label: string; href: string }[];
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const AcquisitionLayout: React.FC<AcquisitionLayoutProps> = ({
  title,
  description,
  tabs,
  metrics,
  defaultTab,
  action,
  breadcrumbs,
  isLoading,
  children
}) => {
  const [activeTab, setActiveTab] = React.useState<string>(defaultTab || tabs[0].id);
  
  return (
    <ProtectedPageLayout
      title={title}
      description={description}
      action={action}
      isLoading={isLoading}
      breadcrumbs={breadcrumbs}
      fullWidth={true}
    >
      <GradientText className="text-3xl font-bold mb-4">{title}</GradientText>
      
      {metrics && metrics.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-6">
          {metrics.map((metric, index) => (
            <Card key={index} className={cn("p-4", metric.className)}>
              <div className="flex items-center">
                <span className="h-8 w-8 mr-3 flex-shrink-0 flex items-center justify-center">
                  {metric.icon}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-300">{metric.title}</h3>
                  <p className="text-3xl font-bold">{metric.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {children}
      
      <Tabs 
        defaultValue={defaultTab || tabs[0].id} 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="mb-6 w-full justify-start overflow-x-auto">
          {tabs.map(tab => (
            <TabsTrigger key={tab.id} value={tab.id}>{tab.label}</TabsTrigger>
          ))}
        </TabsList>
        
        {tabs.map(tab => (
          <TabsContent key={tab.id} value={tab.id} className="w-full">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </ProtectedPageLayout>
  );
};
