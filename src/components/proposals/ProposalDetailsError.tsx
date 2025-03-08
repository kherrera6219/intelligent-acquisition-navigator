
import React from 'react';
import { Card } from '@/components/ui/universal/Card';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProposalDetailsErrorProps {
  onBack: () => void;
  error: Error | null;
  onRetry?: () => void;
}

const ProposalDetailsError: React.FC<ProposalDetailsErrorProps> = ({ 
  onBack, 
  error,
  onRetry 
}) => {
  return (
    <Card className="p-8 text-center animate-in fade-in-50 slide-in-from-bottom-4">
      <div className="flex flex-col items-center">
        <div className="bg-red-500/10 p-3 rounded-full mb-4">
          <AlertCircle className="h-8 w-8 text-red-500" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Error Loading Proposal</h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          {error?.message || "We couldn't load the proposal details. Please try again later."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={onBack} 
            variant="outline"
            className="min-w-[120px]"
          >
            Go Back
          </Button>
          
          {onRetry && (
            <Button 
              onClick={onRetry} 
              variant="default"
              className="min-w-[120px]"
            >
              Try Again
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProposalDetailsError;
