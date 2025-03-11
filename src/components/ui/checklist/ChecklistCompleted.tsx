
import React from 'react';

interface ChecklistCompletedProps {
  show: boolean;
}

export const ChecklistCompleted: React.FC<ChecklistCompletedProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
      <h3 className="text-green-400 font-medium mb-2">All items completed! 🎉</h3>
      <p className="text-sm text-gray-400">Great job! You've completed all improvement tasks.</p>
    </div>
  );
};
