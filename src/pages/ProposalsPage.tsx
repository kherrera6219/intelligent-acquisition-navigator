
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ProposalDetails } from '@/components/proposals/ProposalDetails';
import type { Proposal } from '@/types/proposals';

const ProposalsPage = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['proposals', page, searchTerm],
    queryFn: async () => {
      // Temporary mock data
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
    }
  });

  if (isLoading) {
    return <Progress />;
  }

  if (error) {
    return <div className="text-red-500">Error loading proposals</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Proposals Management</h1>
      
      <div className="flex justify-between mb-6">
        <Input
          type="text"
          placeholder="Search proposals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => {}}>Sort by date</Button>
      </div>

      <div className="grid gap-4">
        {data?.proposals.map((proposal) => (
          <Card 
            key={proposal.id}
            className="p-4 cursor-pointer"
            onClick={() => setSelectedProposal(proposal)}
          >
            <h3 className="font-bold">{proposal.title}</h3>
            <p className="text-gray-600">{proposal.description}</p>
            <div className="mt-2">
              <span className="font-semibold">Status: </span>
              {proposal.status}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="py-2">Page {page}</span>
        <Button
          onClick={() => setPage(p => p + 1)}
          disabled={page === data?.totalPages}
        >
          Next
        </Button>
      </div>

      {selectedProposal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <ProposalDetails proposal={selectedProposal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalsPage;
