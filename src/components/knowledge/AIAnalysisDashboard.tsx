
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { MetricsChart } from "@/components/MetricsChart";
import { AIAnalysisRecord } from "@/types/knowledge";

export const AIAnalysisDashboard = () => {
  const { data: analysisRecords, isLoading } = useQuery({
    queryKey: ['ai-analysis-records'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_analysis_records')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      return data as AIAnalysisRecord[];
    }
  });

  // Process data for the metrics chart
  const chartData = analysisRecords?.reduce((acc: any[], record) => {
    const date = new Date(record.created_at);
    const month = date.toLocaleString('default', { month: 'short' });
    
    const existingMonth = acc.find(item => item.month === month);
    if (existingMonth) {
      existingMonth.efficiency = (existingMonth.efficiency + record.confidence_score) / 2;
      existingMonth.compliance = Math.max(existingMonth.compliance, record.confidence_score);
      existingMonth.risk = 1 - record.confidence_score;
    } else {
      acc.push({
        month,
        efficiency: record.confidence_score,
        compliance: record.confidence_score,
        risk: 1 - record.confidence_score
      });
    }
    return acc;
  }, []) || [];

  const averageConfidence = analysisRecords?.reduce((sum, record) => 
    sum + record.confidence_score, 0) / (analysisRecords?.length || 1);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">AI Analysis Metrics</h3>
          <div className="text-sm text-muted-foreground">
            Average Confidence: {(averageConfidence * 100).toFixed(1)}%
          </div>
        </div>

        <div className="h-[300px]">
          <MetricsChart data={chartData} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Efficiency Score</h4>
            <div className="text-2xl font-bold text-blue-500">
              {((chartData[chartData.length - 1]?.efficiency || 0) * 100).toFixed(1)}%
            </div>
          </Card>
          
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Compliance Rate</h4>
            <div className="text-2xl font-bold text-green-500">
              {((chartData[chartData.length - 1]?.compliance || 0) * 100).toFixed(1)}%
            </div>
          </Card>
          
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Risk Assessment</h4>
            <div className="text-2xl font-bold text-red-500">
              {((chartData[chartData.length - 1]?.risk || 0) * 100).toFixed(1)}%
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
};
