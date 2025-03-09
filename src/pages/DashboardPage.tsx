
import React, { useState, useEffect } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { Card } from '@/components/ui/universal/Card';
import { useAuth } from '@/hooks/useAuth';
import { PlusCircle, FileText, PieChart, Users, HelpCircle, Briefcase, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Quick action card component for the dashboard
const QuickActionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  color = "text-blue-500" 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType; 
  href: string; 
  color?: string;
}) => (
  <Link to={href} className="block h-full">
    <Card 
      variant="glass" 
      hoverable 
      className="h-full flex flex-col"
    >
      <div className={`w-12 h-12 rounded-full bg-white/10 ${color} flex items-center justify-center mb-4`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </Card>
  </Link>
);

// Activity item component
const ActivityItem = ({ 
  title, 
  time, 
  icon: Icon, 
  color = "text-blue-500" 
}: { 
  title: string; 
  time: string; 
  icon: React.ElementType; 
  color?: string;
}) => (
  <div className="flex items-start gap-3 p-3 rounded-md hover:bg-white/5 transition-colors">
    <div className={`w-8 h-8 rounded-full bg-white/5 ${color} flex items-center justify-center flex-shrink-0`}>
      <Icon className="h-4 w-4" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{time}</p>
    </div>
  </div>
);

export default function DashboardPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [greeting, setGreeting] = useState<string>('');
  
  // Set appropriate greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);
  
  // Simulate loading data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load dashboard data'));
        setIsLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);

  const quickActions = [
    {
      title: "Document Control",
      description: "Manage and organize your acquisition documents.",
      icon: FileText,
      href: "/acquisition/document-control",
      color: "text-blue-500"
    },
    {
      title: "Analytics",
      description: "View analytics and reports for your acquisitions.",
      icon: PieChart,
      href: "/analytics",
      color: "text-purple-500"
    },
    {
      title: "Proposals",
      description: "Review and manage your proposal submissions.",
      icon: Users,
      href: "/proposals",
      color: "text-green-500"
    },
    {
      title: "Knowledge Base",
      description: "Access guides and documentation.",
      icon: HelpCircle,
      href: "/knowledge-base",
      color: "text-amber-500"
    }
  ];

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
    <ProtectedPageLayout
      title={`${greeting}${user?.email ? ', ' + user.email.split('@')[0] : ''}!`}
      description="Welcome to your procurement management dashboard"
      isLoading={isLoading}
      error={error}
      action={
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <PlusCircle className="h-4 w-4 mr-2" />
          New Project
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <QuickActionCard key={index} {...action} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card variant="glass" className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Active Projects</h3>
                <p className="text-3xl font-bold">12</p>
              </Card>
              <Card variant="glass" className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Pending Proposals</h3>
                <p className="text-3xl font-bold">4</p>
              </Card>
              <Card variant="glass" className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Documents Created</h3>
                <p className="text-3xl font-bold">23</p>
              </Card>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
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
        </div>
      </div>
    </ProtectedPageLayout>
  );
}
