
import { ReactNode } from "react";

export interface MetricData {
  title: string;
  icon: ReactNode;
  value: string;
  change: string;
}

export interface ChartDataPoint {
  month: string;
  efficiency: number;
  compliance: number;
  risk: number;
}

export interface MetricsState {
  metrics: MetricData[];
  chartData: ChartDataPoint[];
}
