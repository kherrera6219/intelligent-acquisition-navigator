
import React from 'react';
import { Button } from '@/components/ui/button';

interface CodeReviewHeaderProps {
  addIssue: () => void;
}

export const CodeReviewHeader: React.FC<CodeReviewHeaderProps> = ({ addIssue }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold">Frontend Code Review</h2>
        <p className="text-muted-foreground">Track and resolve codebase issues</p>
      </div>
      <div className="mt-4 md:mt-0">
        <Button onClick={addIssue}>Add New Issue</Button>
      </div>
    </div>
  );
};
