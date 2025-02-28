
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();
  
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

  // Show loading state
  if (isLoading) {
    return <ProposalDetailsLoading />;
  }

  // Show error state
  if (error || !proposal) {
    return (
      <ProposalDetailsError 
        error={error instanceof Error ? error.message : "Failed to fetch proposal details"} 
        handleBack={handleBack} 
      />
    );
  }

  // Show proposal details
  return <ProposalDetails proposal={proposal} handleBack={handleBack} />;
};

export default ProposalDetailPage;
