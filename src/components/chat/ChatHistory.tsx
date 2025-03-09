
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  preview: string;
  timestamp: Date;
}

interface ChatHistoryProps {
  conversations: Conversation[];
  currentConversationId: string;
  onSelectConversation: (id: string) => void;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ 
  conversations, 
  currentConversationId,
  onSelectConversation 
}) => {
  return (
    <div className="space-y-2">
      {conversations.length === 0 ? (
        <p className="text-muted-foreground text-sm italic">No conversation history</p>
      ) : (
        conversations.map((conversation) => (
          <button
            key={conversation.id}
            className={cn(
              "w-full text-left p-3 rounded-md transition-colors hover:bg-primary/10",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              conversation.id === currentConversationId && "bg-primary/20 hover:bg-primary/25"
            )}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <p className="text-sm font-medium truncate">{conversation.preview}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatDistanceToNow(conversation.timestamp, { addSuffix: true })}
            </p>
          </button>
        ))
      )}
    </div>
  );
};
