import React from 'react';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { MsFluentDashboardLayout } from '@/components/layout/MsFluentDashboardLayout';
import { Card } from '@/components/ui/card';
import { MetricsChart } from '@/components/MetricsChart';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';

const AnalyticsPage = () => {
  const title = "Analytics Dashboard";
  const description = "Track and analyze your acquisition metrics and performance indicators";
  
  return (
    <PageErrorBoundary>
      <MsFluentDashboardLayout
        title={title}
        description={description}
        fullWidth={false}
      >
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">
              Performance <MsGradientText>Overview</MsGradientText>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Total Acquisitions</h3>
                <p className="text-3xl font-bold">247</p>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Compliance Score</h3>
                <p className="text-3xl font-bold">98.2%</p>
                <p className="text-xs text-muted-foreground">+2.4% from last month</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Processing Time</h3>
                <p className="text-3xl font-bold">2.3 days</p>
                <p className="text-xs text-muted-foreground">-14% from last month</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">AI Utilization</h3>
                <p className="text-3xl font-bold">86%</p>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </Card>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">
              Performance <MsGradientText>Metrics</MsGradientText>
            </h2>
            <Card className="p-4 h-[400px]">
              <MetricsChart />
            </Card>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">
              Compliance <MsGradientText>Analysis</MsGradientText>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 h-[300px]">
                <h3 className="text-lg font-medium mb-2">Compliance by Category</h3>
                <div className="flex items-center justify-center h-[250px]">
                  <p className="text-muted-foreground">Chart Placeholder</p>
                </div>
              </Card>
              <Card className="p-4 h-[300px]">
                <h3 className="text-lg font-medium mb-2">Historical Compliance</h3>
                <div className="flex items-center justify-center h-[250px]">
                  <p className="text-muted-foreground">Chart Placeholder</p>
                </div>
              </Card>
            </div>
          </section>
        </div>
      </MsFluentDashboardLayout>
    </PageErrorBoundary>
  );
};

export default AnalyticsPage;
