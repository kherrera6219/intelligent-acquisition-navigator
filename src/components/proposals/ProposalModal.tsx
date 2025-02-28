
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { ProposalDetails } from '@/components/proposals/ProposalDetails';
import type { Proposal } from '@/types/proposals';

interface ProposalModalProps {
  proposal: Proposal;
  onClose: () => void;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({ proposal, onClose }) => {
  return (
    <Dialog open={!!proposal} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl">Proposal Details</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        
        <div className="mt-4">
          <ProposalDetails proposal={proposal} handleBack={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
