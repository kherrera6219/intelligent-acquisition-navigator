
import { createContext } from 'react';
import { User } from "@supabase/supabase-js";

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  userRole: string | null;
  isAuthorized: (requiredRole?: string) => boolean;
  resendVerificationEmail: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  isProcessing: boolean; // Add isProcessing property to fix the error
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  signOut: async () => {},
  userRole: null,
  isAuthorized: () => false,
  resendVerificationEmail: async () => {},
  resetPassword: async () => {},
  updatePassword: async () => {},
  isProcessing: false // Initialize isProcessing with a default value
});
