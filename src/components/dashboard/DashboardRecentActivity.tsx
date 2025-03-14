
import React from 'react';
import { Card } from '@/components/ui/universal/Card';
import { Button } from '@/components/ui/button';
import { ActivityItem } from './ActivityItem';
import { FileText, Briefcase, PieChart, HelpCircle, Clock } from 'lucide-react';

export const DashboardRecentActivity: React.FC = () => {
  // Example recent activity data
  const recentActivities = [
    { 
      title: "Document 'RFP-2023-001' updated", 
      time: "2 hours ago", 
      icon: FileText, 
      color: "text-blue-500"
    },
    { 
      title: "New proposal submitted", 
      time: "Yesterday", 
      icon: Briefcase, 
      color: "text-green-500"
    },
    { 
      title: "Analytics report generated", 
      time: "2 days ago", 
      icon: PieChart, 
      color: "text-purple-500"
    },
    { 
      title: "Knowledge base article viewed", 
      time: "3 days ago", 
      icon: HelpCircle, 
      color: "text-amber-500"
    },
    { 
      title: "Meeting scheduled: Project Review", 
      time: "5 days ago", 
      icon: Clock, 
      color: "text-indigo-500"
    }
  ];

  return (
    <Card variant="glass" className="p-0">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
      </div>
      <div className="p-2">
        {recentActivities.length > 0 ? (
          recentActivities.map((activity, index) => (
            <ActivityItem key={index} {...activity} />
          ))
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground text-sm">No recent activity to display.</p>
          </div>
        )}
      </div>
      <div className="p-3 border-t border-border">
        <Button variant="ghost" className="w-full justify-center text-sm">
          View All Activity
        </Button>
      </div>
    </Card>
  );
};
