
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, PieChart, FilePlus, Users, Settings, 
  FileText, Database, BookOpen, BarChart2, FileSearch
} from 'lucide-react';
import { Card } from '@/components/ui/universal/Card';
import { Button } from '@/components/ui/button';
import { Grid } from '@/components/ui/universal/Grid';
import { Container } from '@/components/ui/universal/Container';
import { SectionLoader } from '@/components/ui/section/SectionLoader';
import { useToast } from '@/components/ui/use-toast';
import { cachedFetch } from '@/utils/cachedFetch';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate data fetching
        await new Promise(resolve => setTimeout(resolve, 800));
        setDashboardData({
          proposals: 24,
          analytics: 5,
          documents: 12,
          users: 7
        });
      } catch (err) {
        setError('Error loading dashboard data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // Simulate data fetching
      await new Promise(resolve => setTimeout(resolve, 800));
      setDashboardData({
        proposals: Math.floor(Math.random() * 30) + 10,
        analytics: Math.floor(Math.random() * 10) + 1,
        documents: Math.floor(Math.random() * 20) + 5,
        users: Math.floor(Math.random() * 10) + 3
      });
      toast({
        title: "Dashboard Refreshed",
        description: "Data has been successfully updated",
      });
    } catch (err) {
      setError('Error refreshing dashboard data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const dashboardItems = [
    {
      title: 'Proposals',
      description: 'Manage and review all proposals',
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      path: '/proposals',
      count: dashboardData?.proposals || '0'
    },
    {
      title: 'Analytics',
      description: 'View proposal statistics and metrics',
      icon: <BarChart2 className="h-8 w-8 text-purple-500" />,
      path: '/analytics',
      count: dashboardData?.analytics || '0'
    },
    {
      title: 'Document Control',
      description: 'Manage procurement documents',
      icon: <FilePlus className="h-8 w-8 text-green-500" />,
      path: '/acquisition/document-control',
      count: dashboardData?.documents || '0'
    },
    {
      title: 'Knowledge Base',
      description: 'Access procurement knowledge resources',
      icon: <Database className="h-8 w-8 text-amber-500" />,
      path: '/knowledge-base',
      count: dashboardData?.documents || '0'
    }
  ];

  if (isLoading) {
    return (
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Procurement Dashboard</h1>
          <p className="text-muted-foreground">Manage your procurement processes efficiently</p>
        </div>
        <SectionLoader />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Card className="p-6 bg-red-500/10 border-red-500/20">
          <h1 className="text-xl font-bold mb-2">Error loading dashboard data</h1>
          <p className="text-muted-foreground">{error}</p>
          <Button variant="outline" className="mt-4" onClick={handleRefresh}>
            Try Again
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Procurement Dashboard</h1>
          <p className="text-muted-foreground">Manage your procurement processes efficiently</p>
        </div>
        <Button variant="outline" onClick={handleRefresh} className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin mr-1">
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
            <path d="M16 21h5v-5"></path>
          </svg>
          Refresh
        </Button>
      </div>

      <Grid columns={2} gap="md" className="mb-8">
        {dashboardItems.map((item) => (
          <Card 
            key={item.title} 
            className="p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(item.path)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="rounded-lg p-2 bg-gray-100 dark:bg-gray-800">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-medium mr-2">
                  {item.count}
                </span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </Card>
        ))}
      </Grid>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 col-span-1 lg:col-span-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((index) => (
              <div key={index} className="p-3 bg-black/20 rounded-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium">Proposal {Math.floor(Math.random() * 1000)} Updated</p>
                    <p className="text-xs text-gray-400">{Math.floor(Math.random() * 24)} hours ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/proposals')}>
                  View
                </Button>
              </div>
            ))}
          </div>
          <Button variant="link" className="mt-4" onClick={() => navigate('/proposals')}>
            View All Activity
          </Button>
        </Card>

        <Card className="p-6 col-span-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            <Button variant="outline" onClick={() => navigate('/proposals')}>
              View All Proposals
            </Button>
            <Button variant="outline" onClick={() => navigate('/acquisition/document-control')}>
              Manage Documents
            </Button>
            <Button variant="outline" onClick={() => navigate('/knowledge-base')}>
              Access Knowledge Base
            </Button>
            <Button variant="outline" onClick={() => navigate('/settings')}>
              System Settings
            </Button>
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="p-6" data-testid="notifications-panel">
          <h3 className="font-bold text-lg mb-4">Notifications</h3>
          <div className="space-y-2">
            <div className="p-3 rounded-md bg-yellow-500/10 border border-yellow-500/20">
              <p className="font-medium">System Maintenance</p>
              <p className="text-sm text-gray-400">Scheduled maintenance on June 15th, 2024</p>
            </div>
            <div className="p-3 rounded-md bg-blue-500/10 border border-blue-500/20">
              <p className="font-medium">New Features Available</p>
              <p className="text-sm text-gray-400">Check out the latest updates in the knowledge base</p>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default DashboardPage;
