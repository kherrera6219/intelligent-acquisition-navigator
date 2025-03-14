import { LucideIcon } from 'lucide-react';

export interface RecentActivity {
  title: string;
  time?: string; // Keep for backward compatibility
  timestamp: string; // ISO date string for sorting and proper formatting
  icon: LucideIcon;
  description?: string; // Optional longer description
  category?: string; // Optional category for filtering
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

export interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: string;
  status: 'pending' | 'in-progress' | 'completed';
  user: string;
}
