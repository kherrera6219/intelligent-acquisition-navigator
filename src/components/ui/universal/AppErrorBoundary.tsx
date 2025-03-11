
import React, { Component, ErrorInfo } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft, Home, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AppErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorComponent?: React.ComponentType<{
    error: Error;
    resetError: () => void;
  }>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showHome?: boolean;
  showRefresh?: boolean;
  showBack?: boolean;
}

interface AppErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<AppErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    // Call optional onError handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to console
    console.error('AppErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    const { children, fallback, errorComponent: ErrorComponent, showHome = true, showRefresh = true, showBack = true } = this.props;
    const { hasError, error, errorInfo } = this.state;

    if (hasError && error) {
      // If a custom fallback is provided, use it
      if (fallback) {
        return fallback;
      }

      // If a custom error component is provided, use it
      if (ErrorComponent) {
        return <ErrorComponent error={error} resetError={this.resetError} />;
      }

      // Default error display
      return (
        <div className="w-full h-full flex items-center justify-center p-6 ms-motion-fadeIn">
          <div className="max-w-md w-full">
            <Alert className="mb-4 bg-red-500/10 border-red-500/20">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertTitle className="text-red-500">Something went wrong</AlertTitle>
              <AlertDescription className="text-red-100/70 mt-2">
                {error.message || "An unexpected error occurred. Please try refreshing the page."}
              </AlertDescription>
            </Alert>
            
            {errorInfo && (
              <details className="mb-4 text-xs">
                <summary className="cursor-pointer text-gray-400 mb-2">Technical Details</summary>
                <pre className="p-2 bg-black/50 rounded overflow-auto max-h-[200px] text-gray-400">
                  {errorInfo.componentStack}
                </pre>
              </details>
            )}
            
            <div className="flex flex-wrap gap-2 mt-4">
              {showRefresh && (
                <Button 
                  onClick={this.resetError}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Retry</span>
                </Button>
              )}
              
              {showBack && (
                <Button 
                  onClick={() => window.history.back()}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Go Back</span>
                </Button>
              )}
              
              {showHome && (
                <Link to="/">
                  <Button 
                    variant="default"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Home className="h-3.5 w-3.5" />
                    <span>Home</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default AppErrorBoundary;
