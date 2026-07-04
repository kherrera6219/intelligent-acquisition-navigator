/**
 * Single source of truth for the application's session lifetime policy.
 * Both the security layer (AccessControl) and the local self-contained auth
 * client (src/integrations/supabase/client.ts) must derive session expiry
 * from this constant so the enforced timeout and the documented policy
 * never drift apart.
 */
export const SESSION_TIMEOUT_MS = 1000 * 60 * 15; // 15 minutes
export const SESSION_TIMEOUT_MINUTES = SESSION_TIMEOUT_MS / 1000 / 60;
