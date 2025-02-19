
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { DashboardCard } from "@/components/layout/DashboardCard";
import { Grid } from "@/components/ui/universal/Grid";
import { Container } from "@/components/ui/universal/Container";
import { Card } from "@/components/ui/universal/Card";
import { MetricsChart } from "@/components/MetricsChart";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { 
  FileText, 
  Shield, 
  Zap, 
  BarChart 
} from 'lucide-react';

interface MetricData {
  title: string;
  icon: JSX.Element;
  value: string;
  change: string;
}

interface ChartDataPoint {
  month: string;
  efficiency: number;
  compliance: number;
  risk: number;
}

const initialMetrics: MetricData[] = [
  {
    icon: <FileText className="h-6 w-6 text-violet-400" />,
    title: "Pending Reviews",
    value: "...",
    change: "Loading..."
  },
  {
    icon: <Shield className="h-6 w-6 text-emerald-400" />,
    title: "Compliance Rate",
    value: "...",
    change: "Loading..."
  },
  {
    icon: <Zap className="h-6 w-6 text-blue-400" />,
    title: "Avg. Review Time",
    value: "...",
    change: "Loading..."
  },
  {
    icon: <BarChart className="h-6 w-6 text-amber-400" />,
    title: "Tasks Completed",
    value: "...",
    change: "Loading..."
  }
];

const initialChartData: ChartDataPoint[] = [
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
  const [metrics, setMetrics] = useState<MetricData[]>(initialMetrics);
  const [chartData, setChartData] = useState<ChartDataPoint[]>(initialChartData);
  const { toast } = useToast();

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Subscribe to real-time updates
        const channel = supabase
          .channel('dashboard-metrics')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'metrics'
            },
            (payload) => {
              console.log('Real-time update:', payload);
              updateMetrics();
            }
          )
          .subscribe();

        // Initial data fetch
        await updateMetrics();

        // Cleanup subscription
        return () => {
          supabase.removeChannel(channel);
        };
      } catch (error) {
        console.error('Error setting up real-time updates:', error);
        toast({
          title: "Error",
          description: "Failed to set up real-time updates",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, []);

  // Update metrics from database
  const updateMetrics = async () => {
    try {
      const { data, error } = await supabase
        .from('metrics')
        .select('*')
        .single();

      if (error) throw error;

      if (data) {
        // Update metrics with real data
        const updatedMetrics = metrics.map(metric => {
          switch (metric.title) {
            case "Pending Reviews":
              return {
                ...metric,
                value: data.pending_reviews.toString(),
                change: `${data.pending_reviews_change > 0 ? '+' : ''}${data.pending_reviews_change} from last week`
              };
            case "Compliance Rate":
              return {
                ...metric,
                value: `${data.compliance_rate}%`,
                change: `${data.compliance_rate_change > 0 ? '+' : ''}${data.compliance_rate_change}% improvement`
              };
            case "Avg. Review Time":
              return {
                ...metric,
                value: `${Math.floor(data.avg_review_time / 60)}m ${data.avg_review_time % 60}s`,
                change: `${data.avg_review_time_change > 0 ? '+' : ''}${Math.floor(data.avg_review_time_change / 60)}m from last week`
              };
            case "Tasks Completed":
              return {
                ...metric,
                value: data.tasks_completed.toString(),
                change: `${data.tasks_completed_change > 0 ? '+' : ''}${data.tasks_completed_change} this week`
              };
            default:
              return metric;
          }
        });

        setMetrics(updatedMetrics);
      }
    } catch (error) {
      console.error('Error fetching metrics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch latest metrics",
        variant: "destructive",
      });
    }
  };

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
