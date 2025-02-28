
import { auditLogger } from '../audit';

export interface ErrorDetails {
  name: string;
  message: string;
  stack?: string;
  component?: string;
  action?: string;
  metadata?: Record<string, any>;
}

class ErrorTrackingService {
  private enabled: boolean = true;
  private projectId: string = '';
  private environment: string = 'development';
  
  public initialize(options: { projectId: string; enabled?: boolean; environment?: string }) {
    this.projectId = options.projectId;
    this.enabled = options.enabled !== false;
    this.environment = options.environment || 'development';
    
    // Set up global error handlers
    if (typeof window !== 'undefined' && this.enabled) {
      window.addEventListener('error', this.handleGlobalError);
      window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
    }
    
    console.log(`Error tracking initialized for project ${this.projectId} in ${this.environment} environment`);
  }
  
  public trackError(error: Error | string, metadata?: Record<string, any>) {
    if (!this.enabled) return;
    
    const errorObj = typeof error === 'string' ? new Error(error) : error;
    const details: ErrorDetails = {
      name: errorObj.name,
      message: errorObj.message,
      stack: errorObj.stack,
      metadata,
    };
    
    this.processError(details);
  }
  
  public trackComponentError(error: Error, component: string, action?: string, metadata?: Record<string, any>) {
    if (!this.enabled) return;
    
    const details: ErrorDetails = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      component,
      action,
      metadata,
    };
    
    this.processError(details);
  }
  
  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }
  
  public setEnvironment(environment: string) {
    this.environment = environment;
  }
  
  private processError(details: ErrorDetails) {
    // Log the error to the console in development
    if (this.environment === 'development') {
      console.error('Error tracked:', details);
    }
    
    // In a real app, this would send the error to a service like Sentry, LogRocket, etc.
    // For now, we'll just log it using our audit logger
    auditLogger.log({
      action: 'ERROR',
      resource: details.component || 'application',
      details: {
        errorName: details.name,
        errorMessage: details.message,
        action: details.action,
        metadata: details.metadata,
      },
      status: 'error',
    });
  }
  
  private handleGlobalError = (event: ErrorEvent) => {
    this.trackError(event.error || new Error(event.message), {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  }
  
  private handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    const error = typeof event.reason === 'object' && event.reason instanceof Error
      ? event.reason
      : new Error(String(event.reason));
    
    this.trackError(error, {
      type: 'unhandledrejection',
    });
  }
}

export const errorTracker = new ErrorTrackingService();
