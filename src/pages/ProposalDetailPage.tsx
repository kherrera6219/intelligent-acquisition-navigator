
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { ProposalDetails } from '@/components/proposals/ProposalDetails';
import ProposalDetailsError from '@/components/proposals/ProposalDetailsError';
import ProposalDetailsLoading from '@/components/proposals/ProposalDetailsLoading';
import UniversalInternalHeader from '@/components/layout/UniversalInternalHeader';
import { InternalFooter } from '@/components/layout/InternalFooter';
import type { Proposal } from '@/types/proposals';

export default function ProposalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data
        if (id) {
          // Ensure the data conforms to the Proposal type
          const mockProposal: Proposal = {
            id,
            title: `Proposal ${id}`,
            description: `This is a detailed description for proposal ${id}. It contains more information about the proposal and its objectives. The proposal aims to address specific needs and provides a comprehensive solution.`,
            status: Math.random() > 0.3 ? 'APPROVED' : Math.random() > 0.5 ? 'PENDING' : 'REJECTED',
            submittedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(),
            submissionDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
            budget: Math.floor(Math.random() * 500000) + 50000,
            timeframe: Math.floor(Math.random() * 12) + 1,
            evaluations: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => ({
              id: `eval-${id}-${j}`,
              userId: `user-${j}`,
              userName: `Evaluator ${j + 1}`,
              comment: `This is evaluation comment ${j + 1} for proposal ${id}. It provides detailed feedback about the strengths and weaknesses of the proposal.`,
              rating: Math.floor(Math.random() * 5) + 1,
              createdAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(),
            })),
            attachments: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, j) => ({
              id: `att-${id}-${j}`,
              name: `Document-${j + 1}.pdf`,
              url: '#',
              type: 'application/pdf', // Add the required type property
            })),
          };
          
          setProposal(mockProposal);
        } else {
          throw new Error('Proposal ID is required');
        }

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load proposal details'));
        setIsLoading(false);
      }
    };

    fetchProposal();
  }, [id]);

  const handleBack = () => {
    navigate('/proposals');
  };

  return (
    <>
      <UniversalInternalHeader />
      {isLoading ? (
        <ProtectedPageLayout
          title="Proposal Details"
          description="Loading proposal information..."
          breadcrumbs={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Proposals', href: '/proposals' },
            { label: 'Details', href: `/proposals/${id}` }
          ]}
          isLoading={true}
        >
          <ProposalDetailsLoading />
        </ProtectedPageLayout>
      ) : error || !proposal ? (
        <ProtectedPageLayout
          title="Proposal Details"
          description="An error occurred loading the proposal"
          breadcrumbs={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Proposals', href: '/proposals' },
            { label: 'Details', href: `/proposals/${id}` }
          ]}
          error={error}
        >
          <ProposalDetailsError onBack={handleBack} error={error} />
        </ProtectedPageLayout>
      ) : (
        <ProtectedPageLayout
          title={proposal.title}
          description={`Proposal ID: ${proposal.id}`}
          breadcrumbs={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Proposals', href: '/proposals' },
            { label: 'Details', href: `/proposals/${id}` }
          ]}
        >
          <ProposalDetails proposal={proposal} handleBack={handleBack} />
        </ProtectedPageLayout>
      )}
      <InternalFooter />
    </>
  );
}
