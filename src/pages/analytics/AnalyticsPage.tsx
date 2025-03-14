
import React from 'react';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { MetricsChart } from '@/components/MetricsChart';
import { useMetrics } from '@/hooks/useMetrics';
import { Card } from '@/components/ui/universal/Card';
import { GradientText } from '@/components/ui/universal/GradientText';
import { performanceData } from '@/data/performanceData';

const AnalyticsPage = () => {
  // In a real app, we would fetch actual metrics
  // const { data: metricsData, isLoading, error } = useMetrics();
  
  // Prepare the data in the format expected by MetricsChart
  const formattedData = {
    labels: performanceData.map(item => item.month),
    datasets: [
      {
        label: 'Compliance Score',
        data: performanceData.map(item => item.compliance),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Processing Time (days)',
        data: performanceData.map(item => item.efficiency),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      }
    ]
  };
  
  return (
    <PageErrorBoundary>
      <ProtectedPageLayout 
        title="Analytics Dashboard"
        description="Monitor key performance indicators and metrics for your acquisition process."
      >
        <Container>
          <Row>
            <Col lg={8} className="mb-6">
              <Card variant="metal" className="p-6">
                <h2 className="text-xl font-semibold mb-4">Performance Trends</h2>
                <MetricsChart data={formattedData} />
              </Card>
            </Col>
            
            <Col lg={4} className="mb-6">
              <div className="space-y-6">
                <Card variant="metal" className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Compliance Score</h3>
                  <div className="text-3xl font-bold text-blue-400">98%</div>
                  <p className="text-sm text-muted-foreground mt-2">+2% from last month</p>
                </Card>
                
                <Card variant="metal" className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Avg. Processing Time</h3>
                  <div className="text-3xl font-bold text-green-400">5.2 days</div>
                  <p className="text-sm text-muted-foreground mt-2">-15% from last month</p>
                </Card>
              </div>
            </Col>
          </Row>
          
          <Row>
            <Col md={6} lg={3} className="mb-6">
              <Card variant="metal" className="p-6 h-full">
                <h3 className="text-lg font-semibold mb-2">Total Reviews</h3>
                <div className="text-3xl font-bold text-violet-400">329</div>
                <p className="text-sm text-muted-foreground mt-2">This quarter</p>
              </Card>
            </Col>
            
            <Col md={6} lg={3} className="mb-6">
              <Card variant="metal" className="p-6 h-full">
                <h3 className="text-lg font-semibold mb-2">AI Interventions</h3>
                <div className="text-3xl font-bold text-amber-400">74%</div>
                <p className="text-sm text-muted-foreground mt-2">Of total workflow</p>
              </Card>
            </Col>
            
            <Col md={6} lg={3} className="mb-6">
              <Card variant="metal" className="p-6 h-full">
                <h3 className="text-lg font-semibold mb-2">Risk Factors Identified</h3>
                <div className="text-3xl font-bold text-rose-400">156</div>
                <p className="text-sm text-muted-foreground mt-2">Proactively addressed</p>
              </Card>
            </Col>
            
            <Col md={6} lg={3} className="mb-6">
              <Card variant="metal" className="p-6 h-full">
                <h3 className="text-lg font-semibold mb-2">Time Saved</h3>
                <div className="text-3xl font-bold text-cyan-400">452 hrs</div>
                <p className="text-sm text-muted-foreground mt-2">This quarter</p>
              </Card>
            </Col>
          </Row>
        </Container>
      </ProtectedPageLayout>
    </PageErrorBoundary>
  );
};

export default AnalyticsPage;
