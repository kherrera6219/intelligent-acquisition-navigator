
import { supabase } from "@/integrations/supabase/client";
import { logAuditEvent } from "./auditService";

export class AuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const fetchUserRole = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();

    if (error) {
      throw new AuthError(
        'Failed to fetch user role. Please try again later.',
        'ROLE_FETCH_ERROR'
      );
    }

    await logAuditEvent({
      action: 'FETCH_USER_ROLE',
      userId,
      details: { role: data?.role }
    });

    return data?.role;
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError('An unexpected error occurred while fetching user role.');
  }
};

export const login = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        throw new AuthError('Invalid email or password. Please try again.', 'INVALID_CREDENTIALS');
      } else if (error.message.includes('Email not confirmed')) {
        throw new AuthError('Please verify your email address before logging in.', 'EMAIL_NOT_VERIFIED');
      }
      throw new AuthError(error.message, 'LOGIN_ERROR');
    }
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError('An unexpected error occurred during login.');
  }
};

export const signup = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) {
      if (error.message.includes('already registered')) {
        throw new AuthError('This email is already registered. Please login instead.', 'EMAIL_IN_USE');
      } else if (error.message.includes('password')) {
        throw new AuthError('Password must be at least 6 characters long.', 'INVALID_PASSWORD');
      }
      throw new AuthError(error.message, 'SIGNUP_ERROR');
    }
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError('An unexpected error occurred during signup.');
  }
};

export const signOut = async (userId: string) => {
  try {
    await logAuditEvent({
      action: 'USER_LOGOUT',
      userId,
      details: { trigger: 'user_action' }
    });
    
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new AuthError('Failed to sign out. Please try again.', 'SIGNOUT_ERROR');
    }
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError('An unexpected error occurred during sign out.');
  }
};

export const resendVerificationEmail = async (email: string | undefined, userId: string | undefined) => {
  try {
    if (!email) {
      throw new AuthError('Email address is required.', 'MISSING_EMAIL');
    }

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    if (error) {
      if (error.message.includes('rate limit')) {
        throw new AuthError('Please wait a few minutes before requesting another verification email.', 'RATE_LIMIT');
      }
      throw new AuthError(error.message, 'VERIFICATION_ERROR');
    }

    if (userId) {
      await logAuditEvent({
        action: 'RESEND_VERIFICATION_EMAIL',
        userId,
        details: { email }
      });
    }
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError('Failed to resend verification email.');
  }
};

export const getRoleHierarchy = (userRole: string, requiredRole: string): boolean => {
  const roleHierarchy = {
    'admin': 3,
    'manager': 2,
    'user': 1
  };

  if (!(userRole in roleHierarchy) || !(requiredRole in roleHierarchy)) {
    throw new AuthError('Invalid role specified.', 'INVALID_ROLE');
  }

  return roleHierarchy[userRole as keyof typeof roleHierarchy] >= 
         roleHierarchy[requiredRole as keyof typeof roleHierarchy];
};
