
import React from 'react';
import { Container } from "@/components/ui/universal/Container";
import { Card } from "@/components/ui/universal/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { Grid } from "@/components/ui/universal/Grid";
import { MetricsChart } from "@/components/MetricsChart";

export default function Analytics() {
  // Example data for the chart
  const chartData = [
    { month: 'Jan', efficiency: 65, compliance: 75, risk: 35 },
    { month: 'Feb', efficiency: 70, compliance: 80, risk: 30 },
    { month: 'Mar', efficiency: 75, compliance: 85, risk: 25 },
    { month: 'Apr', efficiency: 80, compliance: 85, risk: 20 },
  ];

  const metricCards = [
    {
      title: "Total Transactions",
      value: "2,546",
      change: "+12.5% from last month"
    },
    {
      title: "Average Processing Time",
      value: "3.2 days",
      change: "-0.5 days from last month"
    },
    {
      title: "Compliance Rate",
      value: "98.5%",
      change: "+1.2% from last month"
    },
    {
      title: "Active Users",
      value: "1,243",
      change: "+85 from last month"
    }
  ];

  return (
    <Container>
      <PageHeader
        title="Analytics"
        description="Track and analyze your procurement metrics"
        className="mb-4 sm:mb-6 md:mb-8"
      />

      <Grid columns={4} gap="lg" className="mb-4 sm:mb-6 md:mb-8">
        {metricCards.map((metric, index) => (
          <Card 
            key={index} 
            className="p-4 sm:p-5 md:p-6 hover:bg-white/5 transition-colors"
          >
            <h3 className="text-sm sm:text-base text-gray-400 mb-2">
              {metric.title}
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-white mb-1">
              {metric.value}
            </p>
            <p className="text-xs sm:text-sm text-gray-400">
              {metric.change}
            </p>
          </Card>
        ))}
      </Grid>

      <Grid columns={2} gap="lg">
        <Card className="p-4 sm:p-5 md:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
            Performance Trends
          </h2>
          <div className="h-[300px] sm:h-[400px]">
            <MetricsChart data={chartData} type="line" />
          </div>
        </Card>

        <Card className="p-4 sm:p-5 md:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
            Compliance Overview
          </h2>
          <div className="h-[300px] sm:h-[400px]">
            <MetricsChart data={chartData} type="bar" />
          </div>
        </Card>
      </Grid>
    </Container>
  );
}
