
import React, { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { LoadingState } from '@/components/ui/universal/LoadingState';
import { useDebounce } from '@/hooks/use-debounce';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import type { Proposal } from '@/types/proposals';
import { SearchBar } from '@/components/proposals/SearchBar';
import { Pagination } from '@/components/proposals/Pagination';
import { ProposalList } from '@/components/proposals/ProposalList';
import { ProposalModal } from '@/components/proposals/ProposalModal';
import { useOptimisticQuery } from '@/hooks/useOptimisticQuery';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

// Input validation schema
const searchSchema = z.object({
  term: z.string().trim().min(2, 'Search term must be at least 2 characters').max(50, 'Search term too long')
});

const ProposalsPage = () => {
  const searchRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isOnline = useNetworkStatus();
  
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Rate limiting using useRef to track request timestamps
  const lastRequestRef = React.useRef<number>(Date.now());
  const MIN_REQUEST_INTERVAL = 1000; // 1 second between requests

  const canMakeRequest = useCallback(() => {
    const now = Date.now();
    if (now - lastRequestRef.current < MIN_REQUEST_INTERVAL) {
      toast({
        title: "Please wait",
        description: "Making too many requests. Please wait a moment.",
        variant: "destructive"
      });
      return false;
    }
    lastRequestRef.current = now;
    return true;
  }, [toast]);

  // Use our optimistic query hook for proposals
  const { data, isLoading, error } = useOptimisticQuery<Proposal[]>({
    url: `/api/proposals?page=${page}&search=${encodeURIComponent(debouncedSearchTerm)}&sortByDate=${sortByDate}`,
    queryKey: ['proposals', page, debouncedSearchTerm, sortByDate],
    resourceType: 'proposals',
    enabled: canMakeRequest(),
    retryCount: isOnline ? 2 : 0, // Don't retry if offline
    onError: (err) => {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to fetch proposals",
        variant: "destructive"
      });
    }
  });

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    try {
      if (value.length > 50) {
        throw new Error('Search term too long');
      }
      setSearchTerm(value);
    } catch (error) {
      toast({
        title: "Invalid Input",
        description: error instanceof Error ? error.message : "Invalid search term",
        variant: "destructive"
      });
    }
  }, [toast]);

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

  const toggleSortByDate = useCallback(() => {
    setSortByDate(prev => !prev);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-6 min-h-[50vh]">
        <LoadingState 
          variant="skeleton" 
          skeletonCount={5} 
          skeletonClassName="h-32 w-full rounded-lg"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-destructive dark:text-destructive-foreground p-4 rounded-lg bg-destructive/10 m-4">
        Error loading proposals: {error instanceof Error ? error.message : 'Unknown error'}
        <Button 
          onClick={() => queryClient.invalidateQueries({ queryKey: ['proposals'] })} 
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  const proposals = data || [];
  const totalPages = proposals.length > 0 ? 2 : 1; // Simulate pagination with mock data

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-6 min-h-[50vh]">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
        Proposals Management
      </h1>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <SearchBar
          searchRef={searchRef}
          searchTerm={searchTerm}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
          isValidating={isValidating}
        />
        <Button 
          variant="outline" 
          onClick={toggleSortByDate}
        >
          {sortByDate ? 'Sort by relevance' : 'Sort by date'}
        </Button>
      </div>

      {!isOnline && (
        <div className="rounded-md bg-amber-50 p-4 mb-4 dark:bg-amber-900/30">
          <p className="text-amber-800 dark:text-amber-200">
            You're currently offline. Showing cached proposals.
          </p>
        </div>
      )}

      {proposals.length === 0 ? (
        <div className="text-center p-8 border rounded-lg">
          <p className="text-muted-foreground">No proposals found matching your criteria.</p>
        </div>
      ) : (
        <ProposalList
          proposals={proposals}
          onProposalClick={handleProposalClick}
        />
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {selectedProposal && (
        <ProposalModal
          proposal={selectedProposal}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default ProposalsPage;
