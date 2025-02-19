
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
  return (
    <form onSubmit={onSubmit} className={cn("space-y-4", className)}>
      <div className="relative">
        <Textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type your message..."
          className="min-h-[100px] w-full resize-none rounded-lg bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500"
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute bottom-4 right-4 bg-violet-600 hover:bg-violet-700 text-white"
          size="sm"
        >
          <ArrowUp className="w-4 h-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </form>
  );
};
