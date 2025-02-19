
import { supabase } from "@/integrations/supabase/client";

export interface AuditEvent {
  action: string;
  userId: string;
  details?: Record<string, any>;
}

export class AuditError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AuditError';
  }
}

export const logAuditEvent = async (event: AuditEvent) => {
  try {
    const { error } = await supabase.from('audit_logs').insert({
      user_id: event.userId,
      action: event.action,
      resource_type: 'auth',
      details: event.details,
      ip_address: window.sessionStorage.getItem('user_ip') || null,
      user_agent: navigator.userAgent
    });

    if (error) {
      throw new AuditError('Failed to log audit event', 'AUDIT_LOG_ERROR');
    }
  } catch (error) {
    console.error('Error logging audit event:', error);
    // We don't throw here to prevent audit errors from breaking main functionality
  }
};
