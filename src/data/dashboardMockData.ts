
import { FileText, PieChart, Users, HelpCircle, Briefcase, Clock } from 'lucide-react';
import React from 'react';

// Recent activity data
export const recentActivities = [
  { 
    title: "Document 'RFP-2023-001' updated", 
    time: "2 hours ago", 
    icon: <FileText className="h-4 w-4 text-blue-400" />, 
  },
  { 
    title: "New proposal submitted", 
    time: "Yesterday", 
    icon: <Briefcase className="h-4 w-4 text-green-400" />, 
  },
  { 
    title: "Analytics report generated", 
    time: "2 days ago", 
    icon: <PieChart className="h-4 w-4 text-purple-400" />, 
  },
  { 
    title: "Knowledge base article viewed", 
    time: "3 days ago", 
    icon: <HelpCircle className="h-4 w-4 text-amber-400" />, 
  },
  { 
    title: "Meeting scheduled: Project Review", 
    time: "5 days ago", 
    icon: <Clock className="h-4 w-4 text-indigo-400" />, 
  }
];
