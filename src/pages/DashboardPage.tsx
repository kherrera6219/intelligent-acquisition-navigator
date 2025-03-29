
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UniversalInternalHeader from '@/components/layout/UniversalInternalHeader';
import { InternalFooter } from '@/components/layout/InternalFooter';
import { MsFluentDashboardLayout } from '@/components/layout/MsFluentDashboardLayout';
import { Card } from '@/components/ui/universal/Card';
import { NetworkStatusBanner } from '@/components/ui/universal/NetworkStatusBanner';
import { DashboardMainContent } from '@/components/dashboard/DashboardMainContent';
import { DashboardRecentActivity } from '@/components/dashboard/DashboardRecentActivity';
import { LoadingState } from '@/components/ui/universal/LoadingState';
import { StatisticsOverview } from '@/components/dashboard/StatisticsOverview';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [greeting, setGreeting] = useState<string>('');
  
  // Set appropriate greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
    
    document.title = "Dashboard | ProcurityIQ";
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

  const userName = user?.email ? user.email.split('@')[0] : '';
  
  const handleNewProject = () => {
    navigate('/proposals/new');
  };

  return (
    <MsFluentDashboardLayout
      title="Procurement Dashboard"
      header={<UniversalInternalHeader />}
      footer={<InternalFooter />}
    >
      <NetworkStatusBanner />
      
      <header className="mb-6">
        <h1 className="ms-title-large text-balance">{`${greeting}${userName ? ', ' + userName : ''}!`}</h1>
        <p className="ms-subtitle mt-1">Welcome to your procurement management dashboard</p>
      </header>
          
      {isLoading ? (
        <LoadingState message="Loading your dashboard..." />
      ) : error ? (
        <Card className="p-6 border-destructive/30 bg-destructive/10">
          <h2 className="text-lg font-medium mb-2">Error Loading Dashboard</h2>
          <p className="text-sm text-muted-foreground">{error.message}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </Card>
      ) : (
        <>
          <StatisticsOverview />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <DashboardMainContent />

            <div className="lg:col-span-1">
              <DashboardRecentActivity />
            </div>
          </div>
              
          <Button className="bg-primary hover:bg-primary/90 text-white" onClick={handleNewProject}>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </>
      )}
    </MsFluentDashboardLayout>
  );
}
