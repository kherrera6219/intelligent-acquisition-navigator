
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

export interface AuditLogFilters {
  userId?: string;
  action?: string;
  resourceType?: string;
  fromDate?: Date;
  toDate?: Date;
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

  async getAuditLogs(filters?: AuditLogFilters): Promise<AuditLog[]> {
    const queryString = filters ? `?${new URLSearchParams(this.serializeFilters(filters))}` : '';
    return this.apiClient.get<AuditLog[]>(`/audit-logs${queryString}`);
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
