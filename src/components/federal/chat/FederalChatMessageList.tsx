
import React, { useRef, useEffect } from 'react';
import { FederalChatMessage as MessageType } from '../FederalChatContainer';
import { FederalChatMessage } from './FederalChatMessage';
import { FederalChatEmptyState } from './FederalChatEmptyState';
import { Bot } from 'lucide-react';

interface FederalChatMessageListProps {
  messages: MessageType[];
  isLoading?: boolean;
}

export const FederalChatMessageList: React.FC<FederalChatMessageListProps> = ({
  messages,
  isLoading = false,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div 
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/30 rounded-t-lg"
      role="log"
      aria-live="polite"
      aria-label="Chat message history"
    >
      {messages.length === 0 ? (
        <FederalChatEmptyState />
      ) : (
        <div role="list">
          {messages.map((message) => (
            <FederalChatMessage key={message.id} message={message} />
          ))}
        </div>
      )}
      {isLoading && (
        <div className="flex justify-start" aria-live="polite">
          <div className="max-w-[80%] p-3 rounded-lg bg-secondary/50 backdrop-blur-sm text-secondary-foreground rounded-tl-none">
            <div className="flex items-center gap-2 mb-1">
              <Bot className="h-4 w-4" aria-hidden="true" />
              <span className="text-xs opacity-70">AI Assistant</span>
            </div>
            <div className="flex space-x-2" aria-label="AI Assistant is thinking">
              <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
              <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]"></div>
              <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]"></div>
              <span className="sr-only">Generating response...</span>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
