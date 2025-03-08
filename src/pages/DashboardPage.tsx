
import React, { useState, useEffect } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { Card } from '@/components/ui/universal/Card';
import { useAuth } from '@/hooks/useAuth';
import { PlusCircle, FileText, PieChart, Users, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Quick action card component for the dashboard
const QuickActionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  color = "bg-blue-500/20 text-blue-500" 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType; 
  href: string; 
  color?: string;
}) => (
  <Link to={href} className="block h-full">
    <Card className="p-6 h-full hover:bg-gray-800/50 transition-colors flex flex-col">
      <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mb-4`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </Card>
  </Link>
);

export default function DashboardPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
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
      color: "bg-blue-500/20 text-blue-500"
    },
    {
      title: "Analytics",
      description: "View analytics and reports for your acquisitions.",
      icon: PieChart,
      href: "/analytics",
      color: "bg-purple-500/20 text-purple-500"
    },
    {
      title: "Proposals",
      description: "Review and manage your proposal submissions.",
      icon: Users,
      href: "/proposals",
      color: "bg-green-500/20 text-green-500"
    },
    {
      title: "Knowledge Base",
      description: "Access guides and documentation.",
      icon: HelpCircle,
      href: "/knowledge-base",
      color: "bg-amber-500/20 text-amber-500"
    }
  ];

  return (
    <ProtectedPageLayout
      title="Dashboard"
      description={`Welcome back${user?.email ? ', ' + user.email.split('@')[0] : ''}!`}
      isLoading={isLoading}
      error={error}
      action={
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Project
        </Button>
      }
    >
      <div className="my-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <QuickActionCard key={index} {...action} />
          ))}
        </div>
      </div>

      <div className="my-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card className="p-6">
          <p className="text-gray-400 text-center py-8">No recent activity to display.</p>
        </Card>
      </div>
    </ProtectedPageLayout>
  );
}
