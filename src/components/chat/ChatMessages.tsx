
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { UserRound, ArrowDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  className?: string;
}

export const ChatMessages = ({ messages, isLoading, className }: ChatMessagesProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      {messages.map((message, index) => (
        <div
          key={message.id || index}
          className={cn(
            "flex gap-3 p-4 glass-card animate-fade-in transition-all duration-200 hover:translate-y-[-2px]",
            message.role === "user" 
              ? "ml-auto max-w-[80%] enterprise-gradient" 
              : "mr-auto max-w-[80%] bg-background/80"
          )}
        >
          {message.role === "user" ? (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
              <UserRound className="w-5 h-5 text-violet-400" />
            </div>
          ) : (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
          <div className="flex-1 space-y-2">
            <p className={cn(
              "text-sm font-medium",
              message.role === "user" ? "text-white" : "text-primary"
            )}>
              {message.role === "user" ? "You" : "Assistant"}
            </p>
            <div className={cn(
              "text-sm leading-relaxed",
              message.role === "user" ? "text-white" : "text-foreground"
            )}>
              {message.content}
            </div>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex gap-3 p-4 glass-card mr-auto max-w-[80%] animate-pulse">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24 bg-muted" />
            <Skeleton className="h-4 w-full bg-muted" />
            <Skeleton className="h-4 w-2/3 bg-muted" />
          </div>
        </div>
      )}

      {messages.length > 0 && (
        <button 
          className="flex items-center gap-2 px-3 py-1 text-sm text-muted-foreground hover:text-primary 
                    transition-colors mx-auto hover:scale-105 active:scale-95"
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
        >
          <ArrowDown className="w-4 h-4" />
          Scroll to bottom
        </button>
      )}
    </div>
  );
};
