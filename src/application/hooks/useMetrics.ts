
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { MetricData, ChartDataPoint } from "@/domain/metrics/types";
import { initialMetrics, initialChartData } from "@/constants/metrics";
import { fetchMetrics } from "@/infrastructure/supabase/metrics";
import { supabase } from "@/integrations/supabase/client";

export const useMetrics = () => {
  const [metrics, setMetrics] = useState<MetricData[]>(initialMetrics);
  const [chartData, setChartData] = useState<ChartDataPoint[]>(initialChartData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const updateMetrics = async () => {
    try {
      setError(null);
      const updatedMetrics = await fetchMetrics();
      setMetrics(updatedMetrics);
    } catch (err) {
      console.error('Error fetching metrics:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch metrics'));
      toast({
        title: "Error",
        description: "Failed to fetch latest metrics",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
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
      } catch (err) {
        console.error('Error setting up real-time updates:', err);
        setError(err instanceof Error ? err : new Error('Failed to set up real-time updates'));
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
    chartData,
    isLoading,
    error
  };
};
