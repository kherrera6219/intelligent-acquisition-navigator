
import React, { useMemo } from 'react';
import { Proposal } from '@/types/proposals';
import { ProposalCard } from '@/components/proposals/ProposalCard';
import { LoadingState } from '@/components/ui/universal/LoadingState';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ProposalListProps {
  proposals: Proposal[];
  onProposalClick: (id: string) => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  emptyMessage?: string;
  retryFunction?: () => void;
  isRetrying?: boolean;
}

export const ProposalList: React.FC<ProposalListProps> = ({ 
  proposals, 
  onProposalClick, 
  isLoading = false,
  isError = false,
  error = null,
  emptyMessage = "No proposals found.",
  retryFunction,
  isRetrying = false
}) => {
  // Memoize the list to prevent unnecessary re-renders
  const memoizedProposals = useMemo(() => {
    return proposals.map((proposal) => (
      <ProposalCard 
        key={proposal.id} 
        proposal={proposal} 
        onClick={() => onProposalClick(proposal.id)} 
      />
    ));
  }, [proposals, onProposalClick]);

  if (isLoading) {
    return <LoadingState variant="skeleton" skeletonCount={3} />;
  }
  
  if (isError) {
    return (
      <div className="text-center py-12 bg-white/5 rounded-lg border border-white/10 animate-in fade-in">
        <div className="flex flex-col items-center">
          <div className="bg-red-500/10 p-3 rounded-full mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Error Loading Proposals</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            {error?.message || "We couldn't load the proposals. Please try again later."}
          </p>
          {retryFunction && (
            <Button 
              onClick={retryFunction}
              className="px-4 py-2 bg-primary/90 hover:bg-primary text-primary-foreground rounded-md transition-colors"
              disabled={isRetrying}
            >
              <RefreshCw className={cn("h-4 w-4 mr-2", isRetrying && "animate-spin")} />
              {isRetrying ? "Retrying..." : "Try Again"}
            </Button>
          )}
        </div>
      </div>
    );
  }
  
  if (proposals.length === 0) {
    return (
      <div 
        className="text-center py-12 bg-white/5 rounded-lg border border-white/10 animate-in fade-in"
        role="status"
        aria-live="polite"
      >
        <p className="text-gray-400">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div 
      className="space-y-4 animate-in fade-in-50"
      role="list"
      aria-label="Proposals list"
    >
      {memoizedProposals}
    </div>
  );
};
