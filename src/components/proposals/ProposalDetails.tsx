
import React, { useState } from 'react';
import { ArrowLeft, FileText, Calendar, DollarSign, Users, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/universal/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EvaluationForm from '@/components/proposals/EvaluationForm';
import AttachmentsTab from '@/components/proposals/AttachmentsTab';
import EvaluationsTab from '@/components/proposals/EvaluationsTab';
import { formatDate, formatCurrency } from '@/utils/formatters';
import type { Proposal, Evaluation } from '@/types/proposals';

interface ProposalDetailsProps {
  proposal: Proposal;
  handleBack: () => void;
}

export const ProposalDetails: React.FC<ProposalDetailsProps> = ({ proposal, handleBack }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluations, setEvaluations] = useState<Evaluation[]>(proposal.evaluations || []);

  const handleAddEvaluation = () => {
    const newEvaluation: Evaluation = {
      id: `eval-${Date.now()}`,
      userId: 'current-user',
      userName: 'Current User',
      comment,
      rating,
      createdAt: new Date().toISOString(),
    };
    
    setEvaluations([...evaluations, newEvaluation]);
    setComment('');
    setRating(0);
    setIsEvaluating(false);
  };

  const handleCancelEvaluation = () => {
    setComment('');
    setRating(0);
    setIsEvaluating(false);
  };

  return (
    <div className="p-3 sm:p-4">
      <Button variant="ghost" size="sm" onClick={handleBack}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="mt-3 sm:mt-4">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">{proposal.title}</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
          ID: {proposal.id} • Submitted: {formatDate(proposal.submissionDate || proposal.submittedAt)}
        </p>

        <Card className="p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="prose dark:prose-invert max-w-none text-sm sm:text-base">
            <p>{proposal.description}</p>
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Card className="p-3 sm:p-4 flex items-center">
            <DollarSign className="h-4 sm:h-5 w-4 sm:w-5 mr-2 text-muted-foreground" />
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Budget</p>
              <p className="text-sm sm:text-base font-semibold">{formatCurrency(proposal.budget || 0)}</p>
            </div>
          </Card>
          <Card className="p-3 sm:p-4 flex items-center">
            <Calendar className="h-4 sm:h-5 w-4 sm:w-5 mr-2 text-muted-foreground" />
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Timeline</p>
              <p className="text-sm sm:text-base font-semibold">{proposal.timeframe || 0} {proposal.timeframe === 1 ? 'month' : 'months'}</p>
            </div>
          </Card>
        </div>

        <Card className="mb-4 sm:mb-6">
          <Tabs defaultValue="evaluations">
            <TabsList className="w-full border-b rounded-none">
              <TabsTrigger value="evaluations" className="flex-1">
                <Star className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">Evaluations ({evaluations.length})</span>
              </TabsTrigger>
              <TabsTrigger value="attachments" className="flex-1">
                <FileText className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">Attachments ({proposal.attachments?.length || 0})</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="evaluations" className="p-3 sm:p-4">
              {isEvaluating ? (
                <EvaluationForm
                  comment={comment}
                  rating={rating}
                  setComment={setComment}
                  setRating={setRating}
                  handleAddEvaluation={handleAddEvaluation}
                  handleCancelEvaluation={handleCancelEvaluation}
                />
              ) : (
                <div className="mb-3 sm:mb-4">
                  <Button onClick={() => setIsEvaluating(true)} size="sm" className="text-xs sm:text-sm">
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Add Evaluation
                  </Button>
                </div>
              )}
              <EvaluationsTab evaluations={evaluations} />
            </TabsContent>
            <TabsContent value="attachments" className="p-3 sm:p-4">
              <AttachmentsTab attachments={proposal.attachments || []} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};
