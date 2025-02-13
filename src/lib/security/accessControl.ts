
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
  private userRole: Role | null = null;

  private constructor() {}

  static getInstance(): AccessControl {
    if (!AccessControl.instance) {
      AccessControl.instance = new AccessControl();
    }
    return AccessControl.instance;
  }

  setUserRole(role: Role) {
    this.userRole = role;
  }

  hasPermission(permission: Permission): boolean {
    if (!this.userRole) return false;
    return rolePermissions[this.userRole].includes(permission);
  }

  hasRole(role: Role): boolean {
    return this.userRole === role;
  }

  getRolePermissions(role: Role): Permission[] {
    return rolePermissions[role];
  }

  getCurrentUserPermissions(): Permission[] {
    if (!this.userRole) return [];
    return rolePermissions[this.userRole];
  }
}

export const accessControl = AccessControl.getInstance();
