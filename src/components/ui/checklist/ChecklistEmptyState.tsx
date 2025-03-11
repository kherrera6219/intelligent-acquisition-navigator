
import React from 'react';

export const ChecklistEmptyState: React.FC = () => {
  return (
    <div className="text-center py-12 border border-dashed border-gray-700 rounded-lg bg-gray-900/50">
      <p className="text-gray-400 mb-2">No checklist items available.</p>
    </div>
  );
};
