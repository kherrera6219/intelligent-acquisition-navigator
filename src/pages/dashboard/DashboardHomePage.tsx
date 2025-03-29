
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { PlusCircle, BarChart2, Clock, Bell, FileText, Users, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProcurityIQLayout } from '@/components/wireframe/ProcurityIQLayout';
import { MsFluentButton } from '@/components/ui/MsFluentButton';
import { MsFluentCard, MsFluentCardHeader, MsFluentCardTitle, MsFluentCardContent, MsFluentCardFooter } from '@/components/ui/MsFluentCard';

export default function DashboardHomePage() {
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
    
    // Set the document title to indicate this is the Dashboard Home page
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

  const handleNewProject = () => {
    navigate('/proposals/new');
  };

  return (
    <ProcurityIQLayout 
      pageTitle="Dashboard" 
      pageDescription={`${greeting}${user?.email ? ', ' + user.email.split('@')[0] : ''}!`}
      currentSection="dashboard"
    >
      <div className="ms-dashboard-welcome mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="ms-heading-1 text-3xl font-semibold mb-2">Welcome to ProcurityIQ</h1>
            <p className="ms-text-muted">Your procurement management platform</p>
          </div>
          <MsFluentButton 
            variant="primary" 
            size="md"
            leadingIcon={<PlusCircle className="h-4 w-4" />}
            onClick={handleNewProject}
          >
            New Project
          </MsFluentButton>
        </div>
      </div>

      <div className="ms-dashboard-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <MsFluentCard variant="interactive" onClick={() => navigate('/proposals')}>
          <MsFluentCardHeader>
            <MsFluentCardTitle>Proposals</MsFluentCardTitle>
            <FileText className="h-5 w-5 text-primary" />
          </MsFluentCardHeader>
          <MsFluentCardContent>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">12</span>
              <span className="ms-badge-success text-xs px-2 py-0.5 rounded-full bg-success/10 text-success">+3 new</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Active proposals requiring review</p>
          </MsFluentCardContent>
        </MsFluentCard>

        <MsFluentCard variant="interactive" onClick={() => navigate('/vendors')}>
          <MsFluentCardHeader>
            <MsFluentCardTitle>Vendors</MsFluentCardTitle>
            <Users className="h-5 w-5 text-primary" />
          </MsFluentCardHeader>
          <MsFluentCardContent>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">47</span>
              <span className="ms-badge-success text-xs px-2 py-0.5 rounded-full bg-success/10 text-success">+2 new</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Registered vendor partners</p>
          </MsFluentCardContent>
        </MsFluentCard>

        <MsFluentCard variant="interactive" onClick={() => navigate('/purchase-orders')}>
          <MsFluentCardHeader>
            <MsFluentCardTitle>Purchase Orders</MsFluentCardTitle>
            <ShoppingCart className="h-5 w-5 text-primary" />
          </MsFluentCardHeader>
          <MsFluentCardContent>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">23</span>
              <span className="ms-badge-warning text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500">8 pending</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Active purchase orders</p>
          </MsFluentCardContent>
        </MsFluentCard>
      </div>

      <div className="ms-dashboard-sections grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MsFluentCard>
            <MsFluentCardHeader>
              <MsFluentCardTitle>Performance Metrics</MsFluentCardTitle>
              <BarChart2 className="h-5 w-5 text-primary" />
            </MsFluentCardHeader>
            <MsFluentCardContent>
              <div className="h-64 w-full bg-muted/20 rounded flex items-center justify-center">
                <p className="text-muted-foreground">Performance chart visualization</p>
              </div>
            </MsFluentCardContent>
          </MsFluentCard>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <MsFluentCard>
            <MsFluentCardHeader>
              <MsFluentCardTitle>Recent Activity</MsFluentCardTitle>
              <Clock className="h-5 w-5 text-primary" />
            </MsFluentCardHeader>
            <MsFluentCardContent>
              <ul className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <li key={item} className="ms-activity-item border-b border-border/20 pb-3 last:border-0">
                    <div className="flex gap-3">
                      <div className="ms-avatar ms-avatar-sm flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary flex-shrink-0">
                        <Bell className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Proposal #{item} updated</p>
                        <span className="text-xs text-muted-foreground">{item * 10} minutes ago</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </MsFluentCardContent>
            <MsFluentCardFooter>
              <MsFluentButton variant="link" size="sm" onClick={() => navigate('/activity')}>
                View all activity
              </MsFluentButton>
            </MsFluentCardFooter>
          </MsFluentCard>
        </div>
      </div>
    </ProcurityIQLayout>
  );
}
