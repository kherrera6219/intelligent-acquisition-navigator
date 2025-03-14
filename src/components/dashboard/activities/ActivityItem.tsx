
import React from 'react';
import { Clock } from 'lucide-react';
import { 
  TooltipProvider, 
  TooltipContent, 
  TooltipTrigger,
  Tooltip
} from '@/components/ui/tooltip';
import type { RecentActivity } from '@/types/dashboard';
import { formatActivityTime } from '@/utils/activityFormatters';

interface ActivityItemProps {
  activity: RecentActivity;
  index: number;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity, index }) => {
  const Icon = activity.icon;
  const time = formatActivityTime(activity.timestamp);
  
  return (
    <TooltipProvider key={index}>
      <div className="ms-timeline-item group" role="listitem">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="ms-timeline-content-wrapper">
              <div className="ms-timeline-icon">
                <Icon className="h-4 w-4 text-blue-400" aria-hidden="true" />
              </div>
              <div className="ms-timeline-content">
                <p className="ms-timeline-title">{activity.title}</p>
                <p className="ms-timeline-time flex items-center text-xs">
                  <Clock className="inline-block h-3 w-3 mr-1 text-gray-400" aria-hidden="true" />
                  {time.relative}
                  {activity.category && (
                    <span className="ml-2 px-1.5 py-0.5 bg-primary/10 text-primary/80 rounded text-[10px]">
                      {activity.category}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <div className="text-xs">
              <p className="font-semibold">{activity.title}</p>
              <p>{time.exact}</p>
              {activity.description && <p className="mt-1 text-gray-300">{activity.description}</p>}
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
