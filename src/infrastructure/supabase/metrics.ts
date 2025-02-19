
import { supabase } from "@/integrations/supabase/client";
import { MetricData } from "@/domain/metrics/types";
import { initialMetrics } from "@/constants/metrics";

export const fetchMetrics = async () => {
  const { data: metricsData, error } = await supabase
    .from('metrics')
    .select('*')
    .maybeSingle();

  if (error) throw error;

  if (metricsData) {
    return initialMetrics.map(metric => {
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
  }
  return initialMetrics;
};
