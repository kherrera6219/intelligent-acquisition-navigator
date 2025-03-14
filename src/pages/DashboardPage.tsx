
import React, { useState, useEffect } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { useAuth } from '@/hooks/useAuth';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardQuickActions } from '@/components/dashboard/DashboardQuickActions';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { DashboardRecentActivity } from '@/components/dashboard/DashboardRecentActivity';

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
    
    // Set the document title to indicate this is the Home page
    document.title = "Home | ProcurityIQ";
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
          <DashboardQuickActions />
          <DashboardOverview />
        </div>

        <div className="lg:col-span-1">
          <DashboardRecentActivity />
        </div>
      </div>
    </ProtectedPageLayout>
  );
}
