
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { useToast } from '@/hooks/use-toast';
import { useOptimisticQuery } from '@/hooks/useOptimisticQuery';
import ProposalDetailsLoading from '@/components/proposals/ProposalDetailsLoading';
import ProposalDetailsError from '@/components/proposals/ProposalDetailsError';
import { ProposalDetails } from '@/components/proposals/ProposalDetails';
import type { Proposal } from '@/types/proposals';

const ProposalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Handle navigation back to proposals list
  const handleBack = () => {
    navigate('/proposals');
  };

  // Fetch proposal details
  const { data: proposal, isLoading, error } = useOptimisticQuery<Proposal>({
    url: `/api/proposals/${id}`,
    queryKey: ['proposal', id],
    resourceType: 'proposal',
    retryCount: 2,
  });

  // Show error notification
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch proposal details",
        variant: "destructive"
      });
    }
  }, [error, toast]);

  return (
    <main className="flex-grow">
      <Container>
        <div className="space-y-6 py-6">
          <PageHeader
            title="Proposal Details"
            description="View and manage proposal information"
            action={
              <button 
                onClick={handleBack}
                className="text-sm text-primary hover:underline"
              >
                Back to Proposals
              </button>
            }
          />
          
          {isLoading ? (
            <ProposalDetailsLoading />
          ) : error || !proposal ? (
            <ProposalDetailsError 
              error={error instanceof Error ? error.message : "Failed to fetch proposal details"} 
              handleBack={handleBack} 
            />
          ) : (
            <ProposalDetails proposal={proposal} handleBack={handleBack} />
          )}
        </div>
      </Container>
    </main>
  );
};

export default ProposalDetailPage;
