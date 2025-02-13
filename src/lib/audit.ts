
import { createAPIClient } from './apiClient';

export interface AuditLog {
  id: string;
  timestamp: Date;
  action: string;
  userId: string;
  resourceType: string;
  resourceId: string;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  status: 'SUCCESS' | 'FAILURE';
  sessionId: string;
  systemComponent: string;
}

export interface AuditLogPayload {
  action: string;
  resourceType: string;
  resourceId: string;
  details?: Record<string, unknown>;
  severity?: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  systemComponent?: string;
}

export interface AuditLogFilters {
  userId?: string;
  action?: string;
  resourceType?: string;
  fromDate?: Date;
  toDate?: Date;
  severity?: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  status?: 'SUCCESS' | 'FAILURE';
}

class AuditLogger {
  private static instance: AuditLogger;
  private apiClient = createAPIClient('/api');
  private sessionId: string;

  private constructor() {
    this.sessionId = crypto.randomUUID();
  }

  static getInstance(): AuditLogger {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger();
    }
    return AuditLogger.instance;
  }

  async log(payload: AuditLogPayload): Promise<void> {
    try {
      await this.apiClient.post<void>('/audit-logs', {
        ...payload,
        timestamp: new Date(),
        ipAddress: window.location.hostname,
        userAgent: navigator.userAgent,
        sessionId: this.sessionId,
        severity: payload.severity || 'INFO',
        status: 'SUCCESS',
        systemComponent: payload.systemComponent || 'FRONTEND'
      });
    } catch (error) {
      console.error('Failed to create audit log:', error);
      // Create a local fallback log for failed audit attempts
      this.createLocalFailureLog(payload, error);
    }
  }

  private createLocalFailureLog(payload: AuditLogPayload, error: unknown): void {
    const failureLog = {
      ...payload,
      timestamp: new Date(),
      status: 'FAILURE',
      error: error instanceof Error ? error.message : 'Unknown error',
      sessionId: this.sessionId
    };
    
    // Store in IndexedDB or localStorage as backup
    try {
      const logs = JSON.parse(localStorage.getItem('failedAuditLogs') || '[]');
      logs.push(failureLog);
      localStorage.setItem('failedAuditLogs', JSON.stringify(logs));
    } catch (e) {
      console.error('Failed to store local audit log:', e);
    }
  }

  async getAuditLogs(filters?: AuditLogFilters): Promise<AuditLog[]> {
    const queryString = filters ? `?${new URLSearchParams(this.serializeFilters(filters))}` : '';
    return this.apiClient.get<AuditLog[]>(`/audit-logs${queryString}`);
  }

  async retryFailedLogs(): Promise<void> {
    try {
      const failedLogs = JSON.parse(localStorage.getItem('failedAuditLogs') || '[]');
      if (failedLogs.length === 0) return;

      for (const log of failedLogs) {
        await this.log(log);
      }
      
      localStorage.removeItem('failedAuditLogs');
    } catch (error) {
      console.error('Failed to retry failed audit logs:', error);
    }
  }

  private serializeFilters(filters: AuditLogFilters): Record<string, string> {
    const serialized: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        if (value instanceof Date) {
          serialized[key] = value.toISOString();
        } else {
          serialized[key] = String(value);
        }
      }
    });
    return serialized;
  }
}

export const auditLogger = AuditLogger.getInstance();
