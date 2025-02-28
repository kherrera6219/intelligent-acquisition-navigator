import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/universal/Card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Proposal } from '@/types/proposals';
import { useOptimisticQuery, useOptimisticMutation } from '@/hooks/useOptimisticQuery';
import { formatDate } from '@/utils/formatters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { StarRating } from '@/components/ui/universal/StarRating';
import { FileIcon, Trash2, Download, ArrowLeft, Send } from 'lucide-react';

export default function ProposalDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userRole } = useAuth();
  const [showEvaluationForm, setShowEvaluationForm] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  // Fetch proposal details
  const { data: proposal, isLoading, isError } = useOptimisticQuery<Proposal>({
    url: `/api/proposals/${id}`,
    queryKey: ['proposal', id as string],
    resourceType: 'proposal',
  });

  // Mutations
  const addEvaluationMutation = useOptimisticMutation<Proposal>({
    url: `/api/proposals/${id}/evaluations`,
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
    url: `/api/proposals/${id}/attachments/{id}`,
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
    url: `/api/proposals/${id}`,
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
    navigate('/proposals');
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

  const addEvaluation = async (data: { proposalId: string; comment: string; rating: number }) => {
    try {
      await addEvaluationMutation.mutate({
        id: proposal?.id as string,
        ...data
      });
      setShowEvaluationForm(false);
      toast({
        title: "Evaluation Added",
        description: "Your evaluation has been added successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add evaluation. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteAttachment = async (attachmentId: string) => {
    try {
      await deleteAttachmentMutation.mutate({
        id: proposal?.id as string,
        attachmentId
      });
      toast({
        title: "Attachment Deleted",
        description: "The attachment has been deleted successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete attachment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSubmitEvaluation = () => {
    if (!comment.trim() || rating === 0) {
      toast({
        title: "Validation Error",
        description: "Please provide both a comment and rating.",
        variant: "destructive"
      });
      return;
    }

    addEvaluation({
      proposalId: id as string,
      comment,
      rating
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" disabled>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/4 mb-2" />
        <Skeleton className="h-32 w-full mb-4" />
        <Skeleton className="h-8 w-1/2 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !proposal) {
    return (
      <div className="p-4">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Card className="p-6 mt-4 text-center">
          <h2 className="text-xl font-semibold text-red-500 mb-2">Error Loading Proposal</h2>
          <p className="text-gray-400 mb-4">
            We couldn't load the proposal details. The proposal may have been deleted or you may not have permission to view it.
          </p>
          <Button onClick={handleBack}>Return to Proposals</Button>
        </Card>
      </div>
    );
  }

  // Calculate average rating
  const averageRating = proposal.evaluations.length > 0
    ? proposal.evaluations.reduce((sum, eval) => sum + eval.rating, 0) / proposal.evaluations.length
    : 0;

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Proposals
        </Button>
        
        <div className="flex items-center gap-2">
          <Badge 
            variant={
              proposal.status === 'APPROVED' ? 'success' : 
              proposal.status === 'REJECTED' ? 'destructive' : 
              'default'
            }
          >
            {proposal.status}
          </Badge>
          
          {userRole === 'admin' && proposal.status === 'PENDING' && (
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="bg-green-500/10 hover:bg-green-500/20 text-green-500 border-green-500/20"
                onClick={() => handleStatusChange('APPROVED')}
              >
                Approve
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/20"
                onClick={() => handleStatusChange('REJECTED')}
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      </div>

      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-2">{proposal.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
          <span>Submitted: {formatDate(proposal.submittedAt)}</span>
          <span>Last Updated: {formatDate(proposal.updatedAt)}</span>
          {averageRating > 0 && (
            <div className="flex items-center gap-1">
              <span>Rating:</span>
              <StarRating value={averageRating} readOnly size="sm" />
              <span>({proposal.evaluations.length})</span>
            </div>
          )}
        </div>

        <div className="prose prose-invert max-w-none mb-8">
          <p>{proposal.description}</p>
        </div>

        <Tabs defaultValue="attachments">
          <TabsList>
            <TabsTrigger value="attachments">
              Attachments ({proposal.attachments.length})
            </TabsTrigger>
            <TabsTrigger value="evaluations">
              Evaluations ({proposal.evaluations.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="attachments" className="pt-4">
            {proposal.attachments.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No attachments available</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {proposal.attachments.map((attachment) => (
                  <Card key={attachment.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileIcon className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-medium">{attachment.name}</p>
                        <p className="text-xs text-gray-400">{attachment.type}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      {userRole === 'admin' && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-500 hover:text-red-600"
                          onClick={() => deleteAttachment(attachment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="evaluations" className="pt-4">
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
                      onClick={() => setShowEvaluationForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSubmitEvaluation}
                      disabled={!comment.trim() || rating === 0}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit
                    </Button>
                  </div>
                </div>
              </Card>
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
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
