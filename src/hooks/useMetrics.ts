
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { MetricData, ChartDataPoint } from "@/types/metrics";
import { initialMetrics, initialChartData } from "@/constants/metrics";

export const useMetrics = () => {
  const [metrics, setMetrics] = useState<MetricData[]>(initialMetrics);
  const [chartData, setChartData] = useState<ChartDataPoint[]>(initialChartData);
  const { toast } = useToast();

  const updateMetrics = async () => {
    try {
      const { data: metricsData, error } = await supabase
        .from('metrics')
        .select('*')
        .single();

      if (error) throw error;

      if (metricsData) {
        const updatedMetrics = metrics.map(metric => {
          switch (metric.title) {
            case "Pending Reviews":
              return {
                ...metric,
                value: metricsData.pending_reviews.toString(),
                change: `${metricsData.pending_reviews_change > 0 ? '+' : ''}${metricsData.pending_reviews_change} from last week`
              };
            case "Compliance Rate":
              return {
                ...metric,
                value: `${metricsData.compliance_rate}%`,
                change: `${metricsData.compliance_rate_change > 0 ? '+' : ''}${metricsData.compliance_rate_change}% improvement`
              };
            case "Avg. Review Time":
              return {
                ...metric,
                value: `${Math.floor(metricsData.avg_review_time / 60)}m ${metricsData.avg_review_time % 60}s`,
                change: `${metricsData.avg_review_time_change > 0 ? '+' : ''}${Math.floor(metricsData.avg_review_time_change / 60)}m from last week`
              };
            case "Tasks Completed":
              return {
                ...metric,
                value: metricsData.tasks_completed.toString(),
                change: `${metricsData.tasks_completed_change > 0 ? '+' : ''}${metricsData.tasks_completed_change} this week`
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

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        await updateMetrics();

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

  return {
    metrics,
    chartData
  };
};
