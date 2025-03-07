
import React from 'react';
import { Card } from '@/components/ui/universal/Card';
import { Container } from '@/components/ui/universal/Container';
import { 
  PieChart, BarChart3, TrendingUp, ArrowDown, ArrowUp, 
  Users, Clock, DollarSign, CheckCircle, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Grid } from '@/components/ui/universal/Grid';

const AnalyticsPage: React.FC = () => {
  const metricCards = [
    {
      title: 'Total Proposals',
      value: '164',
      change: '+12%',
      trend: 'up',
      icon: <PieChart className="h-8 w-8 text-blue-500" />
    },
    {
      title: 'Avg. Processing Time',
      value: '8.5 days',
      change: '-2.3 days',
      trend: 'down',
      icon: <Clock className="h-8 w-8 text-green-500" />
    },
    {
      title: 'Approval Rate',
      value: '73%',
      change: '+5%',
      trend: 'up',
      icon: <CheckCircle className="h-8 w-8 text-purple-500" />
    },
    {
      title: 'Budget Under Review',
      value: '$1.2M',
      change: '+$250K',
      trend: 'up',
      icon: <DollarSign className="h-8 w-8 text-amber-500" />
    }
  ];

  return (
    <Container>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Analytics & Reporting</h1>
          <p className="text-muted-foreground">Track key performance metrics and proposal statistics</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm">
            Last 30 Days
          </Button>
          <Button variant="default" size="sm">
            Export
          </Button>
        </div>
      </div>

      <Grid columns={4} gap="md" className="mb-8">
        {metricCards.map((card, index) => (
          <Card key={index} className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-400">{card.title}</h3>
              {card.icon}
            </div>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold">{card.value}</p>
              <div className={`flex items-center ${card.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {card.trend === 'up' ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                <span>{card.change}</span>
              </div>
            </div>
          </Card>
        ))}
      </Grid>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Proposal Status Distribution</h3>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-center">
              <PieChart className="h-10 w-10 mx-auto mb-2 text-gray-400" />
              <p className="text-muted-foreground">Chart will be implemented in Phase 3</p>
              <Button variant="link" className="mt-2 text-primary">Preview Sample Data</Button>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Monthly Submission Trends</h3>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-center">
              <BarChart3 className="h-10 w-10 mx-auto mb-2 text-gray-400" />
              <p className="text-muted-foreground">Chart will be implemented in Phase 3</p>
              <Button variant="link" className="mt-2 text-primary">Preview Sample Data</Button>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">Performance by Department</h3>
          <Button variant="outline" size="sm">Export Data</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-4 font-medium text-gray-400">Department</th>
                <th className="text-left py-4 px-4 font-medium text-gray-400">Submissions</th>
                <th className="text-left py-4 px-4 font-medium text-gray-400">Approval Rate</th>
                <th className="text-left py-4 px-4 font-medium text-gray-400">Avg. Time</th>
                <th className="text-left py-4 px-4 font-medium text-gray-400">YOY Change</th>
              </tr>
            </thead>
            <tbody>
              {[
                { dept: 'Information Technology', submissions: 42, rate: '78%', time: '7.2 days', change: '+8%' },
                { dept: 'Operations', submissions: 36, rate: '65%', time: '9.5 days', change: '-3%' },
                { dept: 'Finance', submissions: 28, rate: '82%', time: '6.8 days', change: '+12%' },
                { dept: 'Human Resources', submissions: 21, rate: '71%', time: '8.1 days', change: '+4%' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                  <td className="py-4 px-4">{row.dept}</td>
                  <td className="py-4 px-4">{row.submissions}</td>
                  <td className="py-4 px-4">{row.rate}</td>
                  <td className="py-4 px-4">{row.time}</td>
                  <td className="py-4 px-4" style={{ color: row.change.includes('+') ? '#10b981' : '#ef4444' }}>{row.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Container>
  );
};

export default AnalyticsPage;
