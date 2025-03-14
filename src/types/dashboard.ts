
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: string;
  user: {
    name: string;
    avatar: string;
  };
  icon?: LucideIcon;
  status?: 'info' | 'warning' | 'success' | 'error';
}

export interface RecentActivity {
  title: string;
  timestamp: string;
  time?: string;
  icon: LucideIcon;
  description: string;
  category: string;
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

export interface DashboardCardProps {
  title: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
  footer?: ReactNode;
  badge?: {
    text: string;
    variant: 'default' | 'success' | 'warning' | 'error' | 'info';
  };
  // Add missing properties that are used in QuickActions.tsx
  href?: string;
  icon?: ReactNode;
}
