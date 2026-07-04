import { describe, it, expect, beforeEach } from 'vitest';
import { supabase } from '../client';

const USERS_STORAGE_KEY = '__ian_users';

describe('local supabase-compatible client — security regressions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('password storage (code review Finding #2)', () => {
    it('never stores the plaintext password in localStorage', async () => {
      await supabase.auth.signUp({ email: 'user@example.com', password: 'S3cretPassw0rd!' });

      const raw = localStorage.getItem(USERS_STORAGE_KEY);
      expect(raw).not.toBeNull();
      expect(raw).not.toContain('S3cretPassw0rd!');

      const users = JSON.parse(raw as string) as Array<Record<string, unknown>>;
      expect(users).toHaveLength(1);
      expect(users[0].password).toBeUndefined();
      expect(typeof users[0].passwordHash).toBe('string');
      expect((users[0].passwordHash as string).length).toBeGreaterThan(0);
      expect(typeof users[0].passwordSalt).toBe('string');
    });

    it('allows sign-in with the correct password', async () => {
      await supabase.auth.signUp({ email: 'user2@example.com', password: 'CorrectHorseBattery1' });
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'user2@example.com',
        password: 'CorrectHorseBattery1',
      });

      expect(error).toBeNull();
      expect(data?.user.email).toBe('user2@example.com');
    });

    it('rejects sign-in with an incorrect password', async () => {
      await supabase.auth.signUp({ email: 'user3@example.com', password: 'RightPassword1' });
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'user3@example.com',
        password: 'WrongPassword1',
      });

      expect(data).toBeNull();
      expect(error?.message).toMatch(/invalid/i);
    });
  });

  describe('role privilege escalation prevention (code review Finding #1)', () => {
    it('signs up new users with the lowest-privilege default role', async () => {
      const { data } = await supabase.auth.signUp({
        email: 'default-role@example.com',
        password: 'SomePassword1',
      });

      expect(data?.user.user_metadata?.role).toBe('CONTRACT_SPECIALIST');
    });

    it('strips an attempted "role" change from updateUser, even if submitted', async () => {
      await supabase.auth.signUp({ email: 'escalate@example.com', password: 'SomePassword1' });

      const { data, error } = await supabase.auth.updateUser({
        data: { role: 'SYSTEM_ADMIN', fullName: 'Attempted Escalation' },
      });

      expect(error).toBeNull();
      // The role must remain unchanged — only non-authorization fields may be updated.
      expect(data?.user.user_metadata?.role).toBe('CONTRACT_SPECIALIST');
      expect(data?.user.user_metadata?.fullName).toBe('Attempted Escalation');
    });
  });
});
