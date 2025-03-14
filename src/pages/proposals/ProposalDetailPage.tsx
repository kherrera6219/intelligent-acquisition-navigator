
import React from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { useParams } from 'react-router-dom';
import { ProposalDetails } from '@/components/proposals/ProposalDetails';

export default function ProposalDetailPage() {
  const { id } = useParams<{ id: string }>();
  
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
      <ProposalDetails id={id || ''} />
    </ProtectedPageLayout>
  );
}
