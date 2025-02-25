
import React from 'react';
import { ProposalCard } from './ProposalCard';
import type { Proposal } from '@/types/proposals';

interface ProposalListProps {
  proposals: Proposal[];
  onProposalClick: (proposal: Proposal) => void;
}

export const ProposalList: React.FC<ProposalListProps> = ({ proposals, onProposalClick }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {proposals.map((proposal) => (
        <ProposalCard
          key={proposal.id}
          proposal={proposal}
          onClick={onProposalClick}
        />
      ))}
    </div>
  );
};
