
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
}

export interface AuditLogPayload {
  action: string;
  resourceType: string;
  resourceId: string;
  details?: Record<string, unknown>;
}

class AuditLogger {
  private static instance: AuditLogger;
  private apiClient = createAPIClient('/api');

  private constructor() {}

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
      });
    } catch (error) {
      console.error('Failed to create audit log:', error);
      // Don't throw - audit logging should not break main functionality
    }
  }

  async getAuditLogs(filters?: Partial<AuditLog>): Promise<AuditLog[]> {
    return this.apiClient.get<AuditLog[]>('/audit-logs', {
      params: filters,
    });
  }
}

export const auditLogger = AuditLogger.getInstance();
