
import { useEffect, useRef, useState } from "react";
import { Loader2, Copy, Check, MessageSquare } from "lucide-react";
import { Message } from "@/types/chat";
import { ROLE_LABELS, AGENCY_LABELS, DETAIL_LEVELS } from "@/constants/chatOptions";
import { Button } from "@/components/ui/button";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Auto-scroll to bottom when messages change or loading starts/stops
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleCopy = async (message: Message) => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopiedId(message.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // clipboard not available — silently ignore
    }
  };

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-center">
        <div className="h-14 w-14 rounded-full bg-violet-500/10 flex items-center justify-center">
          <MessageSquare className="h-7 w-7 text-violet-400" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-medium text-gray-300">Start a conversation</h3>
        <p className="text-sm text-gray-500 max-w-xs">
          Ask a question about FAR/DFARS compliance, solicitations, market research, or acquisition strategy.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4" role="log" aria-label="Chat conversation" aria-live="polite">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`group relative max-w-[85%] p-4 rounded-lg ${
                message.role === "user"
                  ? "bg-violet-500/20 text-white"
                  : "bg-gray-800/50 text-gray-100"
              }`}
            >
              {/* Role metadata for user messages */}
              {message.role === "user" && message.userRole && (
                <div className="text-xs text-violet-400 mb-1.5 flex flex-wrap gap-1" aria-label="Message context">
                  <span>{ROLE_LABELS[message.userRole]}</span>
                  {message.agencyRegulation && (
                    <span>&bull; {AGENCY_LABELS[message.agencyRegulation]}</span>
                  )}
                  {message.detailLevel && (
                    <span>&bull; {DETAIL_LEVELS[message.detailLevel as keyof typeof DETAIL_LEVELS]}</span>
                  )}
                </div>
              )}

              {/* Message content — preserve newlines */}
              <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>

              {/* Timestamp + copy button row */}
              <div className="flex items-center justify-between mt-2 gap-2">
                <span className="text-xs text-gray-400">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white"
                  onClick={() => handleCopy(message)}
                  aria-label="Copy message"
                >
                  {copiedId === message.id ? (
                    <Check className="h-3.5 w-3.5 text-green-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex justify-start" aria-label="AI is responding" aria-live="polite">
            <div className="bg-gray-800/50 px-4 py-3 rounded-lg flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-violet-400" aria-hidden="true" />
              <span className="text-xs text-gray-400">Thinking…</span>
            </div>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={bottomRef} aria-hidden="true" />
      </div>
    </div>
  );
};
