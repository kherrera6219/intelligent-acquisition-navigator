
import React from 'react';
import { Card } from '@/components/ui/universal/Card';
import { MsLoadingSkeleton } from '@/components/ui/ms-loading-skeleton';

const ProposalDetailsLoading: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in-50">
      <Card className="p-6">
        <MsLoadingSkeleton className="h-8 w-3/4 mb-6" />
        <div className="space-y-2">
          <MsLoadingSkeleton variant="text" width="100%" />
          <MsLoadingSkeleton variant="text" width="5/6" />
          <MsLoadingSkeleton variant="text" width="4/6" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div>
            <MsLoadingSkeleton className="h-4 w-24 mb-2" />
            <MsLoadingSkeleton className="h-6 w-32" />
          </div>
          <div>
            <MsLoadingSkeleton className="h-4 w-24 mb-2" />
            <MsLoadingSkeleton className="h-6 w-32" />
          </div>
          <div>
            <MsLoadingSkeleton className="h-4 w-24 mb-2" />
            <MsLoadingSkeleton className="h-6 w-32" />
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <MsLoadingSkeleton className="h-6 w-48 mb-6" />
        <div className="space-y-4">
          <MsLoadingSkeleton className="h-24 w-full rounded-lg" />
          <MsLoadingSkeleton className="h-24 w-full rounded-lg" />
        </div>
      </Card>
      
      <Card className="p-6">
        <MsLoadingSkeleton className="h-6 w-48 mb-6" />
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <MsLoadingSkeleton className="h-10 w-10 rounded-full" />
            <div>
              <MsLoadingSkeleton className="h-4 w-32 mb-1" />
              <MsLoadingSkeleton className="h-3 w-24" />
            </div>
          </div>
          <MsLoadingSkeleton className="h-20 w-full mt-4 rounded-md" />
        </div>
      </Card>
    </div>
  );
};

export default ProposalDetailsLoading;
