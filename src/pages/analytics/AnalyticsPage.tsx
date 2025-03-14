
import React from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { Card } from '@/components/ui/card';
import { BarChart, LineChart, PieChart, Activity, TrendingUp, Users, FileText, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GradientText } from '@/components/ui/universal/GradientText';
import { Badge } from '@/components/ui/badge';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';
import { MsCard } from '@/components/ui/universal/MsCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AnalyticsPage: React.FC = () => {
  return (
    <ProtectedPageLayout
      title={
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span>Analytics</span>
          <GradientText>Dashboard</GradientText>
        </div>
      }
      description="View and analyze acquisition performance metrics"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Analytics', href: '/analytics' }
      ]}
      tags={[
        { label: 'Updated', color: 'blue' },
        { label: 'ShadCN/UI', color: 'green' }
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border-border/50 shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Acquisitions</p>
              <h3 className="text-2xl font-bold mt-1">1,295</h3>
              <div className="flex items-center mt-1 text-xs">
                <span className="text-green-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  12%
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </div>
            <div className="bg-primary/10 p-2 rounded-full">
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border-border/50 shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Proposals</p>
              <h3 className="text-2xl font-bold mt-1">243</h3>
              <div className="flex items-center mt-1 text-xs">
                <span className="text-green-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  5%
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </div>
            <div className="bg-blue-500/10 p-2 rounded-full">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border-border/50 shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Completed Reviews</p>
              <h3 className="text-2xl font-bold mt-1">867</h3>
              <div className="flex items-center mt-1 text-xs">
                <span className="text-yellow-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  8%
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </div>
            <div className="bg-green-500/10 p-2 rounded-full">
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <MsCard className="p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Acquisition Trends</h3>
              <p className="text-sm text-muted-foreground">Monthly acquisition activity</p>
            </div>
            <Badge variant="outline" className="bg-primary/5">
              <BarChart className="h-4 w-4 mr-1 text-primary" />
              Trending
            </Badge>
          </div>
          <div className="h-64 flex flex-col items-center justify-center rounded-md border border-border/50 bg-black/20">
            <BarChart className="h-10 w-10 text-primary/50 mb-2" strokeWidth={1.5} />
            <p className="text-muted-foreground text-sm">Interactive chart visualization would appear here</p>
          </div>
        </MsCard>
        
        <MsCard className="p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Monthly Performance</h3>
              <p className="text-sm text-muted-foreground">Year-to-date performance metrics</p>
            </div>
            <Tabs defaultValue="6m" className="w-[180px]">
              <TabsList className="grid grid-cols-3 h-8">
                <TabsTrigger value="1m" className="text-xs">1M</TabsTrigger>
                <TabsTrigger value="6m" className="text-xs">6M</TabsTrigger>
                <TabsTrigger value="1y" className="text-xs">1Y</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="h-64 flex flex-col items-center justify-center rounded-md border border-border/50 bg-black/20">
            <LineChart className="h-10 w-10 text-blue-500/50 mb-2" strokeWidth={1.5} />
            <p className="text-muted-foreground text-sm">Interactive chart visualization would appear here</p>
          </div>
        </MsCard>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-border/50 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Review Status</h3>
            <PieChart className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="h-40 flex flex-col items-center justify-center rounded-md border border-border/50 bg-black/20">
            <PieChart className="h-8 w-8 text-purple-500/50 mb-2" strokeWidth={1.5} />
            <p className="text-muted-foreground text-sm">Chart visualization would appear here</p>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex items-center text-xs">
              <div className="h-3 w-3 rounded bg-blue-500 mr-2"></div>
              <span className="text-muted-foreground">Completed (45%)</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="h-3 w-3 rounded bg-purple-500 mr-2"></div>
              <span className="text-muted-foreground">In Progress (30%)</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="h-3 w-3 rounded bg-yellow-500 mr-2"></div>
              <span className="text-muted-foreground">Pending (15%)</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="h-3 w-3 rounded bg-red-500 mr-2"></div>
              <span className="text-muted-foreground">Blocked (10%)</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 md:col-span-2 border-border/50 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <p className="text-xs text-muted-foreground mt-1">Latest activities across all acquisitions</p>
            </div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-start p-3 border border-border/50 rounded-md hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-blue-500 text-sm font-medium">A{item}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium">Acquisition #{1000 + item} updated</p>
                    <span className="text-xs text-muted-foreground">{item}h ago</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item === 1 ? "Contract review completed" : 
                     item === 2 ? "New document added" : 
                     item === 3 ? "Status changed to 'In Progress'" : 
                     "Comment added by John Smith"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link to="/dashboard" className="text-sm text-primary hover:text-primary/80 hover:underline inline-flex items-center">
              View All Activity
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
        </Card>
      </div>
    </ProtectedPageLayout>
  );
};

export default AnalyticsPage;
