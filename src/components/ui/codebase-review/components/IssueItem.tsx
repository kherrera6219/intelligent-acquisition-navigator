
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Clock, 
  ArrowRight 
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export type IssueItemType = {
  id: string;
  category: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
};

interface IssueItemProps {
  issue: IssueItemType;
  updateIssueStatus: (id: string, status: 'pending' | 'in-progress' | 'completed') => void;
}

export const IssueItem: React.FC<IssueItemProps> = ({ issue, updateIssueStatus }) => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'medium':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'low':
        return <Info className="h-5 w-5 text-gray-400" />;
      default:
        return <Info className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <ArrowRight className="h-5 w-5 text-gray-400" />;
      default:
        return <ArrowRight className="h-5 w-5 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'medium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'low':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400';
    }
  };

  return (
    <Card className="p-4 transition-all hover:shadow-md">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {getSeverityIcon(issue.severity)}
            <h3 className="font-medium">{issue.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              {issue.id}
            </Badge>
            <Badge className={`text-xs ${getSeverityColor(issue.severity)}`}>
              {issue.severity}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {issue.category}
            </Badge>
          </div>
        </div>
        <div className="min-w-[140px]">
          <div className="flex items-center gap-2 mb-2">
            {getStatusIcon(issue.status)}
            <span className="text-sm font-medium capitalize">{issue.status}</span>
          </div>
          <Select
            defaultValue={issue.status}
            onValueChange={(value) => 
              updateIssueStatus(
                issue.id, 
                value as 'pending' | 'in-progress' | 'completed'
              )
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};
