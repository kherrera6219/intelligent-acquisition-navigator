
import React, { useState } from 'react';
import { Card } from '@/components/ui/universal/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Proposal } from '@/types/proposals';
import { useOptimisticMutation } from '@/hooks/useOptimisticQuery';
import ProposalDetailsHeader from './ProposalDetailsHeader';
import AttachmentsTab from './AttachmentsTab';
import EvaluationsTab from './EvaluationsTab';
import ProposalDetailsLoading from './ProposalDetailsLoading';
import ProposalDetailsError from './ProposalDetailsError';

export interface ProposalDetailsProps {
  proposal: Proposal;
  isLoading?: boolean;
  error?: string;
  onClose?: () => void;
}

const ProposalDetails: React.FC<ProposalDetailsProps> = ({ 
  proposal, 
  isLoading, 
  error,
  onClose 
}) => {
  const { toast } = useToast();
  const { userRole } = useAuth();
  const [showEvaluationForm, setShowEvaluationForm] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  // Mutations
  const addEvaluationMutation = useOptimisticMutation<Proposal>({
    url: `/api/proposals/${proposal.id}/evaluations`,
    method: 'POST',
    onSuccess: () => {
      toast({
        title: "Evaluation Added",
        description: "Your evaluation has been added successfully."
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add evaluation. Please try again.",
        variant: "destructive"
      });
    }
  });

  const deleteAttachmentMutation = useOptimisticMutation<Proposal>({
    url: `/api/proposals/${proposal.id}/attachments/{id}`,
    method: 'DELETE',
    onSuccess: () => {
      toast({
        title: "Attachment Deleted",
        description: "The attachment has been deleted successfully."
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete attachment. Please try again.",
        variant: "destructive"
      });
    }
  });

  const updateStatusMutation = useOptimisticMutation<Proposal>({
    url: `/api/proposals/${proposal.id}`,
    method: 'PATCH',
    onSuccess: () => {
      toast({
        title: "Status Updated",
        description: "The proposal status has been updated successfully."
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Event handlers
  const handleBack = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleStatusChange = async (status: 'APPROVED' | 'REJECTED') => {
    try {
      await updateStatusMutation.mutate({
        id: proposal?.id as string,
        status
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleAddEvaluation = async () => {
    if (!comment.trim() || rating === 0) {
      toast({
        title: "Validation Error",
        description: "Please provide both a comment and rating.",
        variant: "destructive"
      });
      return;
    }

    try {
      await addEvaluationMutation.mutate({
        id: proposal?.id as string,
        comment,
        rating
      });
      setShowEvaluationForm(false);
      setComment('');
      setRating(0);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add evaluation. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteAttachment = async (attachmentId: string) => {
    try {
      await deleteAttachmentMutation.mutate({
        id: proposal?.id as string,
        attachmentId
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete attachment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDownloadAttachment = (attachment: any) => {
    setIsDownloading(true);
    
    // Simulate download delay - in a real app, this would be an actual download
    setTimeout(() => {
      toast({
        title: "Download Started",
        description: `Downloading ${attachment.name}...`
      });
      setIsDownloading(false);
    }, 1000);
  };

  // Loading state
  if (isLoading) {
    return <ProposalDetailsLoading />;
  }

  // Error state
  if (error) {
    return <ProposalDetailsError error={error} handleBack={handleBack} />;
  }

  // Calculate average rating
  const calculateAverageRating = () => {
    if (!proposal.evaluations || proposal.evaluations.length === 0) return 0;
    const sum = proposal.evaluations.reduce((total, eval) => total + eval.rating, 0);
    return sum / proposal.evaluations.length;
  };

  const averageRating = calculateAverageRating();

  return (
    <div className="space-y-6 p-4">
      <ProposalDetailsHeader
        proposal={proposal}
        userRole={userRole}
        handleBack={handleBack}
        handleStatusChange={handleStatusChange}
        averageRating={averageRating}
      />

      <Card className="p-6">
        <Tabs defaultValue="attachments">
          <TabsList>
            <TabsTrigger value="attachments">
              Attachments ({proposal.attachments.length})
            </TabsTrigger>
            <TabsTrigger value="evaluations">
              Evaluations ({proposal.evaluations.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="attachments">
            <AttachmentsTab
              proposal={proposal}
              userRole={userRole}
              isDownloading={isDownloading}
              handleDownloadAttachment={handleDownloadAttachment}
              handleDeleteAttachment={handleDeleteAttachment}
            />
          </TabsContent>
          
          <TabsContent value="evaluations">
            <EvaluationsTab
              proposal={proposal}
              showEvaluationForm={showEvaluationForm}
              comment={comment}
              rating={rating}
              setShowEvaluationForm={setShowEvaluationForm}
              setComment={setComment}
              setRating={setRating}
              handleAddEvaluation={handleAddEvaluation}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ProposalDetails;
