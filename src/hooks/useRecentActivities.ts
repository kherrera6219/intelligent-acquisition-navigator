
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Activity } from '@/types/dashboard';
import { AlertCircle, FileText, Users, Clock, CheckCircle2 } from 'lucide-react';

type ActivityFilter = string | null;

export const useRecentActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filter, setFilter] = useState<ActivityFilter>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch activities
  const fetchActivities = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call - in a real app, this would be a fetch from an API
      const response = await new Promise<Activity[]>((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: '1',
              title: 'Contract Review Completed',
              description: 'Contract #12345 review completed by John Doe',
              timestamp: new Date().toISOString(),
              category: 'Contract',
              status: 'completed',
              user: 'John Doe',
              icon: <CheckCircle2 className="h-5 w-5 text-green-500" />
            },
            {
              id: '2',
              title: 'New Solicitation Created',
              description: 'Solicitation #67890 created by Jane Smith',
              timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
              category: 'Solicitation',
              status: 'pending',
              user: 'Jane Smith',
              icon: <FileText className="h-5 w-5 text-blue-500" />
            },
            {
              id: '3',
              title: 'Proposal Evaluation',
              description: 'Proposal #54321 evaluated by Team A',
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
              category: 'Proposal',
              status: 'in-progress',
              user: 'Team A',
              icon: <AlertCircle className="h-5 w-5 text-amber-500" />
            },
            {
              id: '4',
              title: 'Budget Approved',
              description: 'Budget for Project XYZ approved by Finance',
              timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
              category: 'Budget',
              status: 'completed',
              user: 'Finance Department',
              icon: <CheckCircle2 className="h-5 w-5 text-green-500" />
            },
            {
              id: '5',
              title: 'New Team Member Added',
              description: 'Sarah Johnson added to Project ABC',
              timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
              category: 'Team',
              status: 'completed',
              user: 'HR Department',
              icon: <Users className="h-5 w-5 text-indigo-500" />
            }
          ]);
        }, 800);
      });
      
      setActivities(response);
    } catch (err) {
      console.error('Failed to fetch activities:', err);
      setError('Failed to load activities. Please try again later.');
      
      toast({
        title: 'Error Loading Activities',
        description: 'Could not load activities. Please refresh the page.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Initial fetch
  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  // Filtered activities based on category filter
  const filteredActivities = filter
    ? activities.filter((activity) => activity.category === filter)
    : activities;

  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(activities.map((activity) => activity.category)));

  // Handle refresh manually
  const handleRefresh = () => {
    fetchActivities();
  };

  return {
    activities,
    filteredActivities,
    isLoading,
    error,
    filter,
    setFilter,
    categories,
    handleRefresh
  };
};
