
import React from 'react';
import { Bot, User } from 'lucide-react';
import { FederalChatMessage as MessageType } from '../FederalChatContainer';

interface FederalChatMessageProps {
  message: MessageType;
}

export const FederalChatMessage: React.FC<FederalChatMessageProps> = ({ message }) => {
  const isUserMessage = message.role === 'user';
  const role = isUserMessage ? 'You' : 'AI Assistant';
  
  return (
    <div 
      className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}
      role="listitem"
    >
      <div 
        className={`max-w-[80%] p-3 rounded-lg ${
          isUserMessage 
            ? 'bg-primary text-primary-foreground rounded-tr-none' 
            : 'bg-secondary/50 backdrop-blur-sm text-secondary-foreground rounded-tl-none'
        }`}
        aria-label={`Message from ${role}`}
      >
        <div className="flex items-center gap-2 mb-1">
          {isUserMessage ? (
            <User className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Bot className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="text-xs opacity-70">
            {role}
          </span>
        </div>
        <div className="whitespace-pre-wrap">{message.content}</div>
        <div className="text-xs opacity-50 text-right mt-1">
          <time dateTime={message.timestamp.toISOString()}>
            {message.timestamp.toLocaleTimeString()}
          </time>
        </div>
      </div>
    </div>
  );
};
