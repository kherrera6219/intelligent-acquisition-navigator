
import React, { useState, useEffect } from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { ProposalList } from '@/components/proposals/ProposalList';
import { SearchBar } from '@/components/proposals/SearchBar';
import { Pagination } from '@/components/proposals/Pagination';
import { ProposalModal } from '@/components/proposals/ProposalModal';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import type { Proposal } from '@/types/proposals';

export default function ProposalsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [filteredProposals, setFilteredProposals] = useState<Proposal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const itemsPerPage = 10;

  // Simulate loading proposal data
  useEffect(() => {
    const loadProposals = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockProposals: Proposal[] = Array.from({ length: 25 }, (_, i) => ({
          id: `prop-${i + 1}`,
          title: `Proposal ${i + 1}`,
          description: `Description for proposal ${i + 1}. This is a mock proposal for demonstration purposes.`,
          status: i % 3 === 0 ? 'approved' : i % 3 === 1 ? 'pending' : 'rejected',
          submittedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
          budget: Math.floor(Math.random() * 500000) + 50000,
          timeframe: Math.floor(Math.random() * 12) + 1,
          evaluations: Array.from({ length: Math.floor(Math.random() * 3) }, (_, j) => ({
            id: `eval-${i}-${j}`,
            userId: `user-${j}`,
            userName: `Evaluator ${j + 1}`,
            comment: `This is evaluation comment ${j + 1} for proposal ${i + 1}.`,
            rating: Math.floor(Math.random() * 5) + 1,
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(),
          })),
          attachments: Array.from({ length: Math.floor(Math.random() * 3) }, (_, j) => ({
            id: `att-${i}-${j}`,
            name: `Document-${j + 1}.pdf`,
            size: Math.floor(Math.random() * 1000000) + 100000,
            url: '#',
            uploadedAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(),
          })),
        }));
        
        setProposals(mockProposals);
        setFilteredProposals(mockProposals);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load proposals'));
        setIsLoading(false);
      }
    };
    
    loadProposals();
  }, []);

  // Filter proposals based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProposals(proposals);
    } else {
      const filtered = proposals.filter(
        proposal => proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   proposal.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProposals(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, proposals]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProposals.length / itemsPerPage);
  const currentProposals = filteredProposals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddProposal = (proposal: Omit<Proposal, 'id'>) => {
    const newProposal: Proposal = {
      ...proposal,
      id: `prop-${proposals.length + 1}`,
      submittedAt: new Date().toISOString(),
      evaluations: [],
      attachments: [],
    };
    
    setProposals([newProposal, ...proposals]);
    setIsModalOpen(false);
  };

  return (
    <ProtectedPageLayout
      title="Proposals"
      description="View and manage all proposal submissions."
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
        <SearchBar onSearch={handleSearch} />
        
        <ProposalList proposals={currentProposals} />
        
        {filteredProposals.length > itemsPerPage && (
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {isModalOpen && (
          <ProposalModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddProposal}
          />
        )}
      </div>
    </ProtectedPageLayout>
  );
}
