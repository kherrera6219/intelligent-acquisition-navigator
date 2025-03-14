
import React from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface ChecklistCompletedProps {
  show: boolean;
}

export const ChecklistCompleted: React.FC<ChecklistCompletedProps> = ({
  show
}) => {
  if (!show) {
    return null;
  }

  return (
    <Card className="mt-8 p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-200 dark:border-green-900">
      <div className="flex items-center justify-center">
        <Sparkles className="h-6 w-6 text-green-500 mr-2" />
        <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">All tasks completed!</h3>
      </div>
      <p className="text-center mt-2 text-green-700 dark:text-green-300">
        Great job! You've completed all the tasks in the checklist.
      </p>
    </Card>
  );
};
