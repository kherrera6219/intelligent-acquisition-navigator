
import { auditLogger } from '../audit';

interface ErrorDetails {
  message: string;
  stack?: string;
  timestamp: Date;
  userId?: string;
  component?: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  errorCode?: string;
  errorType: 'SECURITY' | 'VALIDATION' | 'SYSTEM' | 'APPLICATION';
  status: 'NEW' | 'INVESTIGATING' | 'RESOLVED';
  additionalData?: Record<string, unknown>;
}

class ErrorTracker {
  private static instance: ErrorTracker;
  private errors: ErrorDetails[] = [];
  private readonly MAX_ERRORS = 1000;
  private securityIncidents: ErrorDetails[] = [];

  private constructor() {
    window.onerror = (message, source, lineno, colno, error) => {
      this.trackError({
        message: message.toString(),
        stack: error?.stack,
        component: source,
        severity: 'MEDIUM',
        errorType: 'APPLICATION',
        status: 'NEW',
        additionalData: { lineno, colno }
      });
    };

    window.addEventListener('unhandledrejection', (event) => {
      this.trackError({
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        severity: 'HIGH',
        errorType: 'APPLICATION',
        status: 'NEW',
        additionalData: { reason: event.reason }
      });
    });
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

    // Track error in memory
    this.errors.unshift(errorDetails);
    if (this.errors.length > this.MAX_ERRORS) {
      this.errors.pop();
    }

    // Check if this is a security incident
    if (this.isSecurityIncident(errorDetails)) {
      this.securityIncidents.push(errorDetails);
      errorDetails.severity = 'CRITICAL';
      errorDetails.errorType = 'SECURITY';
    }

    // Convert ErrorDetails to Record<string, unknown> for audit logging
    const auditDetails: Record<string, unknown> = {
      message: errorDetails.message,
      stack: errorDetails.stack,
      timestamp: errorDetails.timestamp,
      userId: errorDetails.userId,
      component: errorDetails.component,
      severity: errorDetails.severity,
      errorCode: errorDetails.errorCode,
      errorType: errorDetails.errorType,
      status: errorDetails.status,
      additionalData: errorDetails.additionalData
    };

    // Log to audit system
    auditLogger.log({
      action: 'ERROR_OCCURRED',
      resourceType: 'ERROR',
      resourceId: errorDetails.errorCode || 'system',
      severity: this.mapSeverityToAudit(errorDetails.severity),
      details: auditDetails
    }).catch(console.error);
  }

  private isSecurityIncident(error: ErrorDetails): boolean {
    const securityKeywords = [
      'unauthorized', 'forbidden', 'invalid token', 'csrf',
      'xss', 'injection', 'authentication failed', 'access denied'
    ];

    return securityKeywords.some(keyword => 
      error.message.toLowerCase().includes(keyword) ||
      error.stack?.toLowerCase().includes(keyword)
    );
  }

  private mapSeverityToAudit(severity: ErrorDetails['severity']): 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL' {
    switch (severity) {
      case 'LOW': return 'INFO';
      case 'MEDIUM': return 'WARNING';
      case 'HIGH': return 'ERROR';
      case 'CRITICAL': return 'CRITICAL';
    }
  }

  getRecentErrors(): ErrorDetails[] {
    return [...this.errors];
  }

  getSecurityIncidents(): ErrorDetails[] {
    return [...this.securityIncidents];
  }

  clearErrors(): void {
    this.errors = [];
  }

  updateErrorStatus(errorCode: string, status: ErrorDetails['status']): void {
    const error = this.errors.find(e => e.errorCode === errorCode);
    if (error) {
      error.status = status;
      auditLogger.log({
        action: 'ERROR_STATUS_UPDATED',
        resourceType: 'ERROR',
        resourceId: errorCode,
        details: { oldStatus: error.status, newStatus: status }
      });
    }
  }
}

export const errorTracker = ErrorTracker.getInstance();
