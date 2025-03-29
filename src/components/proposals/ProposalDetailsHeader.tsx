
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/formatters';
import { StarRating } from '@/components/ui/universal/StarRating';
import { Proposal } from '@/types/proposals';

interface ProposalDetailsHeaderProps {
  proposal: Proposal;
  userRole?: string;
  handleBack: () => void;
  handleStatusChange: (status: 'APPROVED' | 'REJECTED') => void;
  averageRating: number;
}

const ProposalDetailsHeader: React.FC<ProposalDetailsHeaderProps> = ({
  proposal,
  userRole,
  handleBack,
  handleStatusChange,
  averageRating
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Proposals
        </Button>
        
        <div className="flex items-center gap-2">
          <Badge 
            variant={
              proposal.status === 'APPROVED' ? 'default' : 
              proposal.status === 'REJECTED' ? 'destructive' : 
              'outline'
            }
          >
            {proposal.status}
          </Badge>
          
          {userRole === 'admin' && proposal.status === 'PENDING' && (
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="bg-green-500/10 hover:bg-green-500/20 text-green-500 border-green-500/20"
                onClick={() => handleStatusChange('APPROVED')}
              >
                Approve
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/20"
                onClick={() => handleStatusChange('REJECTED')}
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-2">{proposal.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
          <span>Submitted: {formatDate(proposal.submittedAt)}</span>
          <span>Last Updated: {formatDate(proposal.updatedAt)}</span>
          {averageRating > 0 && (
            <div className="flex items-center gap-1">
              <span>Rating:</span>
              <StarRating score={averageRating} readOnly={true} size="sm" />
              <span>({proposal.evaluations.length})</span>
            </div>
          )}
        </div>
        <div className="prose prose-invert max-w-none mb-8">
          <p>{proposal.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetailsHeader;
