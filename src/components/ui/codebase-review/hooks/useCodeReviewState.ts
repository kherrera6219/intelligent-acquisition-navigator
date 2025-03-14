
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { IssueItemType } from '../components/IssueItem';

export const useCodeReviewState = (initialIssues: IssueItemType[]) => {
  const { toast } = useToast();
  const [issues, setIssues] = useState<IssueItemType[]>(initialIssues);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed' | string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Calculate completion statistics
  const total = issues.length;
  const completed = issues.filter(issue => issue.status === 'completed').length;
  const inProgress = issues.filter(issue => issue.status === 'in-progress').length;
  const pending = issues.filter(issue => issue.status === 'pending').length;
  const completionPercentage = Math.round((completed / total) * 100);

  // Get all unique categories
  const categories = ['all', ...Array.from(new Set(issues.map(issue => issue.category)))];

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
    const newIssue: IssueItemType = {
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

  return {
    issues,
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    total,
    completed,
    inProgress,
    pending,
    completionPercentage,
    categories,
    filteredIssues,
    updateIssueStatus,
    addIssue
  };
};
