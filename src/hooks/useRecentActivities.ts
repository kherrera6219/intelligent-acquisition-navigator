
import { useState, useEffect, useCallback } from 'react';
import { Activity } from '@/components/dashboard/activities/ActivityList';
import { FileText, Briefcase, PieChart, HelpCircle, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

// Mock data for recent activities
const mockActivities: Activity[] = [
  { 
    id: '1',
    title: "Document 'RFP-2023-001' updated", 
    description: "Changes to technical requirements section",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    icon: <FileText className="h-5 w-5 text-blue-500" />,
    status: 'info' 
  },
  { 
    id: '2',
    title: "New proposal submitted", 
    description: "Proposal XYZ-2023-42 by Acme Corp",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    icon: <Briefcase className="h-5 w-5 text-green-500" />,
    status: 'success'
  },
  { 
    id: '3',
    title: "Compliance issue detected", 
    description: "Missing documentation in contract #DC-2023-105",
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000), // 36 hours ago
    icon: <AlertCircle className="h-5 w-5 text-red-500" />,
    status: 'error'
  },
  { 
    id: '4',
    title: "Analytics report generated", 
    description: "Q2 Performance Analysis available",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    icon: <PieChart className="h-5 w-5 text-purple-500" />,
    status: 'info'
  },
  { 
    id: '5',
    title: "Knowledge base article viewed", 
    description: "FAR Compliance Guidelines accessed 15 times",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    icon: <HelpCircle className="h-5 w-5 text-amber-500" />,
    status: 'info'
  },
  { 
    id: '6',
    title: "Meeting scheduled: Project Review", 
    description: "Tuesday, 10:00 AM with Procurement Team",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    icon: <Clock className="h-5 w-5 text-indigo-500" />,
    status: 'info'
  },
  { 
    id: '7',
    title: "Contract approved", 
    description: "Service agreement with DataTech Solutions",
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    status: 'success'
  }
];

export const useRecentActivities = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  
  // Extract unique categories from activities for filtering
  const categories = [...new Set(mockActivities.map(activity => activity.status))];
  
  // Filter activities based on selected category
  const filteredActivities = filter 
    ? activities.filter(activity => activity.status === filter)
    : activities;
  
  // Load activities
  const loadActivities = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setActivities(mockActivities);
    } catch (err) {
      console.error('Error loading activities:', err);
      setError('Failed to load recent activities. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Refresh activities
  const handleRefresh = () => {
    loadActivities();
  };
  
  // Load activities on initial render
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);
  
  return {
    isLoading,
    error,
    activities,
    filter,
    setFilter,
    filteredActivities,
    categories,
    handleRefresh
  };
};
