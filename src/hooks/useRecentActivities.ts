
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Activity } from '@/types/dashboard';
import { FileText, MessageSquare, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export const useRecentActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        // Fetch activities from Supabase
        const { data, error } = await supabase
          .from('activities')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(5);

        if (error) throw error;

        if (data) {
          // Transform the data to match our Activity type
          const formattedActivities: Activity[] = data.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description || '',
            timestamp: item.timestamp,
            category: item.category || 'general',
            status: item.status as 'pending' | 'in-progress' | 'completed',
            user: item.user_id || 'Anonymous',
            icon: getIconForActivity(item.icon_name || 'FileText')
          }));

          setActivities(formattedActivities);
        }
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        
        // Fallback to sample data if there's an error
        setActivities([
          {
            id: '1',
            title: 'Document reviewed',
            description: 'Federal acquisition document review completed',
            timestamp: new Date().toISOString(),
            category: 'document',
            status: 'completed',
            user: 'John Doe',
            icon: <FileText className="text-blue-500" />
          },
          {
            id: '2',
            title: 'New comment on proposal',
            description: 'User commented on the federal procurement proposal',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            category: 'comment',
            status: 'pending',
            user: 'Jane Smith',
            icon: <MessageSquare className="text-green-500" />
          },
          {
            id: '3',
            title: 'Task completed',
            description: 'Procurement review task marked as complete',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            category: 'task',
            status: 'completed',
            user: 'Mark Johnson',
            icon: <CheckCircle className="text-green-500" />
          },
          {
            id: '4',
            title: 'Deadline approaching',
            description: 'Proposal submission deadline in 48 hours',
            timestamp: new Date(Date.now() - 14400000).toISOString(),
            category: 'deadline',
            status: 'in-progress',
            user: 'System',
            icon: <Clock className="text-yellow-500" />
          },
          {
            id: '5',
            title: 'Compliance issue detected',
            description: 'Possible FAR compliance issue in document #12345',
            timestamp: new Date(Date.now() - 28800000).toISOString(),
            category: 'alert',
            status: 'pending',
            user: 'Compliance System',
            icon: <AlertCircle className="text-red-500" />
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getIconForActivity = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare':
        return <MessageSquare className="text-green-500" />;
      case 'CheckCircle':
        return <CheckCircle className="text-green-500" />;
      case 'Clock':
        return <Clock className="text-yellow-500" />;
      case 'AlertCircle':
        return <AlertCircle className="text-red-500" />;
      case 'FileText':
      default:
        return <FileText className="text-blue-500" />;
    }
  };

  return { activities, loading, error };
};
