
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Smile, Meh, Frown } from 'lucide-react';

interface ChecklistFeedbackProps {
  onClose: () => void;
  onSubmit: (feedback: string, rating: number) => void;
}

export const ChecklistFeedback: React.FC<ChecklistFeedbackProps> = ({
  onClose,
  onSubmit
}) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState<number | null>(null);

  const handleSubmit = () => {
    if (rating !== null) {
      onSubmit(feedback, rating);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How's your experience so far?</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex justify-center space-x-8 mb-6">
            <Button
              variant={rating === 1 ? "default" : "outline"}
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={() => setRating(1)}
            >
              <Frown className={`h-6 w-6 ${rating === 1 ? "text-white" : "text-red-500"}`} />
              <span className="sr-only">Poor</span>
            </Button>
            
            <Button
              variant={rating === 2 ? "default" : "outline"}
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={() => setRating(2)}
            >
              <Meh className={`h-6 w-6 ${rating === 2 ? "text-white" : "text-amber-500"}`} />
              <span className="sr-only">Okay</span>
            </Button>
            
            <Button
              variant={rating === 3 ? "default" : "outline"}
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={() => setRating(3)}
            >
              <Smile className={`h-6 w-6 ${rating === 3 ? "text-white" : "text-green-500"}`} />
              <span className="sr-only">Good</span>
            </Button>
          </div>
          
          <Textarea
            placeholder="Share your feedback with us (optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Maybe Later
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={rating === null}
          >
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
