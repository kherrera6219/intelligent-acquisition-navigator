
import React from 'react';
import { IssueItem, IssueItemType } from './IssueItem';

interface IssueListProps {
  issues: IssueItemType[];
  updateIssueStatus: (id: string, status: 'pending' | 'in-progress' | 'completed') => void;
}

export const IssueList: React.FC<IssueListProps> = ({ issues, updateIssueStatus }) => {
  if (issues.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No issues found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <IssueItem 
          key={issue.id} 
          issue={issue} 
          updateIssueStatus={updateIssueStatus} 
        />
      ))}
    </div>
  );
};
