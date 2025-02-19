
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

export const ChatInput = ({
  input,
  isLoading,
  onInputChange,
  onSubmit,
  className
}: ChatInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="relative glass-card p-4">
        <Textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type your message..."
          className="min-h-[100px] w-full resize-none rounded-lg bg-background/80 border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary transition-colors"
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute bottom-6 right-6 enterprise-gradient text-white hover:opacity-90 transition-opacity"
          size="sm"
        >
          <ArrowUp className="w-4 h-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </form>
  );
};
