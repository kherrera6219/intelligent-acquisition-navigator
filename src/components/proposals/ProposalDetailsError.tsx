
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/universal/Card';

interface ProposalDetailsErrorProps {
  error: string;
  handleBack: () => void;
}

const ProposalDetailsError: React.FC<ProposalDetailsErrorProps> = ({ error, handleBack }) => {
  return (
    <div className="p-4">
      <Button variant="ghost" size="sm" onClick={handleBack}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      <Card className="p-6 mt-4 text-center">
        <h2 className="text-xl font-semibold text-red-500 mb-2">Error</h2>
        <p className="text-gray-400 mb-4">
          {error}
        </p>
        <Button onClick={handleBack}>Return</Button>
      </Card>
    </div>
  );
};

export default ProposalDetailsError;
