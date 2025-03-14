import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { Card } from '@/components/ui/universal/Card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Filter } from 'lucide-react';
import { SearchBar } from '@/components/proposals/SearchBar';
import { ProposalList } from '@/components/proposals/ProposalList';
import { Pagination } from '@/components/proposals/Pagination';
import { ProposalModal } from '@/components/proposals/ProposalModal';
import UniversalInternalHeader from '@/components/layout/UniversalInternalHeader';
import { InternalFooter } from '@/components/layout/InternalFooter';
import type { Proposal } from '@/types/proposals';

export default function ProposalsPage() {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [filteredProposals, setFilteredProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const itemsPerPage = 5;
  
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
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm, proposals]);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
  const paginatedProposals = filteredProposals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(filteredProposals.length / itemsPerPage);
  
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
            
            <Button variant="outline" size="sm" className="sm:self-end">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          
          <Card className="p-6">
            <ProposalList 
              proposals={paginatedProposals} 
              onProposalClick={handleProposalClick}
            />
            
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
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
