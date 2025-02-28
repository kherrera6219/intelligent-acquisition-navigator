
import React from 'react';
import { Calendar, DollarSign, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/universal/Card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate, formatCurrency } from '@/utils/formatters';
import type { Proposal } from '@/types/proposals';

interface ProposalListProps {
  proposals: Proposal[];
  onProposalClick: (proposal: Proposal) => void;
  onViewDetails?: (proposal: Proposal) => void;
}

export const ProposalList: React.FC<ProposalListProps> = ({ 
  proposals, 
  onProposalClick,
  onViewDetails
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {proposals.map((proposal) => (
        <Card 
          key={proposal.id} 
          className="p-4 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onProposalClick(proposal)}
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">{proposal.title}</h3>
              <Badge className={getStatusColor(proposal.status)}>
                {proposal.status}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {proposal.description}
            </p>
            
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {formatDate(proposal.submissionDate || proposal.submittedAt)}
                </span>
              </div>
              
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {formatCurrency(proposal.budget || 0)}
                </span>
              </div>
            </div>
            
            {onViewDetails && (
              <div className="mt-2 flex justify-end" onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails(proposal);
                  }}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};
