
import React from 'react';
import { Card } from '@/components/ui/universal/Card';
import { StarRating } from '@/components/ui/universal/StarRating';
import { formatDate } from '@/utils/formatters';
import { Evaluation } from '@/types/proposals';

interface EvaluationsTabProps {
  evaluations: Evaluation[];
}

export const EvaluationsTab: React.FC<EvaluationsTabProps> = ({
  evaluations
}) => {
  return (
    <div className="pt-4">
      {evaluations.length === 0 ? (
        <p className="text-gray-400 text-center py-4">No evaluations yet</p>
      ) : (
        <div className="space-y-4">
          {evaluations.map((evaluation) => (
            <Card key={evaluation.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <StarRating score={evaluation.rating} readOnly={true} size="sm" />
                <span className="text-sm text-gray-400">
                  {formatDate(evaluation.date || evaluation.createdAt)}
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
