
import { supabase } from "@/integrations/supabase/client";

export interface AuditEvent {
  action: string;
  userId: string;
  details?: Record<string, any>;
}

export const logAuditEvent = async (event: AuditEvent) => {
  try {
    await supabase.from('audit_logs').insert({
      user_id: event.userId,
      action: event.action,
      resource_type: 'auth',
      details: event.details,
      ip_address: window.sessionStorage.getItem('user_ip') || null,
      user_agent: navigator.userAgent
    });
  } catch (error) {
    console.error('Error logging audit event:', error);
  }
};
