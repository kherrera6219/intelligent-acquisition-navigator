
import React from 'react';

interface ActivityItemProps { 
  title: string; 
  time: string; 
  icon: React.ElementType; 
  color?: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ 
  title, 
  time, 
  icon: Icon, 
  color = "text-blue-500" 
}) => (
  <div className="flex items-start gap-3 p-3 rounded-md hover:bg-white/5 transition-colors">
    <div className={`w-8 h-8 rounded-full bg-white/5 ${color} flex items-center justify-center flex-shrink-0`}>
      <Icon className="h-4 w-4" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{time}</p>
    </div>
  </div>
);
