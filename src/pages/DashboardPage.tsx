
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { PlusCircle, FileText, Calendar, Users, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardQuickActions } from '@/components/dashboard/DashboardQuickActions';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { DashboardRecentActivity } from '@/components/dashboard/DashboardRecentActivity';
import UniversalInternalHeader from '@/components/layout/UniversalInternalHeader';
import { InternalFooter } from '@/components/layout/InternalFooter';
import { MsFluentDashboardLayout } from '@/components/layout/MsFluentDashboardLayout';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { MsDashboardGrid } from '@/components/layout/MsDashboardGrid';
import { MsDashboardSection } from '@/components/layout/MsDashboardSection';
import { MsStatsCard } from '@/components/layout/MsStatsCard';
import { Card } from '@/components/ui/universal/Card';
import { NetworkStatusBanner } from '@/components/ui/universal/NetworkStatusBanner';

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

  return (
    <div className="ms-layout-container min-h-screen">
      <UniversalInternalHeader />
      <NetworkStatusBanner />
      
      <div className="flex-1 overflow-auto">
        <Container className="py-6">
          <header className="mb-6">
            <h1 className="ms-title-large text-balance">{`${greeting}${userName ? ', ' + userName : ''}!`}</h1>
            <p className="ms-subtitle mt-1">Welcome to your procurement management dashboard</p>
          </header>
          
          {isLoading ? (
            <div className="p-12 flex justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
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
              <MsDashboardSection 
                title="Quick Actions" 
                description="Common tasks and operations"
              >
                <MsDashboardGrid columns={4} gap="md">
                  <Card className="p-5 hover:bg-gray-800/40 transition-colors group">
                    <div className="flex flex-col h-full">
                      <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 w-fit mb-3">
                        <FileText className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium mb-1">Document Management</h3>
                      <p className="text-sm text-muted-foreground mb-3 flex-grow">Create, upload, and manage your procurement documents</p>
                      <Button size="sm" variant="outline" className="w-full justify-start">
                        <span>View Documents</span>
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="p-5 hover:bg-gray-800/40 transition-colors group">
                    <div className="flex flex-col h-full">
                      <div className="p-2 rounded-lg bg-violet-500/20 text-violet-400 w-fit mb-3">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium mb-1">Upcoming Deadlines</h3>
                      <p className="text-sm text-muted-foreground mb-3 flex-grow">View and manage your upcoming deadlines</p>
                      <Button size="sm" variant="outline" className="w-full justify-start">
                        <span>View Calendar</span>
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="p-5 hover:bg-gray-800/40 transition-colors group">
                    <div className="flex flex-col h-full">
                      <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 w-fit mb-3">
                        <Users className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium mb-1">Team Collaboration</h3>
                      <p className="text-sm text-muted-foreground mb-3 flex-grow">Collaborate with team members on procurement projects</p>
                      <Button size="sm" variant="outline" className="w-full justify-start">
                        <span>Team Dashboard</span>
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="p-5 hover:bg-gray-800/40 transition-colors group">
                    <div className="flex flex-col h-full">
                      <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 w-fit mb-3">
                        <Activity className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium mb-1">Analytics</h3>
                      <p className="text-sm text-muted-foreground mb-3 flex-grow">View procurement analytics and insights</p>
                      <Button size="sm" variant="outline" className="w-full justify-start">
                        <span>View Analytics</span>
                      </Button>
                    </div>
                  </Card>
                </MsDashboardGrid>
              </MsDashboardSection>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 space-y-6">
                  <MsDashboardSection title="Performance Metrics" variant="card">
                    <MsDashboardGrid columns={2} gap="sm">
                      <MsStatsCard
                        title="Active Projects"
                        value="12"
                        description="Total active procurement projects"
                        trend={{ value: 8, label: "vs last month" }}
                        icon={<FileText className="h-5 w-5 text-blue-400" />}
                      />
                      <MsStatsCard
                        title="Pending Reviews"
                        value="6"
                        description="Documents waiting for review"
                        trend={{ value: -3, label: "vs last month", direction: "down" }}
                        icon={<Calendar className="h-5 w-5 text-amber-400" />}
                      />
                      <MsStatsCard
                        title="Compliance Rate"
                        value="98%"
                        description="Overall compliance score"
                        trend={{ value: 2, label: "improvement" }}
                        icon={<Activity className="h-5 w-5 text-emerald-400" />}
                      />
                      <MsStatsCard
                        title="Team Members"
                        value="8"
                        description="Active team members"
                        trend={{ value: 0, direction: "neutral", label: "no change" }}
                        icon={<Users className="h-5 w-5 text-violet-400" />}
                      />
                    </MsDashboardGrid>
                  </MsDashboardSection>
                  
                  <DashboardOverview />
                </div>

                <div className="lg:col-span-1">
                  <DashboardRecentActivity />
                </div>
              </div>
              
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </>
          )}
        </Container>
      </div>
      
      <InternalFooter />
    </div>
  );
}
