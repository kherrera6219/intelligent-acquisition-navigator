
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
