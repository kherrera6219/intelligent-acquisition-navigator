
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RefreshCw, Wifi, WifiOff, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  onReset?: () => void;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  isOnline: boolean;
}

export class NetworkErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true
  };

  private onlineListener: (() => void) | null = null;
  private offlineListener: (() => void) | null = null;

  componentDidMount() {
    // Set up online/offline event listeners
    this.onlineListener = () => this.setState({ isOnline: true });
    this.offlineListener = () => this.setState({ isOnline: false });

    window.addEventListener('online', this.onlineListener);
    window.addEventListener('offline', this.offlineListener);
  }

  componentWillUnmount() {
    // Clean up listeners
    if (this.onlineListener) {
      window.removeEventListener('online', this.onlineListener);
    }
    if (this.offlineListener) {
      window.removeEventListener('offline', this.offlineListener);
    }
  }

  public static getDerivedStateFromError(error: Error): Partial<State> {
    // Determine if it's a network error
    const isNetworkError = 
      error.message.includes('network') || 
      error.message.includes('fetch') ||
      error.message.includes('Failed to fetch') ||
      error.message.includes('NetworkError') ||
      error.message.includes('connection') ||
      error.message.includes('timeout');

    return { 
      hasError: true, 
      error: isNetworkError ? new Error(`Network error: ${error.message}`) : error 
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Network error caught:", error, errorInfo);
    
    // Attempt to detect if we're offline
    this.setState({ 
      isOnline: navigator.onLine 
    });
  }

  private handleRefresh = () => {
    // Reset the error boundary state
    this.setState({ hasError: false, error: null });
    
    // Call the onReset prop if provided
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      // Default behavior - reload the page
      window.location.reload();
    }
  };

  private isNetworkError() {
    if (!this.state.error) return false;
    
    return (
      this.state.error.message.includes('network') || 
      this.state.error.message.includes('fetch') ||
      this.state.error.message.includes('Failed to fetch') ||
      this.state.error.message.includes('NetworkError') ||
      this.state.error.message.includes('connection') ||
      this.state.error.message.includes('timeout')
    );
  }

  public render() {
    // If a custom fallback is provided, use it for any error
    if (this.state.hasError && this.props.fallback) {
      return this.props.fallback;
    }

    // If it's a network error or we're offline
    if (this.state.hasError && (this.isNetworkError() || !this.state.isOnline)) {
      return (
        <div className="p-4">
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Connection Error</AlertTitle>
            <AlertDescription>
              {!this.state.isOnline 
                ? "You're currently offline. Please check your internet connection."
                : "We're having trouble connecting to our services. This might be due to your internet connection or a temporary issue on our end."
              }
            </AlertDescription>
          </Alert>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
            <span className="flex items-center text-sm text-muted-foreground gap-2">
              {this.state.isOnline 
                ? <Wifi className="h-4 w-4 text-green-500" /> 
                : <WifiOff className="h-4 w-4 text-red-500" />
              }
              {this.state.isOnline ? "Connected" : "Offline"}
            </span>
            
            <Button 
              onClick={this.handleRefresh}
              className="flex items-center gap-2"
              disabled={!this.state.isOnline}
            >
              <RefreshCw className="h-4 w-4" />
              {this.state.isOnline ? "Retry" : "Check Connection"}
            </Button>
          </div>
          
          {this.state.error && (
            <p className="mt-6 text-xs text-muted-foreground">
              Error details: {this.state.error.message}
            </p>
          )}
        </div>
      );
    }

    // For non-network errors, don't handle here
    if (this.state.hasError) {
      // Reset so other error boundaries can catch this
      this.setState({ hasError: false, error: null });
    }

    return this.props.children;
  }
}

export default NetworkErrorBoundary;
