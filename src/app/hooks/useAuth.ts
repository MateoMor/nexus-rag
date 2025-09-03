'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, onAuthStateChange, logout as authLogout } from '@/app/services/auth.service';
import type { User } from '@supabase/supabase-js';

/**
 * Custom React hook for managing authentication state
 * 
 * This hook provides authentication state management across the application,
 * including user data, loading states, and authentication methods.
 * 
 * @returns Object containing user state, loading state, logout function, and authentication status
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Fetches the current user on component mount
     */
    const getUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    getUser();

    // Listen for auth state changes across tabs/windows
    const { data: { subscription } } = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Logs out the current user and updates local state
   * 
   * @returns Promise<{ error?: string }> - Result of logout operation
   */
  const logout = async () => {
    const result = await authLogout();
    if (!result.error) {
      setUser(null);
    }
    return result;
  };

  return { 
    /** Current authenticated user or null */
    user, 
    /** Loading state during authentication checks */
    loading, 
    /** Function to logout the current user */
    logout,
    /** Boolean indicating if user is authenticated */
    isAuthenticated: !!user 
  };
}