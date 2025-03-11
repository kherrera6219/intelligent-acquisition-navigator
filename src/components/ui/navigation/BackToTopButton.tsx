
import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface BackToTopButtonProps {
  onClick: () => void;
  visible?: boolean;
}

export const BackToTopButton = ({ onClick, visible = true }: BackToTopButtonProps) => {
  if (!visible) return null;
  
  return (
    <Button
      variant="secondary"
      size="icon"
      className="rounded-full shadow-lg"
      onClick={onClick}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
};
