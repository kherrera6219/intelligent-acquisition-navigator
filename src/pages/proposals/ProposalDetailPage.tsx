
import React from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { ProposalDetails } from '@/components/proposals/ProposalDetails';

export default function ProposalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // This is a temporary function until we implement the actual data fetching
  const handleBack = () => {
    navigate('/proposals');
  };
  
  // In a real implementation, we would fetch the proposal details here
  // For now, we'll use a simple mock
  const mockProposal = {
    id: id || '0',
    title: `Proposal ${id}`,
    description: 'Detailed proposal description would go here.',
    status: 'PENDING',
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
