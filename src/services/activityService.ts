
import { Activity } from '@/types/dashboard';

/**
 * Mock data for recent activities
 * In a real application, this would come from an API call
 */
const mockActivities: Omit<Activity, 'icon' | 'status'>[] = [
  {
    id: '1',
    title: 'Document Updated',
    description: 'Financial report Q1 2025 updated',
    timestamp: new Date().toISOString(),
    category: 'document',
    user: {
      name: 'Alex Johnson',
      avatar: '/avatars/alex.jpg'
    }
  },
  {
    id: '2',
    title: 'New Message',
    description: 'You received a message from Sarah Smith',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    category: 'message',
    user: {
      name: 'Sarah Smith',
      avatar: '/avatars/sarah.jpg'
    }
  },
  {
    id: '3',
    title: 'New Document Created',
    description: 'Project proposal added to the library',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    category: 'creation',
    user: {
      name: 'Michael Chen',
      avatar: '/avatars/michael.jpg'
    }
  },
  {
    id: '4',
    title: 'Approval Needed',
    description: 'Budget request waiting for approval',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    category: 'approval',
    user: {
      name: 'Jessica Williams',
      avatar: '/avatars/jessica.jpg'
    }
  },
  {
    id: '5',
    title: 'System Warning',
    description: 'Storage capacity reaching limit',
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    category: 'warning',
    user: {
      name: 'System',
      avatar: '/avatars/system.jpg'
    }
  }
];

/**
 * Fetch recent activities
 * @param limit Number of activities to return
 * @returns Promise with activities
 */
export const fetchRecentActivities = async (limit: number = 5): Promise<Omit<Activity, 'icon' | 'status'>[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return the requested number of activities
  return mockActivities.slice(0, limit);
};

/**
 * Format timestamp to a human-readable format
 * @param timestamp ISO string timestamp
 * @returns Formatted time string
 */
export const formatActivityTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return date.toLocaleDateString();
  }
};
