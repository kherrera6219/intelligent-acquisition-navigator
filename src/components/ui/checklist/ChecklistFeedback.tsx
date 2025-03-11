
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StarRating } from '@/components/ui/universal/StarRating';

interface ChecklistFeedbackProps {
  onClose: () => void;
  onSubmit: (feedback: string) => void;
}

export const ChecklistFeedback: React.FC<ChecklistFeedbackProps> = ({ onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Add a small delay to show loading state
    setTimeout(() => {
      onSubmit(`Rating: ${rating}/5, Feedback: ${feedback}`);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Progress Feedback</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium">How would you rate your progress so far?</p>
            <StarRating 
              value={rating} 
              onChange={setRating} 
              size="md" 
            />
          </div>
          
          <div className="flex flex-col space-y-2">
            <label htmlFor="feedback" className="text-sm font-medium">
              Would you like to share any feedback on the improvement process?
            </label>
            <Textarea
              id="feedback"
              placeholder="Your feedback helps us improve..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
        </div>
        
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
