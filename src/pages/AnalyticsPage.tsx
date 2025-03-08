
import React, { useState, useEffect } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { Card } from '@/components/ui/universal/Card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
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

  // Mock data for charts
  const barData = [
    { name: 'Jan', value: 12 },
    { name: 'Feb', value: 19 },
    { name: 'Mar', value: 15 },
    { name: 'Apr', value: 27 },
    { name: 'May', value: 22 },
    { name: 'Jun', value: 32 },
  ];

  const lineData = [
    { name: 'Week 1', value: 35 },
    { name: 'Week 2', value: 42 },
    { name: 'Week 3', value: 38 },
    { name: 'Week 4', value: 50 },
    { name: 'Week 5', value: 55 },
    { name: 'Week 6', value: 48 },
  ];

  const pieData = [
    { name: 'Approved', value: 65 },
    { name: 'Pending', value: 25 },
    { name: 'Rejected', value: 10 },
  ];

  const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];

  // Metric cards
  const metrics = [
    { 
      title: 'Total Proposals', 
      value: '245', 
      change: '+12%', 
      trend: 'up',
      trendIconComponent: ArrowUpRight 
    },
    { 
      title: 'Approval Rate', 
      value: '72%', 
      change: '+3%', 
      trend: 'up',
      trendIconComponent: ArrowUpRight 
    },
    { 
      title: 'Average Response Time', 
      value: '4.2 days', 
      change: '-0.8 days', 
      trend: 'up',
      trendIconComponent: ArrowUpRight 
    },
    { 
      title: 'Active Projects', 
      value: '28', 
      change: '-2', 
      trend: 'down',
      trendIconComponent: ArrowDownRight 
    },
  ];

  return (
    <ProtectedPageLayout
      title="Analytics Dashboard"
      description="View performance metrics and acquisition analytics."
      isLoading={isLoading}
      error={error}
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Analytics', href: '/analytics' }
      ]}
      action={
        <div className="flex space-x-2">
          <select className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => {
            const TrendIcon = metric.trendIconComponent;
            return (
              <Card key={index} className="p-4">
                <h3 className="text-gray-400 text-sm">{metric.title}</h3>
                <div className="flex justify-between items-end mt-2">
                  <p className="text-2xl font-semibold">{metric.value}</p>
                  <div className={`flex items-center text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    <TrendIcon className="h-4 w-4 mr-1" />
                    <span>{metric.change}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <Card className="p-4">
            <h3 className="text-lg font-medium mb-4">Proposal Submissions</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#333', 
                      border: '1px solid #444',
                      borderRadius: '4px'
                    }} 
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Line Chart */}
          <Card className="p-4">
            <h3 className="text-lg font-medium mb-4">Response Times</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#333', 
                      border: '1px solid #444',
                      borderRadius: '4px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Pie Chart */}
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Proposal Status Distribution</h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#333', 
                    border: '1px solid #444',
                    borderRadius: '4px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Additional Analytics */}
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Top Performing Departments</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">IT Department</p>
                <p className="text-sm text-gray-400">32 proposals, 85% approval rate</p>
              </div>
              <div className="flex items-center text-green-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>12%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Marketing</p>
                <p className="text-sm text-gray-400">28 proposals, 79% approval rate</p>
              </div>
              <div className="flex items-center text-green-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>9%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Operations</p>
                <p className="text-sm text-gray-400">25 proposals, 72% approval rate</p>
              </div>
              <div className="flex items-center text-green-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>5%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </ProtectedPageLayout>
  );
}
