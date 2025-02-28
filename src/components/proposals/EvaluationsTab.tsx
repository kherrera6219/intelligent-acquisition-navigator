
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/universal/Card';
import { StarRating } from '@/components/ui/universal/StarRating';
import { formatDate } from '@/utils/formatters';
import EvaluationForm from './EvaluationForm';
import { Proposal } from '@/types/proposals';

interface EvaluationsTabProps {
  proposal: Proposal;
  showEvaluationForm: boolean;
  comment: string;
  rating: number;
  setShowEvaluationForm: (show: boolean) => void;
  setComment: (comment: string) => void;
  setRating: (rating: number) => void;
  handleAddEvaluation: () => void;
}

const EvaluationsTab: React.FC<EvaluationsTabProps> = ({
  proposal,
  showEvaluationForm,
  comment,
  rating,
  setShowEvaluationForm,
  setComment,
  setRating,
  handleAddEvaluation
}) => {
  const handleCancelEvaluation = () => {
    setShowEvaluationForm(false);
    setComment('');
    setRating(0);
  };

  return (
    <div className="pt-4">
      {!showEvaluationForm && (
        <div className="mb-4">
          <Button 
            onClick={() => setShowEvaluationForm(true)}
            className="w-full md:w-auto"
          >
            Add Evaluation
          </Button>
        </div>
      )}
      
      {showEvaluationForm && (
        <EvaluationForm
          comment={comment}
          rating={rating}
          setComment={setComment}
          setRating={setRating}
          handleAddEvaluation={handleAddEvaluation}
          handleCancelEvaluation={handleCancelEvaluation}
        />
      )}
      
      {proposal.evaluations.length === 0 ? (
        <p className="text-gray-400 text-center py-4">No evaluations yet</p>
      ) : (
        <div className="space-y-4">
          {proposal.evaluations.map((evaluation) => (
            <Card key={evaluation.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <StarRating value={evaluation.rating} readOnly size="sm" />
                <span className="text-sm text-gray-400">
                  {formatDate(evaluation.createdAt)}
                </span>
              </div>
              <p className="text-gray-200">{evaluation.comment}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EvaluationsTab;
