
import { PageHeader } from "@/components/layout/PageHeader";
import { DashboardCard } from "@/components/layout/DashboardCard";
import { Grid } from "@/components/ui/universal/Grid";
import { Container } from "@/components/ui/universal/Container";
import { Card } from "@/components/ui/universal/Card";
import { MetricsChart } from "@/components/MetricsChart";
import { useMetrics } from "@/hooks/useMetrics";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { metrics, chartData, isLoading, error } = useMetrics();

  return (
    <Container>
      <PageHeader
        title="Dashboard"
        description="Welcome to your acquisition workflow management system"
      />

      <Grid columns={4} gap="lg" className="mb-8">
        {isLoading ? (
          // Loading skeletons for metric cards
          <>
            {[1, 2, 3, 4].map((index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="mt-4 space-y-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </Card>
            ))}
          </>
        ) : (
          metrics.map((metric, index) => (
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
          ))
        )}
      </Grid>

      <Grid columns={2} gap="lg">
        <Card className="spacing-module-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Task Queue</h2>
          {isLoading ? (
            <Skeleton className="h-48 w-full rounded-lg" />
          ) : (
            <div className="flex items-center justify-center h-48 bg-white/5 rounded-lg">
              <p className="text-gray-400">Task queue visualization coming soon</p>
            </div>
          )}
        </Card>

        <Card className="spacing-module-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Performance Metrics</h2>
          {isLoading ? (
            <Skeleton className="h-[264px] w-full rounded-lg" />
          ) : (
            <MetricsChart data={chartData} type="line" />
          )}
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
