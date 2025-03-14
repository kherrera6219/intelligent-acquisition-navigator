
import React, { useState } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { ProposalList } from '@/components/proposals/ProposalList';
import { useNavigate } from 'react-router-dom';
import { Proposal } from '@/types/proposals';

export default function ProposalsPage() {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: '1',
      title: 'Proposal 1',
      description: 'Description for proposal 1',
      status: 'PENDING',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submissionDate: new Date().toISOString(),
      budget: 100000,
      timeframe: 6,
      attachments: [],
      evaluations: []
    },
    {
      id: '2',
      title: 'Proposal 2',
      description: 'Description for proposal 2',
      status: 'APPROVED',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submissionDate: new Date().toISOString(),
      budget: 200000,
      timeframe: 12,
      attachments: [],
      evaluations: []
    }
  ]);
  
  const handleProposalClick = (id: string) => {
    navigate(`/proposals/${id}`);
  };
  
  return (
    <ProtectedPageLayout
      title="Proposals"
      description="Manage and review all proposals"
    >
      <ProposalList 
        proposals={proposals} 
        onProposalClick={handleProposalClick}
        emptyMessage="No proposals found."
      />
    </ProtectedPageLayout>
  );
}
