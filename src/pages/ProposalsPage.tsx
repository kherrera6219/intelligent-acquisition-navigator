
import React, { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ProposalDetails } from '@/components/proposals/ProposalDetails';
import { LoadingState } from '@/components/ui/universal/LoadingState';
import { ProposalCard } from '@/components/proposals/ProposalCard';
import { useDebounce } from '@/hooks/use-debounce';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import type { Proposal } from '@/types/proposals';

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
      // Immediate validation for obvious issues
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

  // Show loading skeleton during initial load
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
        <div className="relative w-full sm:max-w-sm">
          <Input
            ref={searchRef}
            type="text"
            placeholder="Search proposals..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pr-10 w-full"
            aria-label="Search"
            disabled={isValidating}
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
          {isValidating && (
            <div className="absolute right-12 top-1/2 -translate-y-1/2">
              <LoadingState variant="inline" size="sm" />
            </div>
          )}
        </div>
        <Button variant="outline" onClick={() => {}}>Sort by date</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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
        <span className="py-2 text-white">Page {page}</span>
        <Button
          onClick={() => setPage(p => p + 1)}
          disabled={page === data?.totalPages}
          variant="outline"
        >
          Next
        </Button>
      </div>

      {selectedProposal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 z-50 transition-opacity">
          <div className="bg-background/80 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto shadow-xl">
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
