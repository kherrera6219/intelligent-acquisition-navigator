import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// Toast component for error boundary since we can't use hooks inside class components
const ErrorToast: React.FC<{ error: string }> = ({ error }) => {
  const { toast } = useToast();
  
  React.useEffect(() => {
    toast({
      title: 'An error occurred',
      description: error || 'Something went wrong. Please try refreshing the page.',
      variant: 'destructive',
    });
  }, [error, toast]);
  
  return null;
};

/**
 * Global Error Boundary component that catches JavaScript errors anywhere in the 
 * child component tree, logs those errors, and displays a fallback UI
 */
class GlobalErrorBoundaryClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Update state with error details
    this.setState({ errorInfo });
    
    // Call the optional onError callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  render() {
    if (this.state.hasError) {
      // If a custom fallback is provided, use that
      if (this.props.fallback) {
        return (
          <>
            {this.state.error && <ErrorToast error={this.state.error.message} />}
            {this.props.fallback}
          </>
        );
      }

      // Otherwise use the default fallback UI
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
          {this.state.error && <ErrorToast error={this.state.error.message} />}
          
          <div className="max-w-md w-full p-6 bg-card rounded-lg shadow-lg border border-border">
            <div className="flex flex-col items-center text-center space-y-4">
              <AlertTriangle className="h-12 w-12 text-destructive" />
              <h2 className="text-xl font-bold text-foreground">Something went wrong</h2>
              <p className="text-muted-foreground">
                An unexpected error occurred. Our team has been notified, but you can try refreshing the page.
              </p>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={this.handleReset}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button 
                  variant="default" 
                  className="flex-1"
                  onClick={() => window.location.href = '/'}
                >
                  Go Home
                </Button>
              </div>
              
              {process.env.NODE_ENV !== 'production' && this.state.error && (
                <div className="mt-6 w-full text-left">
                  <p className="font-semibold text-destructive">Error Details:</p>
                  <pre className="mt-2 p-4 bg-muted rounded text-xs overflow-auto max-h-40">
                    {this.state.error.toString()}
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // If there's no error, render children normally
    return this.props.children;
  }
}

// Wrap class component with a function component for better integration with React hooks
export const GlobalErrorBoundary: React.FC<ErrorBoundaryProps> = (props) => {
  return <GlobalErrorBoundaryClass {...props} />;
};
