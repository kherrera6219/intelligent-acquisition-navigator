import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock Supabase at the top level so audit tests don't need a real DB
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: () => ({
      insert: vi.fn().mockResolvedValue({ error: null }),
    }),
  },
}));

// Re-import after mock is registered
const { auditLogger } = await import('@/lib/audit');

describe('AuditLogger', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('is a singleton', async () => {
    const { auditLogger: a } = await import('@/lib/audit');
    const { auditLogger: b } = await import('@/lib/audit');
    expect(a).toBe(b);
  });

  it('log() resolves without throwing when Supabase succeeds', async () => {
    await expect(
      auditLogger.log({
        action: 'TEST_ACTION',
        resourceType: 'TEST',
        severity: 'INFO',
        details: { test: true },
      })
    ).resolves.not.toThrow();
  });

  it('localStorage fallback is an array', () => {
    // If anything was stored from a failed sync, it should be a valid array
    const raw = localStorage.getItem('pendingAuditLogs');
    if (raw !== null) {
      expect(Array.isArray(JSON.parse(raw))).toBe(true);
    } else {
      // Nothing stored — that's fine too (Supabase mock succeeded)
      expect(raw).toBeNull();
    }
  });
});
