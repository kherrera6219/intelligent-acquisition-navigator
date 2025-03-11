
import { LucideIcon } from 'lucide-react';

export interface RecentActivity {
  title: string;
  time: string;
  icon: LucideIcon;
}

export interface DashboardCardProps {
  children?: React.ReactNode;
  title: string;
  subtitle?: string;
  footer?: React.ReactNode;
  badge?: {
    text: string;
    variant: string;
  };
  // Add missing props
  icon?: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export interface StatisticsCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

export interface Deadline {
  id: number;
  title: string;
  daysRemaining: number;
}

export interface UserProfile {
  displayName: string;
  role: string;
  tasks: number;
  projects: number;
  loginTime: string;
  isPremium: boolean;
}
