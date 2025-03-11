
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { FederalChatMessageList } from './chat/FederalChatMessageList';
import { FederalChatInput } from './chat/FederalChatInput';
import { FederalChatFooter } from './chat/FederalChatFooter';

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
  
  const handleInputChange = (value: string) => {
    setMessageInput(value);
    if (onInputChange) onInputChange(value);
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
  
  const handleFileUpload = (file: File) => {
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
      <FederalChatMessageList 
        messages={messages} 
        isLoading={isLoading} 
      />
      
      <div className="border-t border-border p-4 bg-black/20 rounded-b-lg">
        <FederalChatInput
          input={messageInput}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          onSendMessage={handleSendMessage}
          onFileUpload={handleFileUpload}
        />
        
        <FederalChatFooter
          onClearChat={handleClearChat}
          hasMessages={messages.length > 0}
        />
      </div>
    </div>
  );
};
