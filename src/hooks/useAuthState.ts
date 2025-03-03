
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const { data } = await supabase.auth.getUser();
      
      if (data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
        
        // Fetch user role
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .single();
          
        if (roleData) {
          setUserRole(roleData.role);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setUserRole(null);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      setUser(null);
      setIsAuthenticated(false);
      setUserRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    
    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        fetchUserData();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthenticated(false);
        setUserRole(null);
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const isAuthorized = (requiredRole?: string) => {
    if (!isAuthenticated || !userRole) return false;
    if (!requiredRole) return true;
    
    // Simple role hierarchy check
    if (userRole === 'admin') return true;
    if (userRole === 'manager' && requiredRole !== 'admin') return true;
    return userRole === requiredRole;
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    userRole,
    isAuthorized,
    refreshUserData: fetchUserData
  };
};
