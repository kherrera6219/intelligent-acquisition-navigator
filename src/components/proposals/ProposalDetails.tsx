
import React, { useState } from 'react';
import { Proposal } from '@/types/proposals';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useOptimisticMutation } from '@/hooks/useOptimisticQuery';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

interface ProposalDetailsProps {
  proposal: Proposal;
  isLoading?: boolean;
  error?: string;
}

export const ProposalDetails: React.FC<ProposalDetailsProps> = ({
  proposal,
  isLoading,
  error
}) => {
  const { toast } = useToast();
  const isOnline = useNetworkStatus();
  const [isAddingEvaluation, setIsAddingEvaluation] = useState(false);
  const [evaluationComment, setEvaluationComment] = useState('');
  const [evaluationRating, setEvaluationRating] = useState<number>(5);

  // Optimistic mutation for adding evaluation
  const addEvaluationMutation = useOptimisticMutation<Proposal, { proposalId: string, comment: string, rating: number }>({
    url: `/api/proposals/${proposal.id}/evaluations`,
    method: 'POST',
    onMutate: async ({ proposalId, comment, rating }) => {
      // Create optimistic evaluation
      const newEvaluation = {
        id: `temp-${Date.now()}`,
        comment,
        rating,
        createdAt: new Date().toISOString()
      };
      
      // Return optimistic data for context
      return {
        ...proposal,
        evaluations: [...proposal.evaluations, newEvaluation]
      };
    },
    onSuccess: () => {
      toast({
        title: "Evaluation added",
        description: "Your evaluation has been added successfully",
      });
      setIsAddingEvaluation(false);
      setEvaluationComment('');
      setEvaluationRating(5);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add evaluation",
        variant: "destructive"
      });
    }
  });

  // Optimistic mutation for downloading attachment
  const downloadAttachmentMutation = useOptimisticMutation<void, { attachmentId: string }>({
    url: `/api/attachments/{id}/download`,
    method: 'POST',
    onSuccess: () => {
      toast({
        title: "Download started",
        description: "Your file download is in progress",
      });
    },
    onError: (error) => {
      toast({
        title: "Download failed",
        description: error.message || "Failed to download attachment",
        variant: "destructive"
      });
    }
  });

  const handleAddEvaluation = () => {
    setIsAddingEvaluation(true);
  };

  const handleSubmitEvaluation = () => {
    if (!evaluationComment.trim()) {
      toast({
        title: "Error",
        description: "Please add a comment for your evaluation",
        variant: "destructive"
      });
      return;
    }

    addEvaluationMutation.mutate({
      proposalId: proposal.id,
      comment: evaluationComment,
      rating: evaluationRating
    });
  };

  const handleDownloadAttachment = (attachmentId: string) => {
    downloadAttachmentMutation.mutate({ attachmentId });
  };

  if (isLoading) {
    return <Progress />
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">{proposal.title}</h2>
      <p className="mb-4">{proposal.description}</p>
      <div className="mb-4">
        <span className="font-bold">Status: </span>
        <span>{proposal.status}</span>
      </div>

      {!isOnline && (
        <div className="rounded-md bg-amber-50 p-2 mb-4 dark:bg-amber-900/30">
          <p className="text-amber-800 dark:text-amber-200 text-sm">
            You're offline. Some actions may not be available.
          </p>
        </div>
      )}

      <section className="mb-6">
        <h3 className="text-xl font-bold mb-2">Evaluations</h3>
        {proposal.evaluations.length === 0 ? (
          <p className="text-muted-foreground">No evaluations yet.</p>
        ) : (
          proposal.evaluations.map(evaluation => (
            <div key={evaluation.id} className="mb-2 p-3 border rounded-md">
              <p>{evaluation.comment}</p>
              <span className="text-sm text-muted-foreground">Rating: {evaluation.rating}</span>
            </div>
          ))
        )}
        
        {isAddingEvaluation ? (
          <div className="mt-4 space-y-3">
            <textarea
              className="w-full p-2 border rounded-md"
              rows={3}
              placeholder="Add your evaluation..."
              value={evaluationComment}
              onChange={(e) => setEvaluationComment(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              <label htmlFor="rating">Rating:</label>
              <select
                id="rating"
                className="p-1 border rounded-md"
                value={evaluationRating}
                onChange={(e) => setEvaluationRating(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map(value => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSubmitEvaluation} disabled={addEvaluationMutation.isPending || !isOnline}>
                {addEvaluationMutation.isPending ? 'Submitting...' : 'Submit'}
              </Button>
              <Button variant="outline" onClick={() => setIsAddingEvaluation(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={handleAddEvaluation} className="mt-2" disabled={!isOnline}>
            Add Evaluation
          </Button>
        )}
      </section>

      <section>
        <h3 className="text-xl font-bold mb-2">Attachments</h3>
        {proposal.attachments.length === 0 ? (
          <p className="text-muted-foreground">No attachments available.</p>
        ) : (
          proposal.attachments.map(attachment => (
            <div key={attachment.id} className="flex items-center gap-2 mb-2">
              <span>{attachment.name}</span>
              <Button 
                variant="outline" 
                onClick={() => handleDownloadAttachment(attachment.id)}
                disabled={downloadAttachmentMutation.isPending || !isOnline}
              >
                {downloadAttachmentMutation.isPending ? 'Downloading...' : 'Download'}
              </Button>
            </div>
          ))
        )}
      </section>
    </Card>
  );
};
