
import React from 'react';
import { FederalChatMessage } from '../FederalChatContainer';
import { Bot, User } from 'lucide-react';

interface FederalChatMessageListProps {
  messages: FederalChatMessage[];
  isLoading?: boolean;
}

export const FederalChatMessageList: React.FC<FederalChatMessageListProps> = ({
  messages,
  isLoading = false,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/30 rounded-t-lg">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          <Bot className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-lg font-medium">Federal Acquisition AI Assistant</h3>
          <p className="text-sm text-gray-400 mt-2 max-w-md">
            Ask questions about federal acquisition regulations, compliance requirements, or document preparation. I'm here to help with FAR, DFARS, and related guidance.
          </p>
        </div>
      ) : (
        messages.map((message) => (
          <div 
            key={message.id} 
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
        ))
      )}
      {isLoading && (
        <div className="flex justify-start">
          <div className="max-w-[80%] p-3 rounded-lg bg-secondary/50 backdrop-blur-sm text-secondary-foreground rounded-tl-none">
            <div className="flex items-center gap-2 mb-1">
              <Bot className="h-4 w-4" />
              <span className="text-xs opacity-70">AI Assistant</span>
            </div>
            <div className="flex space-x-2">
              <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
              <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]"></div>
              <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
