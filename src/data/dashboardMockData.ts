
import { AlertCircle, FileText, Users, Settings, Bell } from 'lucide-react';
import type { RecentActivity, Deadline } from '@/types/dashboard';

// Generate mock recent activities with timestamps
export const recentActivities: RecentActivity[] = [
  {
    title: "Proposal submitted for review",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    time: "30 minutes ago",
    icon: FileText,
    description: "Proposal 'Budget Optimization Plan' was submitted for management review.",
    category: "Document"
  },
  {
    title: "Team meeting scheduled",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    time: "2 hours ago",
    icon: Users,
    description: "Weekly team meeting scheduled for tomorrow at 10:00 AM.",
    category: "Meeting"
  },
  {
    title: "System update completed",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    time: "5 hours ago",
    icon: Settings,
    description: "System maintenance and security updates were successfully applied.",
    category: "System"
  },
  {
    title: "Compliance alert received",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    time: "12 hours ago",
    icon: AlertCircle,
    description: "New compliance requirements need attention before the end of the quarter.",
    category: "Alert"
  },
  {
    title: "New notification settings available",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    time: "1 day ago",
    icon: Bell,
    description: "Configure your notification preferences with new granular controls.",
    category: "System"
  }
];

// Generate mock upcoming deadlines
export const upcomingDeadlines: Deadline[] = [
  {
    id: 1,
    title: "Budget proposal submission",
    daysRemaining: 2
  },
  {
    id: 2,
    title: "Quarterly compliance review",
    daysRemaining: 5
  },
  {
    id: 3,
    title: "Vendor contract renewal",
    daysRemaining: 7
  }
];
