
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Proposal } from '@/types/proposals';

interface ProposalCardProps {
  proposal: Proposal;
  onClick: (proposal: Proposal) => void;
}

export const ProposalCard = React.memo(({ proposal, onClick }: ProposalCardProps) => {
  const handleClick = React.useCallback(() => {
    onClick(proposal);
  }, [proposal, onClick]);

  return (
    <Card 
      className="p-4 cursor-pointer hover:shadow-lg transition-shadow bg-card hover:bg-card/80 dark:bg-card/40 dark:hover:bg-card/60"
      onClick={handleClick}
    >
      <h3 className="font-bold text-base sm:text-lg">{proposal.title}</h3>
      <p className="text-muted-foreground text-sm mt-2">{proposal.description}</p>
      <div className="mt-2 flex justify-between items-center">
        <span className={cn(
          "px-2 py-1 rounded text-sm font-medium",
          proposal.status === 'PENDING' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100' :
          proposal.status === 'APPROVED' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' :
          'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'
        )}>
          {proposal.status}
        </span>
        <span className="text-sm text-muted-foreground">
          {new Date(proposal.submittedAt).toLocaleDateString()}
        </span>
      </div>
    </Card>
  );
});

ProposalCard.displayName = 'ProposalCard';
