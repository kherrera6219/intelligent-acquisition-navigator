
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
        className="mb-4 sm:mb-6 md:mb-8"
      />

      {/* Metric cards - 1 column on mobile, 2 on tablet, 4 on desktop */}
      <Grid columns={4} gap="lg" className="mb-4 sm:mb-6 md:mb-8">
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((index) => (
              <Card key={index} className="p-4 sm:p-5 md:p-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg" />
                  <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
                </div>
                <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
                  <Skeleton className="h-6 sm:h-8 w-16 sm:w-20" />
                  <Skeleton className="h-3 sm:h-4 w-24 sm:w-32" />
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
              className="hover:bg-white/5 transition-colors p-4 sm:p-5 md:p-6"
            >
              <div className="mt-3 sm:mt-4">
                <p className="text-xl sm:text-2xl font-bold text-white">{metric.value}</p>
                <p className="text-xs sm:text-sm text-gray-400">{metric.change}</p>
              </div>
            </DashboardCard>
          ))
        )}
      </Grid>

      {/* Charts section - 1 column on mobile, 2 on tablet and up */}
      <Grid 
        columns={2} 
        gap="lg" 
        className="flex-col md:flex-row space-y-4 md:space-y-0"
      >
        <Card className="p-4 sm:p-5 md:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
            Task Queue
          </h2>
          {isLoading ? (
            <Skeleton className="h-40 sm:h-48 w-full rounded-lg" />
          ) : (
            <div className="flex items-center justify-center h-40 sm:h-48 bg-white/5 rounded-lg">
              <p className="text-sm sm:text-base text-gray-400">
                Task queue visualization coming soon
              </p>
            </div>
          )}
        </Card>

        <Card className="p-4 sm:p-5 md:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
            Performance Metrics
          </h2>
          {isLoading ? (
            <Skeleton className="h-[200px] sm:h-[264px] w-full rounded-lg" />
          ) : (
            <div className="h-[200px] sm:h-[264px]">
              <MetricsChart data={chartData} type="line" />
            </div>
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
