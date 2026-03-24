import { describe, it, expect, beforeEach } from 'vitest';
import { AccessControl, type Permission, type Role } from '../accessControl';

// Reset the singleton between tests by accessing the private instance
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resetSingleton = () => { (AccessControl as any).instance = undefined; };

describe('AccessControl', () => {
  beforeEach(() => {
    resetSingleton();
  });

  it('returns singleton instance', () => {
    const a = AccessControl.getInstance();
    const b = AccessControl.getInstance();
    expect(a).toBe(b);
  });

  it('has no permissions when security context is not set', () => {
    const ac = AccessControl.getInstance();
    expect(ac.getCurrentUserPermissions()).toEqual([]);
    expect(ac.hasPermission('READ_SOLICITATIONS')).toBe(false);
  });

  it('returns false for hasRole when no context', () => {
    const ac = AccessControl.getInstance();
    expect(ac.hasRole('CONTRACTING_OFFICER')).toBe(false);
  });

  describe('role permission matrix', () => {
    const roles: Role[] = [
      'CONTRACTING_OFFICER',
      'CONTRACT_SPECIALIST',
      'PROGRAM_MANAGER',
      'LEGAL_REVIEWER',
      'SMALL_BUSINESS_SPECIALIST',
      'SYSTEM_ADMIN',
    ];

    it.each(roles)('%s has READ_SOLICITATIONS', (role) => {
      const ac = AccessControl.getInstance();
      const perms = ac.getRolePermissions(role);
      expect(perms).toContain('READ_SOLICITATIONS' as Permission);
    });

    it('CONTRACTING_OFFICER can approve solicitations', () => {
      const ac = AccessControl.getInstance();
      expect(ac.getRolePermissions('CONTRACTING_OFFICER')).toContain('APPROVE_SOLICITATIONS');
    });

    it('PROGRAM_MANAGER cannot approve solicitations', () => {
      const ac = AccessControl.getInstance();
      expect(ac.getRolePermissions('PROGRAM_MANAGER')).not.toContain('APPROVE_SOLICITATIONS');
    });

    it('SYSTEM_ADMIN has all extended permissions', () => {
      const ac = AccessControl.getInstance();
      const perms = ac.getRolePermissions('SYSTEM_ADMIN');
      expect(perms).toContain('MANAGE_EVALUATIONS');
      expect(perms).toContain('MANAGE_CONTRACTS');
      expect(perms).toContain('LEGAL_REVIEW');
      expect(perms).toContain('SMALL_BUSINESS_REVIEW');
      expect(perms).toContain('QA_ACCESS');
    });

    it('LEGAL_REVIEWER has LEGAL_REVIEW permission', () => {
      const ac = AccessControl.getInstance();
      expect(ac.getRolePermissions('LEGAL_REVIEWER')).toContain('LEGAL_REVIEW');
    });

    it('SMALL_BUSINESS_SPECIALIST has SMALL_BUSINESS_REVIEW permission', () => {
      const ac = AccessControl.getInstance();
      expect(ac.getRolePermissions('SMALL_BUSINESS_SPECIALIST')).toContain('SMALL_BUSINESS_REVIEW');
    });
  });

  it('PIV auth returns false (not implemented)', async () => {
    const ac = AccessControl.getInstance();
    const result = await ac.authenticateWithPIV();
    expect(result).toBe(false);
  });

  it('CAC auth returns false (not implemented)', async () => {
    const ac = AccessControl.getInstance();
    const result = await ac.authenticateWithCAC();
    expect(result).toBe(false);
  });
});
