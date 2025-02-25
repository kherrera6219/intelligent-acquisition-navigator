
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";

export const HelpButton = () => {
  return (
    <div className="fixed bottom-24 right-4 z-50 animate-fade-in">
      <Tooltip content="Need help? Click to contact support">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-primary/10 backdrop-blur-sm hover:bg-primary/20 transition-colors duration-200"
          onClick={() => window.open('/contact', '_blank')}
          aria-label="Get help"
        >
          <HelpCircle className="h-5 w-5" aria-hidden="true" />
        </Button>
      </Tooltip>
    </div>
  );
};
