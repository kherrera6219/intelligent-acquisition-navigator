
import { nanoid } from 'nanoid';
import createAPIClient from './apiClient';

/**
 * Audit event types
 */
export type AuditModule = 'SECURITY' | 'VALIDATION' | 'SYSTEM' | 'APPLICATION';

export interface AuditEvent {
  id?: string;
  timestamp?: string;
  userId?: string;
  action: string;
  module: AuditModule;
  details?: string;
  status?: 'success' | 'error' | 'warning' | 'info';
  metadata?: Record<string, any>;
}

// Create API client for audit events
const auditClient = createAPIClient({
  baseUrl: '/api',
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
});

/**
 * Log an audit event
 */
export const logAudit = async (event: AuditEvent): Promise<void> => {
  try {
    const auditEvent = {
      id: event.id || nanoid(),
      timestamp: event.timestamp || new Date().toISOString(),
      userId: event.userId || 'anonymous',
      action: event.action,
      module: event.module,
      details: event.details || '',
      status: event.status || 'info',
      metadata: event.metadata || {},
    };

    // Log to server if online
    if (navigator.onLine) {
      await auditClient.post('/audit', auditEvent);
    }

    // Also log to console for debugging
    console.log(`[Audit] ${auditEvent.module} - ${auditEvent.action}`);
  } catch (error) {
    console.error('Failed to log audit event:', error);
  }
};
