
import React from 'react';
import { Card } from '@/components/ui/card';

export const ChecklistEmptyState: React.FC = () => {
  return (
    <Card className="p-6 flex flex-col items-center justify-center bg-muted/50 border-dashed border-2">
      <p className="text-muted-foreground text-center">
        No items found matching your search criteria.
      </p>
    </Card>
  );
};
