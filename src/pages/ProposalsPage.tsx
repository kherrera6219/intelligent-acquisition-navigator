
import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
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

// Input validation schema
const searchSchema = z.object({
  term: z.string().trim().min(2, 'Search term must be at least 2 characters').max(50, 'Search term too long')
});

const ProposalsPage = () => {
  const searchRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [isValidating, setIsValidating] = useState(false);

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

  const fetchProposals = useCallback(async () => {
    if (!canMakeRequest()) {
      throw new Error('Rate limit exceeded');
    }

    // Add CSRF token to headers
    const headers = {
      'X-CSRF-Token': document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || '',
    };

    try {
      // Validate search term if present
      if (debouncedSearchTerm) {
        setIsValidating(true);
        const result = searchSchema.safeParse({ term: debouncedSearchTerm });
        if (!result.success) {
          throw new Error(result.error.errors[0].message);
        }
      }

      // Simulated API response
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
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch proposals",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsValidating(false);
    }
  }, [canMakeRequest, debouncedSearchTerm, toast]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['proposals', page, debouncedSearchTerm],
    queryFn: fetchProposals,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
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
      </div>
    );
  }

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
        <Button variant="outline" onClick={() => {}}>Sort by date</Button>
      </div>

      <ProposalList
        proposals={data?.proposals || []}
        onProposalClick={handleProposalClick}
      />

      <Pagination
        page={page}
        totalPages={data?.totalPages}
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
