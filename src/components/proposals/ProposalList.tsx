
import React from 'react';
import { Proposal } from '@/types/proposals';
import { ProposalCard } from '@/components/proposals/ProposalCard';
import { LoadingState } from '@/components/ui/universal/LoadingState';

export interface ProposalListProps {
  proposals: Proposal[];
  onProposalClick: (id: string) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export const ProposalList: React.FC<ProposalListProps> = ({ 
  proposals, 
  onProposalClick, 
  isLoading = false,
  emptyMessage = "No proposals found."
}) => {
  if (isLoading) {
    return <LoadingState variant="skeleton" skeletonCount={3} />;
  }
  
  if (proposals.length === 0) {
    return (
      <div className="text-center py-12 bg-white/5 rounded-lg border border-white/10">
        <p className="text-gray-400">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div 
      className="space-y-4 animate-in fade-in-50"
      role="list"
      aria-label="Proposals list"
    >
      {proposals.map((proposal) => (
        <ProposalCard 
          key={proposal.id} 
          proposal={proposal} 
          onClick={() => onProposalClick(proposal.id)} 
        />
      ))}
    </div>
  );
};
