
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Proposal } from '@/types/proposals';

export interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (proposal: Omit<Proposal, 'id'>) => void;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [timeframe, setTimeframe] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProposal: Omit<Proposal, 'id'> = {
      title,
      description,
      budget: parseInt(budget, 10),
      timeframe: parseInt(timeframe, 10),
      status: 'DRAFT',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submissionDate: new Date().toISOString(),
      evaluations: [],
      attachments: []
    };
    
    onSubmit(newProposal);
    resetForm();
  };
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setBudget('');
    setTimeframe('');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Proposal</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter proposal title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter proposal description"
              rows={4}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget ($)</Label>
              <Input
                id="budget"
                type="number"
                min="0"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Enter budget"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeframe">Timeframe (months)</Label>
              <Input
                id="timeframe"
                type="number"
                min="1"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                placeholder="Enter timeframe"
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Create Proposal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
