'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, onAuthStateChange, logout as authLogout } from '@/app/services/auth.service';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener usuario actual al montar el componente
    const getUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    getUser();

    // This verifies auth accross the app (e.g., logout in another tab)
    const { data: { subscription } } = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    const result = await authLogout();
    if (!result.error) {
      setUser(null);
    }
    return result;
  };

  return { 
    user, 
    loading, 
    logout,
    isAuthenticated: !!user 
  };
}