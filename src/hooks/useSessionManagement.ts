
import { useEffect } from 'react';
import { SESSION_TIMEOUT } from '@/constants/auth';
import { supabase } from '@/integrations/supabase/client';

export function useSessionManagement(handleSignOut: () => Promise<void>, lastActivity: number) {
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session && Date.now() - lastActivity > SESSION_TIMEOUT) {
        console.log('Session timeout - signing out');
        handleSignOut();
      }
    };

    const interval = setInterval(checkSession, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [handleSignOut, lastActivity]);
}
