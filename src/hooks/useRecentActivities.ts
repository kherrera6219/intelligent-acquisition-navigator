
import { useState, useEffect } from 'react';
import { Activity } from '@/types/dashboard';
import { FileText, Code, MessageSquare, GitPullRequest, Calendar } from 'lucide-react';

type ActivityCategory = 'document' | 'code' | 'message' | 'pull-request' | 'calendar';

// Mock activity data - in a real app, this would come from an API
const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Updated proposal document',
    description: 'Made revisions to the federal acquisition proposal',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    category: 'document',
    user: {
      name: 'Alex Johnson',
      avatar: '/avatars/alex.jpg'
    }
  },
  {
    id: '2',
    title: 'Commented on PR #342',
    description: 'Added feedback on the new compliance feature',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    category: 'pull-request',
    user: {
      name: 'Morgan Lee',
      avatar: '/avatars/morgan.jpg'
    }
  },
  {
    id: '3',
    title: 'Scheduled meeting with procurement team',
    description: 'Review of Q3 acquisition strategy',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    category: 'calendar',
    user: {
      name: 'Jamie Smith',
      avatar: '/avatars/jamie.jpg'
    }
  },
  {
    id: '4',
    title: 'Added comments to contract',
    description: 'Legal review of service agreement terms',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    category: 'document',
    user: {
      name: 'Taylor Wilson',
      avatar: '/avatars/taylor.jpg'
    }
  },
  {
    id: '5',
    title: 'Submitted code review',
    description: 'Reviewed changes to the compliance validation module',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
    category: 'code',
    user: {
      name: 'Jordan Rivers',
      avatar: '/avatars/jordan.jpg'
    }
  }
];

// Helper function to get icon by activity category
const getActivityIcon = (category: ActivityCategory) => {
  switch (category) {
    case 'document':
      return <FileText className="text-blue-500" />;
    case 'code':
      return <Code className="text-green-500" />;
    case 'message':
      return <MessageSquare className="text-purple-500" />;
    case 'pull-request':
      return <GitPullRequest className="text-orange-500" />;
    case 'calendar':
      return <Calendar className="text-red-500" />;
    default:
      return <FileText className="text-gray-500" />;
  }
};

export const useRecentActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setActivities(mockActivities);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch activities'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return {
    activities,
    isLoading,
    error,
    getActivityIcon
  };
};
