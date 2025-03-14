
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ImprovementChecklist } from '@/components/ui/checklist/ImprovementChecklist';
import { useToast } from '@/hooks/use-toast';
import { initialChecklist } from '@/data/initialChecklist';

interface IssueItem {
  id: string;
  category: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  assignee?: string;
}

export const CodeReviewChecklist: React.FC = () => {
  const { toast } = useToast();
  const [issues, setIssues] = useState<IssueItem[]>([
    {
      id: 'TSC-001',
      category: 'TypeScript',
      title: 'Fix build errors in useRecentActivities.ts',
      description: 'The file has syntax errors causing build failures.',
      severity: 'critical',
      status: 'completed',
    },
    {
      id: 'TSC-002',
      category: 'Components',
      title: 'ThemeToggle component missing',
      description: 'ThemeToggle component was referenced but not implemented.',
      severity: 'high',
      status: 'completed',
    },
    {
      id: 'PERF-001',
      category: 'Performance',
      title: 'Code splitting and lazy loading',
      description: 'Implement code splitting and lazy loading for all page components.',
      severity: 'medium',
      status: 'pending',
    },
    {
      id: 'ACC-001',
      category: 'Accessibility',
      title: 'ARIA labels missing',
      description: 'Add appropriate ARIA labels to interactive elements.',
      severity: 'high',
      status: 'pending',
    },
    {
      id: 'UI-001',
      category: 'UI',
      title: 'Responsive design improvements',
      description: 'Ensure all components work well on mobile devices.',
      severity: 'medium',
      status: 'pending',
    },
    {
      id: 'ERR-001',
      category: 'Error Handling',
      title: 'Global error boundary',
      description: 'Implement a global error boundary for better error recovery.',
      severity: 'high',
      status: 'in-progress',
    },
    {
      id: 'SEC-001',
      category: 'Security',
      title: 'Input sanitization',
      description: 'Ensure all user inputs are properly sanitized.',
      severity: 'high',
      status: 'pending',
    },
    {
      id: 'TEST-001',
      category: 'Testing',
      title: 'Unit tests coverage',
      description: 'Improve unit test coverage for critical components.',
      severity: 'medium',
      status: 'pending',
    },
    {
      id: 'STATE-001',
      category: 'State Management',
      title: 'Optimize React Query usage',
      description: 'Ensure proper caching and error handling in React Query implementations.',
      severity: 'medium',
      status: 'pending',
    },
    {
      id: 'DOC-001',
      category: 'Documentation',
      title: 'Component documentation',
      description: 'Add better documentation for shared components.',
      severity: 'low',
      status: 'pending',
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed' | string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Calculate completion statistics
  const total = issues.length;
  const completed = issues.filter(issue => issue.status === 'completed').length;
  const inProgress = issues.filter(issue => issue.status === 'in-progress').length;
  const pending = issues.filter(issue => issue.status === 'pending').length;
  const completionPercentage = Math.round((completed / total) * 100);

  // Get all unique categories
  const categories = ['all', ...new Set(issues.map(issue => issue.category))];

  // Filter issues
  const filteredIssues = issues.filter(issue => {
    const statusMatch = filter === 'all' || issue.status === filter;
    const categoryMatch = categoryFilter === 'all' || issue.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  // Update issue status
  const updateIssueStatus = (id: string, status: 'pending' | 'in-progress' | 'completed') => {
    setIssues(prevIssues => 
      prevIssues.map(issue => 
        issue.id === id ? { ...issue, status } : issue
      )
    );

    toast({
      title: 'Issue Updated',
      description: `Issue ${id} status changed to ${status}`,
    });
  };

  // Add a new issue
  const addIssue = () => {
    // In a real app, this would open a form to create a new issue
    const newIssue: IssueItem = {
      id: `ISSUE-${issues.length + 1}`,
      category: 'Other',
      title: 'New Issue',
      description: 'Description of the new issue.',
      severity: 'medium',
      status: 'pending',
    };

    setIssues(prevIssues => [...prevIssues, newIssue]);
    
    toast({
      title: 'Issue Added',
      description: 'New issue has been added to the checklist.',
    });
  };

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
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Frontend Code Review</h2>
            <p className="text-muted-foreground">Track and resolve codebase issues</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={addIssue}>Add New Issue</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 flex flex-col items-center justify-center bg-primary/10">
            <span className="text-2xl font-bold">{total}</span>
            <span className="text-sm text-muted-foreground">Total Issues</span>
          </Card>
          <Card className="p-4 flex flex-col items-center justify-center bg-green-500/10">
            <span className="text-2xl font-bold text-green-500">{completed}</span>
            <span className="text-sm text-muted-foreground">Completed</span>
          </Card>
          <Card className="p-4 flex flex-col items-center justify-center bg-blue-500/10">
            <span className="text-2xl font-bold text-blue-500">{inProgress}</span>
            <span className="text-sm text-muted-foreground">In Progress</span>
          </Card>
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Progress: {completionPercentage}%</span>
            <span className="text-sm text-muted-foreground">{completed}/{total} completed</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex items-center mr-4">
            <Label htmlFor="status-filter" className="mr-2">Status:</Label>
            <select 
              id="status-filter"
              className="bg-background border border-input rounded-md px-3 py-1 text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex items-center">
            <Label htmlFor="category-filter" className="mr-2">Category:</Label>
            <select 
              id="category-filter"
              className="bg-background border border-input rounded-md px-3 py-1 text-sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredIssues.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No issues found matching your filters.</p>
            </div>
          ) : (
            filteredIssues.map((issue) => (
              <div key={issue.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
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
            ))
          )}
        </div>
      </Card>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Project Improvement Checklist</h3>
        <ImprovementChecklist />
      </div>
    </div>
  );
};

export default CodeReviewChecklist;
