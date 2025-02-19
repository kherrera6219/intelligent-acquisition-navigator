
import { PageHeader } from "@/components/layout/PageHeader";
import { DashboardCard } from "@/components/layout/DashboardCard";
import { Grid } from "@/components/ui/universal/Grid";
import { Container } from "@/components/ui/universal/Container";
import { Card } from "@/components/ui/universal/Card";
import { MetricsChart } from "@/components/MetricsChart";
import { useMetrics } from "@/hooks/useMetrics";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

const Dashboard = () => {
  const { metrics, chartData, isLoading, error } = useMetrics();

  return (
    <Container>
      <PageHeader
        title="Dashboard"
        description="Welcome to your acquisition workflow management system"
      />

      <Grid columns={4} gap="lg" className="mb-8">
        {metrics.map((metric, index) => (
          <DashboardCard
            key={index}
            icon={metric.icon}
            title={metric.title}
            className="hover:bg-white/5 transition-colors"
          >
            <div className="mt-4">
              <p className="text-2xl font-bold text-white">{metric.value}</p>
              <p className="text-sm text-gray-400">{metric.change}</p>
            </div>
          </DashboardCard>
        ))}
      </Grid>

      <Grid columns={2} gap="lg">
        <Card className="spacing-module-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Task Queue</h2>
          <div className="flex items-center justify-center h-48 bg-white/5 rounded-lg">
            <p className="text-gray-400">Task queue visualization coming soon</p>
          </div>
        </Card>

        <Card className="spacing-module-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Performance Metrics</h2>
          <MetricsChart data={chartData} type="line" />
        </Card>
      </Grid>
    </Container>
  );
};

const DashboardWithErrorBoundary = () => {
  return (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  );
};

export default DashboardWithErrorBoundary;
