
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class PageErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoBack = () => {
    window.history.back();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
          <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700">
            <div className="flex justify-center mb-6">
              <div className="bg-red-500/10 p-3 rounded-full">
                <AlertTriangle className="h-10 w-10 text-red-500" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-center text-white mb-4">Something went wrong</h1>
            
            <p className="text-gray-400 text-center mb-6">
              We're sorry, but there was an error loading this page. Please try refreshing or going back to the previous page.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 overflow-auto max-h-40 rounded border border-gray-700 bg-gray-900 p-4">
                <p className="text-red-400 text-sm font-mono">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <pre className="text-gray-500 text-xs mt-2 font-mono">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={this.handleReload} 
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Refresh Page
              </Button>
              <Button 
                onClick={this.handleGoBack} 
                variant="outline" 
                className="border-gray-700 hover:bg-gray-700"
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
