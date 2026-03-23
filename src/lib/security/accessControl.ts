
export type Permission =
  | 'READ_SOLICITATIONS'
  | 'WRITE_SOLICITATIONS'
  | 'APPROVE_SOLICITATIONS'
  | 'READ_PROPOSALS'
  | 'EVALUATE_PROPOSALS'
  | 'MANAGE_USERS'
  | 'VIEW_AUDIT_LOGS'
  | 'EXPORT_DATA'
  // Extended permissions matching navigation items
  | 'MANAGE_EVALUATIONS'
  | 'MANAGE_CONTRACTS'
  | 'LEGAL_REVIEW'
  | 'SMALL_BUSINESS_REVIEW'
  | 'QA_ACCESS';

export type Role = 
  | 'CONTRACTING_OFFICER'
  | 'CONTRACT_SPECIALIST'
  | 'PROGRAM_MANAGER'
  | 'LEGAL_REVIEWER'
  | 'SMALL_BUSINESS_SPECIALIST'
  | 'SYSTEM_ADMIN';

export interface AuthenticationMethod {
  type: 'PIV' | 'CAC' | 'PASSWORD';
  lastAuthenticated: Date;
  expiresAt: Date;
}

export interface SecurityContext {
  userId: string;
  role: Role;
  permissions: Permission[];
  authMethod: AuthenticationMethod;
  sessionId: string;
  ipAddress: string;
  userAgent: string;
}

const rolePermissions: Record<Role, Permission[]> = {
  CONTRACTING_OFFICER: [
    'READ_SOLICITATIONS',
    'WRITE_SOLICITATIONS',
    'APPROVE_SOLICITATIONS',
    'READ_PROPOSALS',
    'EVALUATE_PROPOSALS',
    'MANAGE_EVALUATIONS',
    'MANAGE_CONTRACTS',
    'VIEW_AUDIT_LOGS'
  ],
  CONTRACT_SPECIALIST: [
    'READ_SOLICITATIONS',
    'WRITE_SOLICITATIONS',
    'READ_PROPOSALS',
    'EVALUATE_PROPOSALS',
    'MANAGE_EVALUATIONS'
  ],
  PROGRAM_MANAGER: [
    'READ_SOLICITATIONS',
    'READ_PROPOSALS',
    'EVALUATE_PROPOSALS',
    'MANAGE_CONTRACTS'
  ],
  LEGAL_REVIEWER: [
    'READ_SOLICITATIONS',
    'READ_PROPOSALS',
    'VIEW_AUDIT_LOGS',
    'LEGAL_REVIEW'
  ],
  SMALL_BUSINESS_SPECIALIST: [
    'READ_SOLICITATIONS',
    'READ_PROPOSALS',
    'SMALL_BUSINESS_REVIEW'
  ],
  SYSTEM_ADMIN: [
    'READ_SOLICITATIONS',
    'WRITE_SOLICITATIONS',
    'APPROVE_SOLICITATIONS',
    'READ_PROPOSALS',
    'EVALUATE_PROPOSALS',
    'MANAGE_EVALUATIONS',
    'MANAGE_CONTRACTS',
    'MANAGE_USERS',
    'VIEW_AUDIT_LOGS',
    'EXPORT_DATA',
    'LEGAL_REVIEW',
    'SMALL_BUSINESS_REVIEW',
    'QA_ACCESS'
  ]
};

export class AccessControl {
  private static instance: AccessControl;
  private securityContext: SecurityContext | null = null;
  private readonly sessionTimeout = 1000 * 60 * 15; // 15 minutes

  private constructor() {
    this.startSessionMonitor();
  }

  static getInstance(): AccessControl {
    if (!AccessControl.instance) {
      AccessControl.instance = new AccessControl();
    }
    return AccessControl.instance;
  }

  private startSessionMonitor() {
    setInterval(() => {
      if (this.securityContext && this.securityContext.authMethod.expiresAt < new Date()) {
        this.logout();
        // Trigger re-authentication
        window.location.href = '/login';
      }
    }, 60000); // Check every minute
  }

  async authenticateWithPIV(): Promise<boolean> {
    // PIV card authentication requires a WebAuthn / PKCS#11 integration.
    // This feature is not yet implemented. Gate it so callers receive an
    // explicit false rather than a silently-passing stub.
    errorTracker.trackError({
      message: 'PIV authentication attempted but is not yet implemented',
      severity: 'HIGH',
      errorType: 'SECURITY',
      status: 'NEW',
    });
    return false;
  }

  async authenticateWithCAC(): Promise<boolean> {
    // CAC card authentication requires a WebAuthn / PKCS#11 integration.
    // This feature is not yet implemented. Gate it so callers receive an
    // explicit false rather than a silently-passing stub.
    errorTracker.trackError({
      message: 'CAC authentication attempted but is not yet implemented',
      severity: 'HIGH',
      errorType: 'SECURITY',
      status: 'NEW',
    });
    return false;
  }

  setSecurityContext(context: SecurityContext) {
    this.securityContext = context;
    // Log the authentication event
    auditLogger.log({
      action: 'USER_AUTHENTICATION',
      resourceType: 'AUTH',
      resourceId: context.userId,
      severity: 'INFO',
      details: {
        authMethod: context.authMethod.type,
        role: context.role,
        sessionId: context.sessionId
      }
    });
  }

  hasPermission(permission: Permission): boolean {
    if (!this.securityContext) return false;
    return rolePermissions[this.securityContext.role].includes(permission);
  }

  hasRole(role: Role): boolean {
    return this.securityContext?.role === role;
  }

  getRolePermissions(role: Role): Permission[] {
    return rolePermissions[role];
  }

  getCurrentUserPermissions(): Permission[] {
    if (!this.securityContext) return [];
    return rolePermissions[this.securityContext.role];
  }

  getSecurityContext(): SecurityContext | null {
    return this.securityContext;
  }

  logout() {
    if (this.securityContext) {
      auditLogger.log({
        action: 'USER_LOGOUT',
        resourceType: 'AUTH',
        resourceId: this.securityContext.userId,
        severity: 'INFO',
        details: {
          sessionId: this.securityContext.sessionId
        }
      });
    }
    this.securityContext = null;
  }
}

export const accessControl = AccessControl.getInstance();

// Import the audit logger and error tracker
import { auditLogger } from '../audit';
import { errorTracker } from './errorTracking';
