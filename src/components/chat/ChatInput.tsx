
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_LENGTH = 10_000;

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ChatInput = ({
  input,
  isLoading,
  onInputChange,
  onSubmit,
}: ChatInputProps) => {
  const remaining = MAX_LENGTH - input.length;
  const isOverLimit = remaining < 0;
  const isNearLimit = remaining <= 500 && remaining >= 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isOverLimit) return;
    onSubmit(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
      <div className="flex gap-2 items-end">
        <div className="flex-1 flex flex-col gap-1">
          <Textarea
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about FAR/DFARS compliance, solicitations, market research… (Shift+Enter for new line)"
            className="resize-none bg-gray-800/50 border-gray-700 text-white min-h-[44px] max-h-40"
            rows={1}
            disabled={isLoading}
            maxLength={MAX_LENGTH + 1}
            aria-label="Message input"
            aria-describedby="char-count"
          />
          <div
            id="char-count"
            className={cn(
              "text-xs text-right transition-colors",
              isOverLimit  ? "text-red-400" :
              isNearLimit  ? "text-yellow-400" :
              "text-gray-600"
            )}
            aria-live="polite"
          >
            {isOverLimit
              ? `${Math.abs(remaining)} characters over limit`
              : `${remaining.toLocaleString()} characters remaining`}
          </div>
        </div>
        <Button
          type="submit"
          disabled={isLoading || !input.trim() || isOverLimit}
          className="bg-violet-500 hover:bg-violet-600 shrink-0 self-start mt-0.5"
          aria-label={isLoading ? "Sending…" : "Send message"}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="w-4 h-4" aria-hidden="true" />
          )}
        </Button>
      </div>
    </form>
  );
};
