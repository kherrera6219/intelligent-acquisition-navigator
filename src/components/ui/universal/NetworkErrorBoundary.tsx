
import React, { Component, ErrorInfo } from 'react';
import { AlertTriangle, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { Card } from '@/components/ui/universal/Card';

interface NetworkErrorBoundaryProps {
  children: React.ReactNode;
  onReset?: () => void;
  fallback?: React.ReactNode;
}

interface NetworkErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  isNetworkError: boolean;
}

const NetworkStatusDisplay = ({ retry }: { retry: () => void }) => {
  const isOnline = useNetworkStatus();
  
  return (
    <div className="flex flex-col items-center p-6 text-center">
      {isOnline ? (
        <>
          <Wifi className="h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">You're back online!</h2>
          <p className="text-gray-400 mb-6">Your connection has been restored. You can retry your request now.</p>
        </>
      ) : (
        <>
          <WifiOff className="h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Network Connection Lost</h2>
          <p className="text-gray-400 mb-6">
            Please check your internet connection and try again when you're back online.
          </p>
        </>
      )}
      
      <Button 
        onClick={retry} 
        disabled={!isOnline}
        className="flex items-center gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        Retry
      </Button>
    </div>
  );
};

class NetworkErrorBoundaryClass extends Component<
  NetworkErrorBoundaryProps & { isOnline: boolean },
  NetworkErrorBoundaryState
> {
  constructor(props: NetworkErrorBoundaryProps & { isOnline: boolean }) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      isNetworkError: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<NetworkErrorBoundaryState> {
    // Check if the error is likely a network error
    const errorMessage = error.message.toLowerCase();
    const isNetworkError = 
      errorMessage.includes('network') ||
      errorMessage.includes('fetch') ||
      errorMessage.includes('connection') ||
      errorMessage.includes('timeout') ||
      errorMessage.includes('offline');
      
    return {
      hasError: true,
      error,
      isNetworkError
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('NetworkErrorBoundary caught an error:', error, errorInfo);
  }

  reset = () => {
    this.setState({
      hasError: false,
      error: null,
      isNetworkError: false
    });
    
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      // If it's a network error, show network-specific UI
      if (this.state.isNetworkError) {
        return (
          <Card className="border border-red-500/20 bg-red-500/5 shadow-lg">
            <NetworkStatusDisplay retry={this.reset} />
          </Card>
        );
      }
      
      // For custom fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Generic error UI
      return (
        <Card className="border border-red-500/20 bg-red-500/5 shadow-lg">
          <div className="flex flex-col items-center p-6 text-center">
            <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-gray-400 mb-6">
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
            <Button onClick={this.reset} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </Card>
      );
    }

    return this.props.children;
  }
}

// Wrapper component to provide network status from hook
export const NetworkErrorBoundary: React.FC<NetworkErrorBoundaryProps> = (props) => {
  const isOnline = useNetworkStatus();
  return <NetworkErrorBoundaryClass {...props} isOnline={isOnline} />;
};
