
import React from 'react';
import { Proposal } from '@/types/proposals';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

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

      <section className="mb-6">
        <h3 className="text-xl font-bold mb-2">Evaluations</h3>
        {proposal.evaluations.map(eval => (
          <div key={eval.id} className="mb-2">
            <p>{eval.comment}</p>
            <span>Rating: {eval.rating}</span>
          </div>
        ))}
        <Button onClick={() => {}} className="mt-2">Add Evaluation</Button>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-2">Attachments</h3>
        {proposal.attachments.map(attachment => (
          <div key={attachment.id} className="flex items-center gap-2 mb-2">
            <span>{attachment.name}</span>
            <Button 
              variant="outline" 
              onClick={() => {}}
            >
              Download
            </Button>
          </div>
        ))}
      </section>
    </Card>
  );
};
