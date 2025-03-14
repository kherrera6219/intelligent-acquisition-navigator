
import { Activity } from '@/types/dashboard';
import { formatDistanceToNow } from 'date-fns';

// Mock data for activities
const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Document updated',
    description: 'Contract proposal was updated',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    category: 'Document',
    user: {
      name: 'John Doe',
      avatar: '/avatar-1.png'
    },
    status: 'info'
  },
  {
    id: '2',
    title: 'Meeting scheduled',
    description: 'Team meeting scheduled for tomorrow',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    category: 'Calendar',
    user: {
      name: 'Jane Smith',
      avatar: '/avatar-2.png'
    },
    status: 'success'
  },
  {
    id: '3',
    title: 'Alert triggered',
    description: 'System alert for server resources',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    category: 'System',
    user: {
      name: 'System',
      avatar: '/system-avatar.png'
    },
    status: 'warning'
  },
  {
    id: '4',
    title: 'Task completed',
    description: 'Deployment task was completed successfully',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    category: 'Task',
    user: {
      name: 'Alex Johnson',
      avatar: '/avatar-3.png'
    },
    status: 'success'
  },
  {
    id: '5',
    title: 'Error occurred',
    description: 'Database connection error',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    category: 'System',
    user: {
      name: 'System',
      avatar: '/system-avatar.png'
    },
    status: 'error'
  }
];

// Function to fetch activities
export const fetchActivities = async (): Promise<Activity[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockActivities;
};

// Format timestamp for display
export const formatActivityTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true });
};
