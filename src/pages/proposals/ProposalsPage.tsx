
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Proposal } from '@/types/proposals';
import { PlusCircle, Search, Filter, ArrowUpDown, MoreHorizontal, Calendar, User, DollarSign } from 'lucide-react';
import { ProcurityIQLayout } from '@/components/wireframe/ProcurityIQLayout';
import { MsFluentButton } from '@/components/ui/MsFluentButton';
import { MsFluentCard, MsFluentCardHeader, MsFluentCardTitle, MsFluentCardContent } from '@/components/ui/MsFluentCard';

export default function ProposalsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: '1',
      title: 'IT Infrastructure Upgrade',
      description: 'Comprehensive upgrade of networking equipment and servers',
      status: 'PENDING',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submissionDate: new Date().toISOString(),
      budget: 250000,
      timeframe: 6,
      attachments: [],
      evaluations: []
    },
    {
      id: '2',
      title: 'Office Supplies Contract',
      description: 'Annual contract for office supplies and equipment',
      status: 'APPROVED',
      submittedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      submissionDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      budget: 50000,
      timeframe: 12,
      attachments: [],
      evaluations: []
    },
    {
      id: '3',
      title: 'Software Licensing Renewal',
      description: 'Renewal of enterprise software licenses',
      status: 'REJECTED',
      submittedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
      submissionDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      budget: 175000,
      timeframe: 24,
      attachments: [],
      evaluations: []
    }
  ]);
  
  const handleProposalClick = (id: string) => {
    navigate(`/proposals/${id}`);
  };
  
  const handleNewProposal = () => {
    navigate('/proposals/new');
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-success/10 text-success border-success/30';
      case 'PENDING':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/30';
      case 'REJECTED':
        return 'bg-destructive/10 text-destructive border-destructive/30';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/30';
    }
  };
  
  const filteredProposals = proposals.filter(proposal => 
    proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proposal.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProcurityIQLayout
      pageTitle="Proposals"
      pageDescription="Manage and review all procurement proposals"
      currentSection="proposal"
    >
      <div className="ms-actions-bar flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="ms-search-container relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search proposals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ms-input pl-9 w-full h-10 bg-background border border-input rounded-md"
          />
        </div>

        <div className="ms-h-stack flex gap-2 w-full sm:w-auto">
          <MsFluentButton variant="outline" size="sm" leadingIcon={<Filter className="h-4 w-4" />}>
            Filter
          </MsFluentButton>
          <MsFluentButton variant="outline" size="sm" leadingIcon={<ArrowUpDown className="h-4 w-4" />}>
            Sort
          </MsFluentButton>
          <MsFluentButton 
            variant="primary" 
            size="sm" 
            leadingIcon={<PlusCircle className="h-4 w-4" />}
            onClick={handleNewProposal}
          >
            New Proposal
          </MsFluentButton>
        </div>
      </div>

      <MsFluentCard className="overflow-hidden">
        <MsFluentCardHeader>
          <MsFluentCardTitle>All Proposals</MsFluentCardTitle>
          <span className="ms-text-muted text-sm">{filteredProposals.length} proposals</span>
        </MsFluentCardHeader>
        <MsFluentCardContent className="p-0">
          <div className="ms-table-responsive overflow-x-auto">
            <table className="ms-table w-full">
              <thead className="ms-table-header bg-muted/50">
                <tr>
                  <th className="ms-table-head px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Proposal</th>
                  <th className="ms-table-head px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="ms-table-head px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Budget</th>
                  <th className="ms-table-head px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Timeframe</th>
                  <th className="ms-table-head px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="ms-table-head px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {filteredProposals.length > 0 ? (
                  filteredProposals.map((proposal) => (
                    <tr 
                      key={proposal.id} 
                      className="ms-table-row hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => handleProposalClick(proposal.id)}
                    >
                      <td className="ms-table-cell px-4 py-3 text-sm">
                        <div>
                          <div className="font-medium">{proposal.title}</div>
                          <div className="text-xs text-muted-foreground">{proposal.description}</div>
                        </div>
                      </td>
                      <td className="ms-table-cell px-4 py-3 text-sm">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${getStatusBadgeClass(proposal.status)}`}>
                          {proposal.status}
                        </span>
                      </td>
                      <td className="ms-table-cell px-4 py-3 text-sm">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                          {new Intl.NumberFormat('en-US', { 
                            style: 'currency', 
                            currency: 'USD',
                            maximumFractionDigits: 0 
                          }).format(proposal.budget)}
                        </div>
                      </td>
                      <td className="ms-table-cell px-4 py-3 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                          {proposal.timeframe} months
                        </div>
                      </td>
                      <td className="ms-table-cell px-4 py-3 text-sm">
                        {new Date(proposal.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="ms-table-cell px-4 py-3 text-sm">
                        <div className="flex justify-end">
                          <button 
                            className="ms-icon-button p-2 rounded-full hover:bg-muted transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add action menu functionality here
                            }}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="ms-table-cell px-4 py-8 text-center text-muted-foreground">
                      No proposals found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </MsFluentCardContent>
      </MsFluentCard>
    </ProcurityIQLayout>
  );
}
