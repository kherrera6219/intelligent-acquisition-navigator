
import React from 'react';
import { Bot } from 'lucide-react';

export const FederalChatEmptyState: React.FC = () => {
  return (
    <div 
      className="flex flex-col items-center justify-center h-full text-center p-6"
      role="status"
      aria-label="Empty chat state"
    >
      <Bot className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
      <h3 className="text-lg font-medium">Federal Acquisition AI Assistant</h3>
      <p className="text-sm text-gray-400 mt-2 max-w-md enhanced-contrast-text">
        Ask questions about federal acquisition regulations, compliance requirements, or document preparation. I'm here to help with FAR, DFARS, and related guidance.
      </p>
    </div>
  );
};
