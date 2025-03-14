
import React from 'react';
import { NetworkErrorBoundary } from '@/components/ui/universal/NetworkErrorBoundary';
import { FederalReportCardGrid } from './FederalReportCardGrid';
import { FederalChatContainer } from './FederalChatContainer';
import { ReportCardProps } from './FederalReportCard';
import { FederalChatMessage } from './FederalChatContainer';

export interface FederalTabContentProps {
  activeTab: 'reports' | 'chat';
  reports?: ReportCardProps[];
  chatMessages?: FederalChatMessage[];
  isSending?: boolean;
  messageInput?: string;
  onInputChange?: (value: string) => void;
  onSendMessage?: (message: string) => void;
  onClearChat?: () => void;
  onCardClick?: (index: number) => void;
  onNetworkErrorReset?: () => void;
  onFileUpload?: (file: File) => void;
  isLoading?: boolean;
  error?: string;
}

export const FederalTabContent: React.FC<FederalTabContentProps> = ({
  activeTab,
  reports = [],
  chatMessages = [],
  isSending = false,
  messageInput = '',
  onInputChange = () => {},
  onSendMessage = () => {},
  onClearChat = () => {},
  onCardClick = () => {},
  onNetworkErrorReset = () => {},
  onFileUpload = () => {},
  isLoading,
  error,
}) => {
  return (
    <>
      {activeTab === 'reports' ? (
        <NetworkErrorBoundary onReset={onNetworkErrorReset}>
          <FederalReportCardGrid
            reports={reports}
            onCardClick={onCardClick}
          />
        </NetworkErrorBoundary>
      ) : (
        <NetworkErrorBoundary onReset={onNetworkErrorReset}>
          <div className="bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg p-4">
            <FederalChatContainer 
              messages={chatMessages}
              isLoading={isSending}
              input={messageInput}
              onInputChange={onInputChange}
              onSendMessage={onSendMessage}
              onClearChat={onClearChat}
              onFileUpload={onFileUpload}
            />
          </div>
        </NetworkErrorBoundary>
      )}
    </>
  );
};
