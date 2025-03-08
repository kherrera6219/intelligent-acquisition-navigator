
import React from 'react';
import { Proposal } from '@/types/proposals';
import { ProposalCard } from '@/components/proposals/ProposalCard';

export interface ProposalListProps {
  proposals: Proposal[];
  onProposalClick: (id: string) => void;
}

export const ProposalList: React.FC<ProposalListProps> = ({ proposals, onProposalClick }) => {
  if (proposals.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">No proposals found.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
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
