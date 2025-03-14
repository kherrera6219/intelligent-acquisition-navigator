
import React from 'react';
import { NetworkStatusBanner } from './NetworkStatusBanner';

interface NetworkErrorHandlerProps {
  children: React.ReactNode;
  errorMessage?: string;
  retryAction?: () => void;
  isRetrying?: boolean;
}

export const NetworkErrorHandler: React.FC<NetworkErrorHandlerProps> = ({
  children,
  errorMessage,
  retryAction,
  isRetrying = false,
}) => {
  return (
    <div className="network-error-handler">
      {errorMessage && (
        <NetworkStatusBanner 
          message={errorMessage}
          actionLabel={retryAction ? "Retry" : undefined}
          onAction={retryAction}
          isLoading={isRetrying}
          variant="destructive"
        />
      )}
      {children}
    </div>
  );
};
