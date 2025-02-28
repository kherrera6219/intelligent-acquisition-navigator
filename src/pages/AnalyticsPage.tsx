
import React from 'react';
import { Card } from '@/components/ui/universal/Card';
import { PieChart, BarChart3, TrendingUp, ArrowDown, ArrowUp } from 'lucide-react';

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
      icon: <TrendingUp className="h-8 w-8 text-green-500" />
    },
    {
      title: 'Approval Rate',
      value: '73%',
      change: '+5%',
      trend: 'up',
      icon: <BarChart3 className="h-8 w-8 text-purple-500" />
    },
    {
      title: 'Budget Under Review',
      value: '$1.2M',
      change: '+$250K',
      trend: 'up',
      icon: <BarChart3 className="h-8 w-8 text-amber-500" />
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics & Reporting</h1>
        <p className="text-muted-foreground">Track key performance metrics and proposal statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricCards.map((card) => (
          <Card key={card.title} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-muted-foreground">{card.title}</h3>
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4">Proposal Status Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <p className="text-muted-foreground">Chart will be implemented in Phase 3</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4">Monthly Submission Trends</h3>
          <div className="h-64 flex items-center justify-center">
            <p className="text-muted-foreground">Chart will be implemented in Phase 3</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
