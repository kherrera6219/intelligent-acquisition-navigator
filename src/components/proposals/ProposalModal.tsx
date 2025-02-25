
import React from 'react';
import { Button } from '@/components/ui/button';
import { ProposalDetails } from './ProposalDetails';
import type { Proposal } from '@/types/proposals';

interface ProposalModalProps {
  proposal: Proposal;
  onClose: () => void;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({ proposal, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 z-50 transition-opacity">
      <div className="bg-background/80 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto shadow-xl">
        <ProposalDetails proposal={proposal} />
        <div className="p-4 border-t border-border">
          <Button 
            onClick={onClose}
            variant="outline"
            className="w-full"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
