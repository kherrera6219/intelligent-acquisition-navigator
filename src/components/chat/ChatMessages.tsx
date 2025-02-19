
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
            "flex gap-3 p-4 rounded-lg animate-fade-in transition-colors",
            message.role === "user" 
              ? "bg-gray-800/50 ml-auto max-w-[80%]" 
              : "bg-gray-900/50 mr-auto max-w-[80%]"
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
              message.role === "user" ? "text-violet-200" : "text-emerald-200"
            )}>
              {message.role === "user" ? "You" : "Assistant"}
            </p>
            <div className="text-gray-200 text-sm leading-relaxed">
              {message.content}
            </div>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex gap-3 p-4 rounded-lg bg-gray-900/50 mr-auto max-w-[80%] animate-pulse">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24 bg-gray-700" />
            <Skeleton className="h-4 w-full bg-gray-700" />
            <Skeleton className="h-4 w-2/3 bg-gray-700" />
          </div>
        </div>
      )}

      {messages.length > 0 && (
        <div className="flex justify-center">
          <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowDown className="w-4 h-4" />
            Scroll to bottom
          </button>
        </div>
      )}
    </div>
  );
};
