
import React from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { ProposalDetails } from '@/components/proposals/ProposalDetails';
import { Proposal } from '@/types/proposals';

export default function ProposalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/proposals');
  };
  
  // Create a properly typed mock proposal object
  const mockProposal: Proposal = {
    id: id || '0',
    title: `Proposal ${id}`,
    description: 'Detailed proposal description would go here.',
    status: 'PENDING', // TypeScript knows this is valid because of the Proposal type
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    submissionDate: new Date().toISOString(), 
    budget: 100000,
    timeframe: 6,
    attachments: [],
    evaluations: []
  };
  
  return (
    <ProtectedPageLayout
      title={`Proposal Details: ${id}`}
      description="View and manage proposal details"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Proposals', href: '/proposals' },
        { label: `Proposal ${id}`, href: `/proposals/${id}` }
      ]}
    >
      <ProposalDetails proposal={mockProposal} handleBack={handleBack} />
    </ProtectedPageLayout>
  );
}
