
import React from 'react';
import { Card } from '@/components/ui/universal/Card';
import { FileText, CheckCircle, AlertCircle, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Types for activity items
type ActivityStatus = 'completed' | 'pending' | 'alert';

interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  status: ActivityStatus;
  user: string;
  type: 'proposal' | 'review' | 'document' | 'approval';
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    title: 'Procurement proposal approved',
    timestamp: '2 hours ago',
    status: 'completed',
    user: 'Michael Chen',
    type: 'approval'
  },
  {
    id: '2',
    title: 'Vendor contract due for review',
    timestamp: '1 day ago',
    status: 'alert',
    user: 'Sarah Johnson',
    type: 'document'
  },
  {
    id: '3',
    title: 'New RFP submission received',
    timestamp: '2 days ago',
    status: 'pending',
    user: 'Alex Rodriguez',
    type: 'proposal'
  },
  {
    id: '4',
    title: 'Quarterly compliance review',
    timestamp: '3 days ago',
    status: 'pending',
    user: 'Jamie Williams',
    type: 'review'
  }
];

const ActivityIcon: React.FC<{ type: ActivityItem['type'] }> = ({ type }) => {
  switch (type) {
    case 'proposal':
      return <FileText className="h-4 w-4" />;
    case 'review':
      return <Clock className="h-4 w-4" />;
    case 'document':
      return <FileText className="h-4 w-4" />;
    case 'approval':
      return <CheckCircle className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const StatusIcon: React.FC<{ status: ActivityStatus }> = ({ status }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-success" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-amber-500" />;
    case 'alert':
      return <AlertCircle className="h-4 w-4 text-destructive" />;
    default:
      return null;
  }
};

const ActivityCard: React.FC<{ activity: ActivityItem }> = ({ activity }) => {
  return (
    <div className="py-3 border-b border-border/30 last:border-0">
      <div className="flex items-start gap-3">
        <div className={`p-1.5 rounded-full 
          ${activity.status === 'completed' ? 'bg-success/10' : 
            activity.status === 'pending' ? 'bg-amber-500/10' : 'bg-destructive/10'}`
        }>
          <ActivityIcon type={activity.type} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm truncate">{activity.title}</h4>
            <StatusIcon status={activity.status} />
          </div>
          <div className="flex items-center gap-2 mt-1">
            <User className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{activity.user}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export const DashboardRecentActivity: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b border-border/30">
        <h2 className="font-medium">Recent Activity</h2>
      </div>
      <div className="px-4">
        {mockActivities.map(activity => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
      <div className="p-4 border-t border-border/30">
        <Button 
          variant="outline" 
          className="w-full text-sm"
          onClick={() => navigate('/activity')}
        >
          View All Activity
        </Button>
      </div>
    </Card>
  );
};
