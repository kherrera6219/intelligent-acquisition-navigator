
import { LucideIcon } from 'lucide-react';

export interface RecentActivity {
  title: string;
  time: string;
  icon: LucideIcon;
}

export interface DashboardCardProps {
  children: React.ReactNode;
  title: string;
  footer?: React.ReactNode;
}

export interface StatisticsCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
}
