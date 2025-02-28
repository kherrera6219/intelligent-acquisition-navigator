
/**
 * Utility for logging audit events
 */

export enum AuditEvent {
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGOUT = 'USER_LOGOUT',
  USER_REGISTER = 'USER_REGISTER',
  PASSWORD_RESET = 'PASSWORD_RESET',
  PROPOSAL_CREATE = 'PROPOSAL_CREATE',
  PROPOSAL_UPDATE = 'PROPOSAL_UPDATE',
  PROPOSAL_DELETE = 'PROPOSAL_DELETE',
  PROPOSAL_STATUS_CHANGE = 'PROPOSAL_STATUS_CHANGE',
  EVALUATION_ADD = 'EVALUATION_ADD',
  EVALUATION_DELETE = 'EVALUATION_DELETE',
  ATTACHMENT_ADD = 'ATTACHMENT_ADD',
  ATTACHMENT_DELETE = 'ATTACHMENT_DELETE',
  ATTACHMENT_DOWNLOAD = 'ATTACHMENT_DOWNLOAD',
  SYSTEM_ERROR = 'SYSTEM_ERROR'
}

/**
 * Log an audit event
 * @param event The audit event type
 * @param details Additional details about the event
 * @param userId Optional user ID associated with the event
 */
export const logAudit = (
  event: AuditEvent,
  details: Record<string, any>,
  userId?: string
): void => {
  try {
    // In a real implementation, this would send to a server or log service
    console.log('[AUDIT]', {
      event,
      details,
      userId: userId || 'anonymous',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error logging audit event:', error);
  }
};

/**
 * Log an error as an audit event
 * @param error The error object
 * @param context Additional context information
 * @param userId Optional user ID
 */
export const logErrorAudit = (
  error: Error,
  context: Record<string, any>,
  userId?: string
): void => {
  logAudit(
    AuditEvent.SYSTEM_ERROR,
    {
      error: error.message,
      stack: error.stack,
      ...context
    },
    userId
  );
};
