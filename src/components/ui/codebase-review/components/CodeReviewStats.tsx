
import React from 'react';
import { Card } from '@/components/ui/card';

interface CodeReviewStatsProps {
  total: number;
  completed: number;
  inProgress: number;
  completionPercentage: number;
}

export const CodeReviewStats: React.FC<CodeReviewStatsProps> = ({
  total,
  completed,
  inProgress,
  completionPercentage
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 flex flex-col items-center justify-center bg-primary/10">
          <span className="text-2xl font-bold">{total}</span>
          <span className="text-sm text-muted-foreground">Total Issues</span>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center bg-green-500/10">
          <span className="text-2xl font-bold text-green-500">{completed}</span>
          <span className="text-sm text-muted-foreground">Completed</span>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center bg-blue-500/10">
          <span className="text-2xl font-bold text-blue-500">{inProgress}</span>
          <span className="text-sm text-muted-foreground">In Progress</span>
        </Card>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Progress: {completionPercentage}%</span>
          <span className="text-sm text-muted-foreground">{completed}/{total} completed</span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </div>
    </>
  );
};

import { Progress } from "@/components/ui/progress";
