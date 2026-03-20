
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
  private isAPIAvailable: boolean = true;

  private constructor() {
    this.sessionId = crypto.randomUUID();
    // Check if API is available
    this.checkAPIAvailability();
  }

  static getInstance(): AuditLogger {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger();
    }
    return AuditLogger.instance;
  }

  private async checkAPIAvailability(): Promise<void> {
    try {
      await this.apiClient.get('/health-check');
      this.isAPIAvailable = true;
    } catch (error) {
      this.isAPIAvailable = false;
      console.warn('Audit logging API is not available, falling back to local storage');
    }
  }

  async log(payload: AuditLogPayload): Promise<void> {
    const logEntry = {
      ...payload,
      timestamp: new Date(),
      ipAddress: window.location.hostname,
      userAgent: navigator.userAgent,
      sessionId: this.sessionId,
      severity: payload.severity || 'INFO',
      status: 'SUCCESS',
      systemComponent: payload.systemComponent || 'FRONTEND'
    };

    if (!this.isAPIAvailable) {
      this.createLocalFailureLog(payload, new Error('API not available'));
      return;
    }

    try {
      await this.apiClient.post<void>('/audit-logs', logEntry);
    } catch (error) {
      // Don't throw the error, just store locally
      this.createLocalFailureLog(payload, error);
    }
  }

  private readonly MAX_LOCAL_LOGS = 200;

  private createLocalFailureLog(payload: AuditLogPayload, error: unknown): void {
    const failureLog = {
      ...payload,
      timestamp: new Date(),
      status: 'FAILURE',
      error: error instanceof Error ? error.message : 'Unknown error',
      sessionId: this.sessionId
    };

    try {
      const logs = JSON.parse(localStorage.getItem('failedAuditLogs') || '[]');
      logs.push(failureLog);
      // Keep only the most recent entries to avoid exceeding localStorage limits
      const trimmed = logs.length > this.MAX_LOCAL_LOGS
        ? logs.slice(logs.length - this.MAX_LOCAL_LOGS)
        : logs;
      localStorage.setItem('failedAuditLogs', JSON.stringify(trimmed));
    } catch (e) {
      console.error('Failed to store local audit log:', e);
    }
  }

  async getAuditLogs(filters?: AuditLogFilters): Promise<AuditLog[]> {
    if (!this.isAPIAvailable) {
      // Return empty array if API is not available
      return [];
    }

    try {
      const queryString = filters ? `?${new URLSearchParams(this.serializeFilters(filters))}` : '';
      return await this.apiClient.get<AuditLog[]>(`/audit-logs${queryString}`);
    } catch (error) {
      console.warn('Failed to fetch audit logs:', error);
      return [];
    }
  }

  async retryFailedLogs(): Promise<void> {
    if (!this.isAPIAvailable) return;

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
