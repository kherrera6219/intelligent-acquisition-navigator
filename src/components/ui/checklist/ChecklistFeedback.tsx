
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChecklistFeedbackProps {
  onClose: () => void;
  onSubmit: (feedback: string) => void;
}

export const ChecklistFeedback: React.FC<ChecklistFeedbackProps> = ({ 
  onClose, 
  onSubmit 
}) => {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      onClose();
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(feedback);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Feedback</DialogTitle>
          <DialogDescription>
            How is your experience with the improvements we've made so far?
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-3">
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback helps us improve future updates..."
            className={cn(
              "min-h-[120px] w-full resize-none rounded-lg bg-background/80 border-border",
              "text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary",
              "transition-colors hover:bg-background/90"
            )}
          />
        </div>
        
        <DialogFooter className="sm:justify-between flex-col sm:flex-row gap-3 mt-2">
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Skip
          </Button>
          <Button 
            className="enterprise-gradient text-white hover:opacity-90 transition-all"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
