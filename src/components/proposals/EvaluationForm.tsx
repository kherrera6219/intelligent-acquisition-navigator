
import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/universal/Card';
import { StarRating } from '@/components/ui/universal/StarRating';

interface EvaluationFormProps {
  comment: string;
  rating: number;
  setComment: (comment: string) => void;
  setRating: (rating: number) => void;
  handleAddEvaluation: () => void;
  handleCancelEvaluation: () => void;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({
  comment,
  rating,
  setComment,
  setRating,
  handleAddEvaluation,
  handleCancelEvaluation
}) => {
  return (
    <Card className="p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">Add Your Evaluation</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="rating">Rating</Label>
          <div className="mt-2">
            <StarRating 
              value={rating} 
              onChange={setRating} 
              size="md" 
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="comment">Comment</Label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your evaluation comments..."
            className="mt-1"
            rows={4}
          />
        </div>
        
        <div className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={handleCancelEvaluation}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddEvaluation}
            disabled={!comment.trim() || rating === 0}
          >
            <Send className="h-4 w-4 mr-2" />
            Submit
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EvaluationForm;
