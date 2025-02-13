
interface ErrorDetails {
  message: string;
  stack?: string;
  timestamp: Date;
  userId?: string;
  component?: string;
  additionalData?: Record<string, unknown>;
}

class ErrorTracker {
  private static instance: ErrorTracker;
  private errors: ErrorDetails[] = [];
  private readonly MAX_ERRORS = 100;

  private constructor() {
    window.onerror = (message, source, lineno, colno, error) => {
      this.trackError({
        message: message.toString(),
        stack: error?.stack,
        component: source,
        additionalData: { lineno, colno }
      });
    };
  }

  static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }

  trackError(details: Omit<ErrorDetails, 'timestamp'>): void {
    const errorDetails: ErrorDetails = {
      ...details,
      timestamp: new Date()
    };

    this.errors.unshift(errorDetails);
    if (this.errors.length > this.MAX_ERRORS) {
      this.errors.pop();
    }

    // Log to audit system
    const { auditLogger } = require('../audit');
    auditLogger.log({
      action: 'ERROR_OCCURRED',
      resourceType: 'ERROR',
      resourceId: 'system',
      details: errorDetails
    }).catch(console.error);
  }

  getRecentErrors(): ErrorDetails[] {
    return [...this.errors];
  }

  clearErrors(): void {
    this.errors = [];
  }
}

export const errorTracker = ErrorTracker.getInstance();
