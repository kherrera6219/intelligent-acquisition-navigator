import React, { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ProposalDetails } from '@/components/proposals/ProposalDetails';
import { LoadingState } from '@/components/ui/universal/LoadingState';
import { ProposalCard } from '@/components/proposals/ProposalCard';
import { useDebounce } from '@/hooks/use-debounce';
import type { Proposal } from '@/types/proposals';

const ProposalsPage = () => {
  const searchRef = React.useRef<HTMLInputElement>(null);
  
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchProposals = useCallback(async () => {
    return {
      proposals: [
        {
          id: '1',
          title: 'Proposal 1',
          description: 'Description 1',
          status: 'PENDING',
          submittedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          attachments: [],
          evaluations: []
        }
      ] as Proposal[],
      totalPages: 2
    };
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['proposals', page, debouncedSearchTerm],
    queryFn: fetchProposals,
  });

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  const handleProposalClick = useCallback((proposal: Proposal) => {
    setSelectedProposal(proposal);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setSelectedProposal(null);
  }, []);

  if (isLoading) {
    return <LoadingState variant="skeleton" skeletonCount={5} />;
  }

  if (error) {
    return (
      <div className="text-destructive dark:text-destructive-foreground p-4 rounded-lg bg-destructive/10">
        Error loading proposals
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
        Proposals Management
      </h1>
      
      <div className="flex justify-between mb-6">
        <div className="relative w-full max-w-sm">
          <Input
            ref={searchRef}
            type="text"
            placeholder="Search proposals..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pr-10"
            aria-label="Search"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              ×
            </Button>
          )}
        </div>
        <Button variant="outline" onClick={() => {}}>Sort by date</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.proposals.map((proposal) => (
          <ProposalCard
            key={proposal.id}
            proposal={proposal}
            onClick={handleProposalClick}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          variant="outline"
        >
          Previous
        </Button>
        <span className="py-2">Page {page}</span>
        <Button
          onClick={() => setPage(p => p + 1)}
          disabled={page === data?.totalPages}
          variant="outline"
        >
          Next
        </Button>
      </div>

      {selectedProposal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50 transition-opacity">
          <div className="bg-background dark:bg-background/80 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto shadow-xl">
            <ProposalDetails proposal={selectedProposal} />
            <div className="p-4 border-t border-border">
              <Button 
                onClick={handleCloseDetails}
                variant="outline"
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalsPage;
