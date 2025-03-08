
import React, { useState, useEffect } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { Card } from '@/components/ui/universal/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { BarChart2, Download, Calendar, ArrowUpRight, TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';

// Metric card component
const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend = "neutral" 
}: { 
  title: string; 
  value: string; 
  change?: string; 
  icon: React.ElementType; 
  trend?: "up" | "down" | "neutral" 
}) => {
  const trendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Activity;
  const trendColor = trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-blue-500";
  
  return (
    <Card className="p-5">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
          {change && (
            <div className={`flex items-center ${trendColor} text-sm`}>
              <trendIcon className="h-3 w-3 mr-1" />
              {change}
            </div>
          )}
        </div>
        <div className="p-3 rounded-full bg-gray-800">
          <Icon className="h-5 w-5 text-gray-300" />
        </div>
      </div>
    </Card>
  );
};

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [period, setPeriod] = useState("30d");
  
  // Simulate loading data
  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load analytics data'));
        setIsLoading(false);
      }
    };
    
    loadAnalytics();
  }, []);

  return (
    <ProtectedPageLayout
      title="Analytics Dashboard"
      description="View insights and metrics for your acquisition activities."
      isLoading={isLoading}
      error={error}
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Analytics', href: '/analytics' }
      ]}
      action={
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            title="Total Proposals" 
            value="124" 
            change="+12.5% from last period" 
            icon={BarChart2}
            trend="up" 
          />
          <MetricCard 
            title="Approved Proposals" 
            value="78" 
            change="+5.2% from last period" 
            icon={ArrowUpRight}
            trend="up" 
          />
          <MetricCard 
            title="Rejection Rate" 
            value="24%" 
            change="-2.1% from last period" 
            icon={TrendingDown}
            trend="up" 
          />
          <MetricCard 
            title="Total Value" 
            value="$1.24M" 
            change="+8.7% from last period" 
            icon={DollarSign}
            trend="up" 
          />
        </div>
        
        {/* Charts and Details */}
        <Card>
          <Tabs defaultValue="overview">
            <TabsList className="w-full border-b rounded-none">
              <TabsTrigger value="overview" className="flex-1">
                Overview
              </TabsTrigger>
              <TabsTrigger value="proposals" className="flex-1">
                Proposals
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex-1">
                Performance
              </TabsTrigger>
              <TabsTrigger value="budget" className="flex-1">
                Budget
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="p-6">
              <div className="h-[400px] flex items-center justify-center bg-gray-800/50 rounded-lg">
                <p className="text-gray-400">Chart visualization will appear here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="proposals" className="p-6">
              <div className="h-[400px] flex items-center justify-center bg-gray-800/50 rounded-lg">
                <p className="text-gray-400">Proposal metrics will appear here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="p-6">
              <div className="h-[400px] flex items-center justify-center bg-gray-800/50 rounded-lg">
                <p className="text-gray-400">Performance metrics will appear here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="budget" className="p-6">
              <div className="h-[400px] flex items-center justify-center bg-gray-800/50 rounded-lg">
                <p className="text-gray-400">Budget analytics will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </ProtectedPageLayout>
  );
}
