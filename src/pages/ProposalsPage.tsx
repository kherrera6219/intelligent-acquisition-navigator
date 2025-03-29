
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { Card } from '@/components/ui/universal/Card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Filter } from 'lucide-react';
import { SearchBar } from '@/components/proposals/SearchBar';
import { ProposalList } from '@/components/proposals/ProposalList';
import { SimplePagination } from '@/components/ui/pagination/SimplePagination';
import { ProposalModal } from '@/components/proposals/ProposalModal';
import UniversalInternalHeader from '@/components/layout/UniversalInternalHeader';
import { InternalFooter } from '@/components/layout/InternalFooter';
import { usePagination } from '@/hooks/usePagination';
import type { Proposal } from '@/types/proposals';

export default function ProposalsPage() {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [filteredProposals, setFilteredProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { 
    currentPage, 
    itemsPerPage, 
    changePageSize,
    totalPages, 
    goToPage, 
    paginateArray 
  } = usePagination({
    initialPage: 1,
    pageSize: 5,
    totalItems: filteredProposals.length
  });
  
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockProposals: Proposal[] = Array.from({ length: 15 }, (_, i) => ({
          id: `${i + 1}`,
          title: `Proposal ${i + 1}`,
          description: `This is a description for proposal ${i + 1}. It contains details about the objectives, scope, and approach of the proposal.`,
          status: Math.random() > 0.3 ? 'APPROVED' : Math.random() > 0.5 ? 'PENDING' : 'REJECTED',
          submittedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(),
          submissionDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
          budget: Math.floor(Math.random() * 500000) + 50000,
          timeframe: Math.floor(Math.random() * 12) + 1,
          evaluations: [],
          attachments: [],
        }));
        
        setProposals(mockProposals);
        setFilteredProposals(mockProposals);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load proposals'));
        setIsLoading(false);
      }
    };
    
    fetchProposals();
  }, []);
  
  useEffect(() => {
    // Filter proposals based on search term
    const filtered = proposals.filter(proposal => 
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredProposals(filtered);
    goToPage(1); // Reset to first page when search changes
  }, [searchTerm, proposals, goToPage]);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  
  const handleProposalClick = (id: string) => {
    navigate(`/proposals/${id}`);
  };
  
  const handleCreateProposal = (newProposal: Omit<Proposal, 'id'>) => {
    // In a real app, you would send this to your API
    const proposal: Proposal = {
      ...newProposal,
      id: `${proposals.length + 1}`,
    };
    
    setProposals([proposal, ...proposals]);
    setIsModalOpen(false);
  };
  
  // Paginate the filtered proposals
  const paginatedProposals = paginateArray(filteredProposals);
  
  return (
    <>
      <UniversalInternalHeader />
      <ProtectedPageLayout
        title="Proposals"
        description="Manage and track all your proposal submissions."
        isLoading={isLoading}
        error={error}
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Proposals', href: '/proposals' }
        ]}
        action={
          <Button onClick={() => setIsModalOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Proposal
          </Button>
        }
      >
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <SearchBar onSearch={handleSearch} />
            
            <div className="flex items-center gap-2">
              <select
                className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                value={itemsPerPage}
                onChange={(e) => changePageSize(Number(e.target.value))}
              >
                <option value="5">5 per page</option>
                <option value="10">10 per page</option>
                <option value="25">25 per page</option>
              </select>
            
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
          
          <Card className="p-6">
            <ProposalList 
              proposals={paginatedProposals} 
              onProposalClick={handleProposalClick}
              isLoading={isLoading}
              isError={!!error}
              error={error}
              emptyMessage={searchTerm ? "No proposals match your search criteria." : "No proposals found."}
            />
            
            {filteredProposals.length > 0 && (
              <div className="mt-6">
                <SimplePagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={goToPage} 
                  variant="default"
                />
              </div>
            )}
          </Card>
        </div>
        
        <ProposalModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleCreateProposal} 
        />
      </ProtectedPageLayout>
      <InternalFooter />
    </>
  );
}
