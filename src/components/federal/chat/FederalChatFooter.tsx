
import React from 'react';
import { Button } from '@/components/ui/button';

interface FederalChatFooterProps {
  onClearChat: () => void;
  hasMessages: boolean;
}

export const FederalChatFooter: React.FC<FederalChatFooterProps> = ({
  onClearChat,
  hasMessages,
}) => {
  return (
    <div className="flex justify-between mt-2">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onClearChat}
        className="text-xs focus-visible-ring"
        disabled={!hasMessages}
        aria-label="Clear chat history"
      >
        Clear chat
      </Button>
      <div 
        className="text-xs text-gray-400 enhanced-contrast-text"
        aria-label="Application information"
      >
        Federal Acquisition AI • FY2025
      </div>
    </div>
  );
};
