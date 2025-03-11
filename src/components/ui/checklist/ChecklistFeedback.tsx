
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X, Star, Send } from 'lucide-react';

interface ChecklistFeedbackProps {
  onClose: () => void;
  onSubmit: (feedback: string, rating: number) => void;
}

export const ChecklistFeedback: React.FC<ChecklistFeedbackProps> = ({ onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return; // Require at least a rating
    
    setIsSubmitting(true);
    onSubmit(feedback, rating);
    
    // Reset form
    setFeedback('');
    setRating(0);
    setIsSubmitting(false);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Share your feedback</DialogTitle>
          <DialogDescription>
            How is your experience with the improvement process so far?
          </DialogDescription>
          <button onClick={onClose} className="absolute right-4 top-4 rounded-sm text-gray-400 hover:text-gray-300">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="flex justify-center">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`h-8 w-8 ${
                      (hoveredRating || rating) >= star
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-400'
                    } transition-colors duration-150`}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <Textarea
            placeholder="Share your thoughts... (optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>
        
        <DialogFooter className="sm:justify-end mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="mr-2"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className="flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
