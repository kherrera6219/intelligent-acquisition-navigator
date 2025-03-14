
import React from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { ProposalList } from '@/components/proposals/ProposalList';

export default function ProposalsPage() {
  return (
    <ProtectedPageLayout
      title="Proposals"
      description="Manage and review all proposals"
    >
      <ProposalList />
    </ProtectedPageLayout>
  );
}
