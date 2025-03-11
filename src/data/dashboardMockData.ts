
import { FileText, PieChart, Users, HelpCircle, Briefcase, Clock } from 'lucide-react';
import type { RecentActivity } from '@/types/dashboard';

export const recentActivities: RecentActivity[] = [
  { 
    title: "Document 'RFP-2023-001' updated", 
    time: "2 hours ago",
    icon: FileText
  },
  { 
    title: "New proposal submitted", 
    time: "Yesterday",
    icon: Briefcase
  },
  { 
    title: "Analytics report generated", 
    time: "2 days ago",
    icon: PieChart
  },
  { 
    title: "Knowledge base article viewed", 
    time: "3 days ago",
    icon: HelpCircle
  },
  { 
    title: "Meeting scheduled: Project Review", 
    time: "5 days ago",
    icon: Clock
  }
];
