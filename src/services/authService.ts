
import { supabase } from "@/integrations/supabase/client";
import { logAuditEvent } from "./auditService";

export const fetchUserRole = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single();

  if (error) throw error;

  await logAuditEvent({
    action: 'FETCH_USER_ROLE',
    userId,
    details: { role: data?.role }
  });

  return data?.role;
};

export const login = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
};

export const signup = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
};

export const signOut = async (userId: string) => {
  await logAuditEvent({
    action: 'USER_LOGOUT',
    userId,
    details: { trigger: 'user_action' }
  });
  
  return supabase.auth.signOut();
};

export const resendVerificationEmail = async (email: string | undefined, userId: string | undefined) => {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
  });

  if (error) throw error;

  if (userId) {
    await logAuditEvent({
      action: 'RESEND_VERIFICATION_EMAIL',
      userId,
      details: { email }
    });
  }
};

export const getRoleHierarchy = (userRole: string, requiredRole: string): boolean => {
  const roleHierarchy = {
    'admin': 3,
    'manager': 2,
    'user': 1
  };

  return roleHierarchy[userRole as keyof typeof roleHierarchy] >= 
         roleHierarchy[requiredRole as keyof typeof roleHierarchy];
};
