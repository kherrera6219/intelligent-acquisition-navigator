
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const ProposalDetailsLoading: React.FC = () => {
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
};

export default ProposalDetailsLoading;
