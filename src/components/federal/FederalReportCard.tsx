
import React from 'react';
import { Card } from '@/components/ui/universal/Card';
import { AlertCircle, CheckCircle, Clock, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ReportCardProps {
  title: string;
  score: number;
  status: 'pending' | 'completed' | 'review' | 'approved';
  confidenceScore?: number;
  lastUpdated?: string;
  className?: string;
  onClick?: () => void;
}

export const FederalReportCard: React.FC<ReportCardProps> = ({
  title,
  score,
  status,
  confidenceScore = 0,
  lastUpdated,
  className,
  onClick,
}) => {
  // Status icon mapping
  const statusIcons = {
    pending: <Clock className="h-5 w-5 text-amber-500" />,
    completed: <CheckCircle className="h-5 w-5 text-green-500" />,
    review: <AlertCircle className="h-5 w-5 text-blue-500" />,
    approved: <ThumbsUp className="h-5 w-5 text-green-600" />
  };

  // Status text mapping
  const statusText = {
    pending: 'Pending',
    completed: 'Completed',
    review: 'Under Review',
    approved: 'Approved'
  };

  // Calculate score color
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-amber-500';
    return 'text-red-500';
  };

  // Calculate confidence indicator
  const getConfidenceIndicator = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-500';
    if (confidence >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <Card 
      variant="metal" 
      hoverable={!!onClick} 
      onClick={onClick} 
      className={cn("p-4", className)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold line-clamp-2 text-white">{title}</h3>
        <div className="flex items-center gap-1 text-sm text-gray-300">
          {statusIcons[status]}
          <span>{statusText[status]}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-400">Score</span>
          <span className={cn("text-2xl font-bold", getScoreColor(score))}>
            {score}%
          </span>
        </div>

        {confidenceScore > 0 && (
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-gray-400">AI Confidence</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-2 bg-gray-700 rounded-full">
                <div 
                  className={cn("h-2 rounded-full", getConfidenceIndicator(confidenceScore))}
                  style={{ width: `${confidenceScore}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-300">{confidenceScore}%</span>
            </div>
          </div>
        )}
      </div>

      {lastUpdated && (
        <div className="text-xs text-gray-400">
          Last updated: {lastUpdated}
        </div>
      )}
    </Card>
  );
};
