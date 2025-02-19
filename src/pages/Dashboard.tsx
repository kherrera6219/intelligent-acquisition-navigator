
import { PageHeader } from "@/components/layout/PageHeader";
import { DashboardCard } from "@/components/layout/DashboardCard";
import { Grid } from "@/components/ui/universal/Grid";
import { Container } from "@/components/ui/universal/Container";
import { Card } from "@/components/ui/universal/Card";
import { MetricsChart } from "@/components/MetricsChart";
import { 
  FileText, 
  Shield, 
  Zap, 
  BarChart 
} from 'lucide-react';

const metrics = [
  {
    icon: <FileText className="h-6 w-6 text-violet-400" />,
    title: "Pending Reviews",
    value: "24",
    change: "+5 from last week"
  },
  {
    icon: <Shield className="h-6 w-6 text-emerald-400" />,
    title: "Compliance Rate",
    value: "95%",
    change: "+2% improvement"
  },
  {
    icon: <Zap className="h-6 w-6 text-blue-400" />,
    title: "Avg. Review Time",
    value: "12m 34s",
    change: "-3m from last week"
  },
  {
    icon: <BarChart className="h-6 w-6 text-amber-400" />,
    title: "Tasks Completed",
    value: "156",
    change: "+22 this week"
  }
];

const chartData = [
  {
    month: 'Jan',
    efficiency: 65,
    compliance: 85,
    risk: 35
  },
  {
    month: 'Feb',
    efficiency: 75,
    compliance: 88,
    risk: 32
  },
  {
    month: 'Mar',
    efficiency: 85,
    compliance: 92,
    risk: 28
  },
  {
    month: 'Apr',
    efficiency: 82,
    compliance: 90,
    risk: 30
  },
  {
    month: 'May',
    efficiency: 88,
    compliance: 95,
    risk: 25
  },
  {
    month: 'Jun',
    efficiency: 90,
    compliance: 94,
    risk: 24
  }
];

const Dashboard = () => {
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

export default Dashboard;
