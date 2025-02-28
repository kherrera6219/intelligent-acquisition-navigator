
import { AuditEvent, logAudit } from '@/lib/audit';

/**
 * Log an audit event
 */
export const auditLogger = (event: Omit<AuditEvent, 'id' | 'timestamp'>): void => {
  logAudit({
    action: event.action,
    module: event.module,
    details: event.details,
    status: event.status,
    metadata: event.metadata,
  });
};
