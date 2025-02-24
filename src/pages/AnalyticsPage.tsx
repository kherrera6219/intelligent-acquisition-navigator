
import React from 'react';
import { Container } from "@/components/ui/universal/Container";
import { Card } from "@/components/ui/universal/Card";
import { Grid } from "@/components/ui/universal/Grid";
import { MetricsChart } from "@/components/MetricsChart";

export default function Analytics() {
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

      <Grid columns={4} gap="lg" className="mb-6">
        {metricCards.map((metric, index) => (
          <Card 
            key={index} 
            className="p-4"
          >
            <h3 className="text-sm text-gray-500 mb-2">
              {metric.title}
            </h3>
            <p className="text-2xl font-bold mb-1">
              {metric.value}
            </p>
            <p className="text-sm text-gray-500">
              {metric.change}
            </p>
          </Card>
        ))}
      </Grid>

      <Grid columns={2} gap="lg">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">
            Performance Trends
          </h2>
          <div className="h-[400px]">
            <MetricsChart data={chartData} type="line" />
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">
            Compliance Overview
          </h2>
          <div className="h-[400px]">
            <MetricsChart data={chartData} type="bar" />
          </div>
        </Card>
      </Grid>
    </div>
  );
}
