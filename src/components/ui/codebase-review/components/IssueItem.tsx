
import React from 'react';
import { Badge } from '@/components/ui/badge';

export interface IssueItemType {
  id: string;
  category: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  assignee?: string;
}

interface IssueItemProps {
  issue: IssueItemType;
  updateIssueStatus: (id: string, status: 'pending' | 'in-progress' | 'completed') => void;
}

export const IssueItem: React.FC<IssueItemProps> = ({ issue, updateIssueStatus }) => {
  // Get badge color based on severity
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 hover:bg-red-600';
      case 'high': return 'bg-orange-500 hover:bg-orange-600';
      case 'medium': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'low': return 'bg-blue-500 hover:bg-blue-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // Get status styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'in-progress': return 'text-blue-500';
      case 'pending': return 'text-gray-500';
      default: return '';
    }
  };
  
  return (
    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <Badge variant="outline">{issue.id}</Badge>
          <Badge className={getSeverityColor(issue.severity)}>
            {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
          </Badge>
          <Badge variant="outline">{issue.category}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <select
            className={`bg-background border border-input rounded-md px-3 py-1 text-xs ${getStatusStyle(issue.status)}`}
            value={issue.status}
            onChange={(e) => updateIssueStatus(issue.id, e.target.value as any)}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <h3 className="text-base font-medium">{issue.title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
      {issue.assignee && (
        <div className="mt-2 text-xs text-muted-foreground">
          Assigned to: {issue.assignee}
        </div>
      )}
    </div>
  );
};
