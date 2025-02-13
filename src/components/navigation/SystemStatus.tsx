
import { Button } from "@/components/ui/button";
import { AlertCircle } from 'lucide-react';

interface SystemStatusProps {
  errors: number;
  onClick: () => void;
}

export const SystemStatus = ({ errors, onClick }: SystemStatusProps) => {
  if (errors === 0) return null;

  return (
    <Button 
      variant="destructive" 
      className="mb-4 gap-2"
      onClick={onClick}
      aria-label={`${errors} system errors detected`}
    >
      <AlertCircle className="h-4 w-4" />
      System Errors ({errors})
    </Button>
  );
};
