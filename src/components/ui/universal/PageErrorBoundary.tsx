
import React, { Component, ErrorInfo } from 'react';
import { ErrorDisplay } from './ErrorDisplay';
import { Button } from '@/components/ui/button';
import { Home, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class PageErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console during development
    console.error('PageErrorBoundary caught an error:', error, errorInfo);
    
    // Set the error info in state
    this.setState({ errorInfo });
    
    // TODO: In production, send error to error monitoring service
    // Example: if (process.env.NODE_ENV === 'production') { sendToErrorMonitoring(error, errorInfo); }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center p-4">
          <div className="max-w-md w-full">
            <ErrorDisplay 
              error={this.state.error}
              errorInfo={this.state.errorInfo}
              resetError={this.resetError}
            />
            
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={this.resetError}
                variant="outline"
                className="w-full sm:w-auto flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Try Again</span>
              </Button>
              
              <Link to="/" className="w-full sm:w-auto">
                <Button 
                  variant="default"
                  className="w-full flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  <span>Return Home</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
