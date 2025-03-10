
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Bot, Paperclip, User } from 'lucide-react';

export interface FederalChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface FederalChatContainerProps {
  conversationId?: string;
  messages?: FederalChatMessage[];
  isLoading?: boolean;
  input?: string;
  onInputChange?: (value: string) => void;
  onSendMessage?: (message: string) => void;
  onFileUpload?: (file: File) => void;
  onClearChat?: () => void;
}

export const FederalChatContainer: React.FC<FederalChatContainerProps> = ({
  conversationId,
  messages = [],
  isLoading = false,
  input = '',
  onInputChange,
  onSendMessage,
  onFileUpload,
  onClearChat,
}) => {
  const { toast } = useToast();
  const [messageInput, setMessageInput] = useState(input);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);
    if (onInputChange) onInputChange(e.target.value);
  };
  
  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;
    
    if (onSendMessage) {
      onSendMessage(messageInput);
    } else {
      // Default behavior if no handler provided
      toast({
        title: "Message sent",
        description: "Your message has been sent to the AI assistant.",
      });
    }
    
    setMessageInput('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (onFileUpload) {
      onFileUpload(file);
    } else {
      // Default behavior if no handler provided
      toast({
        title: "File uploaded",
        description: `File "${file.name}" has been uploaded.`,
      });
    }
  };
  
  const handleClearChat = () => {
    if (onClearChat) {
      onClearChat();
    } else {
      toast({
        title: "Chat cleared",
        description: "The conversation has been cleared.",
      });
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh]">
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
      
      <div className="border-t border-border p-4 bg-black/20 rounded-b-lg">
        <div className="flex gap-2 items-end">
          <Textarea
            value={messageInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your question about federal acquisition..."
            className="min-h-[80px] resize-none"
          />
          <div className="flex flex-col gap-2">
            <Button 
              type="submit" 
              size="icon" 
              onClick={handleSendMessage}
              disabled={isLoading || messageInput.trim() === ''}
            >
              <Send className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Paperclip className="h-4 w-4" />
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
              />
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between mt-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearChat}
            className="text-xs"
            disabled={messages.length === 0}
          >
            Clear chat
          </Button>
          <div className="text-xs text-gray-400">
            Federal Acquisition AI • FY2025
          </div>
        </div>
      </div>
    </div>
  );
};
