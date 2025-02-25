
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";

interface BackToTopButtonProps {
  visible: boolean;
  onClick: () => void;
}

export const BackToTopButton = ({ visible, onClick }: BackToTopButtonProps) => {
  if (!visible) return null;

  return (
    <div className="fixed bottom-8 right-4 z-50 animate-fade-in">
      <Tooltip content="Scroll back to top">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-primary/10 backdrop-blur-sm hover:bg-primary/20 transition-colors duration-200"
          onClick={onClick}
          aria-label="Scroll back to top"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </Button>
      </Tooltip>
    </div>
  );
};
