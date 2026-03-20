
import { auditLogger } from '../audit';

export type Permission =
  | 'READ_SOLICITATIONS'
  | 'WRITE_SOLICITATIONS'
  | 'APPROVE_SOLICITATIONS'
  | 'READ_PROPOSALS'
  | 'EVALUATE_PROPOSALS'
  | 'MANAGE_USERS'
  | 'VIEW_AUDIT_LOGS'
  | 'EXPORT_DATA';

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
    'VIEW_AUDIT_LOGS'
  ],
  CONTRACT_SPECIALIST: [
    'READ_SOLICITATIONS',
    'WRITE_SOLICITATIONS',
    'READ_PROPOSALS',
    'EVALUATE_PROPOSALS'
  ],
  PROGRAM_MANAGER: [
    'READ_SOLICITATIONS',
    'READ_PROPOSALS',
    'EVALUATE_PROPOSALS'
  ],
  LEGAL_REVIEWER: [
    'READ_SOLICITATIONS',
    'READ_PROPOSALS',
    'VIEW_AUDIT_LOGS'
  ],
  SMALL_BUSINESS_SPECIALIST: [
    'READ_SOLICITATIONS',
    'READ_PROPOSALS'
  ],
  SYSTEM_ADMIN: [
    'READ_SOLICITATIONS',
    'WRITE_SOLICITATIONS',
    'APPROVE_SOLICITATIONS',
    'READ_PROPOSALS',
    'EVALUATE_PROPOSALS',
    'MANAGE_USERS',
    'VIEW_AUDIT_LOGS',
    'EXPORT_DATA'
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
    try {
      // Implement PIV card authentication logic here
      // This would typically involve:
      // 1. Reading the PIV card certificate
      // 2. Validating the certificate chain
      // 3. Checking certificate revocation status
      // 4. Verifying the PIN
      return true;
    } catch (error) {
      console.error('PIV authentication failed:', error);
      return false;
    }
  }

  async authenticateWithCAC(): Promise<boolean> {
    try {
      // Implement CAC card authentication logic here
      // Similar to PIV but with CAC-specific requirements
      return true;
    } catch (error) {
      console.error('CAC authentication failed:', error);
      return false;
    }
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
