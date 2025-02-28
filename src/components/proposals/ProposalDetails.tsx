
import React, { useState } from 'react';
import { ArrowLeft, FileText, Calendar, DollarSign, Users, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/universal/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EvaluationForm from '@/components/proposals/EvaluationForm';
import { AttachmentsTab } from '@/components/proposals/AttachmentsTab';
import { EvaluationsTab } from '@/components/proposals/EvaluationsTab';
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
      date: new Date().toISOString(),
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
    <div className="p-4">
      <Button variant="ghost" size="sm" onClick={handleBack}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="mt-4">
        <h1 className="text-2xl font-bold mb-2">{proposal.title}</h1>
        <p className="text-sm text-muted-foreground mb-4">
          ID: {proposal.id} • Submitted: {formatDate(proposal.submissionDate)}
        </p>

        <Card className="p-4 mb-6">
          <div className="prose dark:prose-invert max-w-none">
            <p>{proposal.description}</p>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="p-4 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Budget</p>
              <p className="font-semibold">{formatCurrency(proposal.budget)}</p>
            </div>
          </Card>
          <Card className="p-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Timeline</p>
              <p className="font-semibold">{proposal.timeframe} {proposal.timeframe === 1 ? 'month' : 'months'}</p>
            </div>
          </Card>
        </div>

        <Card className="mb-6">
          <Tabs defaultValue="evaluations">
            <TabsList className="w-full border-b rounded-none">
              <TabsTrigger value="evaluations" className="flex-1">
                <Star className="h-4 w-4 mr-2" />
                Evaluations ({evaluations.length})
              </TabsTrigger>
              <TabsTrigger value="attachments" className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                Attachments ({proposal.attachments?.length || 0})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="evaluations" className="p-4">
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
                <div className="mb-4">
                  <Button onClick={() => setIsEvaluating(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Evaluation
                  </Button>
                </div>
              )}
              <EvaluationsTab evaluations={evaluations} />
            </TabsContent>
            <TabsContent value="attachments" className="p-4">
              <AttachmentsTab attachments={proposal.attachments || []} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};
