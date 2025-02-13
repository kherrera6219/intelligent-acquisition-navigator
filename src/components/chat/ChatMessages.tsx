
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { Message } from "@/types/chat";
import { ROLE_LABELS, AGENCY_LABELS, DETAIL_LEVELS } from "@/constants/chatOptions";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-lg ${
                message.role === "user"
                  ? "bg-violet-500/20 text-white"
                  : "bg-gray-800/50 text-gray-100"
              }`}
            >
              {message.role === "user" && message.userRole && (
                <div className="text-xs text-violet-400 mb-1">
                  {ROLE_LABELS[message.userRole]}
                  {message.agencyRegulation && (
                    <span className="ml-2">
                      • {AGENCY_LABELS[message.agencyRegulation]}
                    </span>
                  )}
                  {message.detailLevel && (
                    <span className="ml-2">
                      • {DETAIL_LEVELS[message.detailLevel as keyof typeof DETAIL_LEVELS]}
                    </span>
                  )}
                </div>
              )}
              <p className="text-sm">{message.content}</p>
              <span className="text-xs text-gray-400 mt-2 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <Loader2 className="w-5 h-5 animate-spin text-violet-400" />
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
