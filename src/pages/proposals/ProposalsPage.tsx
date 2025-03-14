
import React, { useState } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { ProposalList } from '@/components/proposals/ProposalList';
import { useNavigate } from 'react-router-dom';
import { Proposal } from '@/types/proposals';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import UniversalInternalHeader from '@/components/layout/UniversalInternalHeader';
import { InternalFooter } from '@/components/layout/InternalFooter';

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
  
  const handleNewProposal = () => {
    navigate('/proposals/new');
  };
  
  return (
    <>
      <UniversalInternalHeader />
      <ProtectedPageLayout
        title="Proposals"
        description="Manage and review all proposals"
        action={
          <Button 
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={handleNewProposal}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Proposal
          </Button>
        }
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Proposals', href: '/proposals' }
        ]}
      >
        <ProposalList 
          proposals={proposals} 
          onProposalClick={handleProposalClick}
          emptyMessage="No proposals found."
        />
      </ProtectedPageLayout>
      <InternalFooter />
    </>
  );
}
