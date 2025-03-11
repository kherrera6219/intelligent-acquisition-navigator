
import React from 'react';
import { Bot, User } from 'lucide-react';
import { FederalChatMessage as MessageType } from '../FederalChatContainer';

interface FederalChatMessageProps {
  message: MessageType;
}

export const FederalChatMessage: React.FC<FederalChatMessageProps> = ({ message }) => {
  return (
    <div 
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`max-w-[80%] p-3 rounded-lg ${
          message.role === 'user' 
            ? 'bg-primary text-primary-foreground rounded-tr-none' 
            : 'bg-secondary/50 backdrop-blur-sm text-secondary-foreground rounded-tl-none'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          {message.role === 'assistant' ? (
            <Bot className="h-4 w-4" />
          ) : (
            <User className="h-4 w-4" />
          )}
          <span className="text-xs opacity-70">
            {message.role === 'assistant' ? 'AI Assistant' : 'You'}
          </span>
        </div>
        <div className="whitespace-pre-wrap">{message.content}</div>
        <div className="text-xs opacity-50 text-right mt-1">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
