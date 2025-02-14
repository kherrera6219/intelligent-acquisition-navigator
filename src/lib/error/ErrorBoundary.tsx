
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { errorTracker } from '@/lib/security/errorTracking';
import { auditLogger } from '@/lib/audit';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    
    // Track error
    errorTracker.trackError({
      message: error.message,
      stack: error.stack,
      component: errorInfo.componentStack,
      severity: 'HIGH',
      errorType: 'APPLICATION',
      status: 'NEW'
    });

    // Log to audit system
    auditLogger.log({
      action: 'ERROR_OCCURRED',
      resourceType: 'APPLICATION',
      resourceId: 'system',
      severity: 'ERROR',
      details: {
        error: error.message,
        componentStack: errorInfo.componentStack
      }
    }).catch(console.error);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Alert variant="destructive" className="max-w-lg">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>
              <p className="mt-2 text-sm text-muted-foreground">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
              <div className="mt-4 flex space-x-4">
                <Button
                  variant="outline"
                  onClick={this.handleReset}
                >
                  Try Again
                </Button>
                <Button
                  onClick={this.handleReload}
                >
                  Refresh Page
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}
