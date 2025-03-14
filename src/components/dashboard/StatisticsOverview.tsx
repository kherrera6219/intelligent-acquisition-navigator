
import React from 'react';
import { TrendingUp, TrendingDown, Clock, DollarSign, Briefcase, Users } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend, icon }) => {
  return (
    <div className="ms-stats-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
          
          {change && (
            <div className="flex items-center mt-1">
              {trend === 'up' ? (
                <TrendingUp className="h-3 w-3 text-success mr-1" />
              ) : trend === 'down' ? (
                <TrendingDown className="h-3 w-3 text-destructive mr-1" />
              ) : (
                <div className="h-3 w-3 mr-1" />
              )}
              <span className={`text-xs ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}`}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className="p-2 rounded-full bg-primary/10">
          {icon}
        </div>
      </div>
    </div>
  );
};

export const StatisticsOverview: React.FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4">Performance Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Projects"
          value="24"
          change="+4 this month"
          trend="up"
          icon={<Briefcase className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title="Pending Reviews"
          value="7"
          change="-2 this week"
          trend="down"
          icon={<Clock className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title="Total Budget"
          value="$1.2M"
          change="+12% YTD"
          trend="up"
          icon={<DollarSign className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title="Team Members"
          value="16"
          change="Same as last month"
          trend="neutral"
          icon={<Users className="h-5 w-5 text-primary" />}
        />
      </div>
    </div>
  );
};
