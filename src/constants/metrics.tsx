
import { MetricData, ChartDataPoint } from "@/types/metrics";
import { 
  FileText, 
  Shield, 
  Zap, 
  BarChart 
} from 'lucide-react';

export const initialMetrics: MetricData[] = [
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

export const initialChartData: ChartDataPoint[] = [
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
