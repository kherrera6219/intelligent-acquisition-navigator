
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class NetworkErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Network error caught:", error, errorInfo);
  }

  private handleRefresh = () => {
    // Reset the error boundary state
    this.setState({ hasError: false, error: null });
    
    // Call the onReset prop if provided
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      // Default behavior
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] p-6">
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Network Error</AlertTitle>
            <AlertDescription>
              We're having trouble connecting to our services. This might be due to your internet connection or a temporary issue on our end.
            </AlertDescription>
          </Alert>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button 
              onClick={this.handleRefresh}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-muted-foreground">
            Error details: {this.state.error?.message || "Unknown network error"}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default NetworkErrorBoundary;
