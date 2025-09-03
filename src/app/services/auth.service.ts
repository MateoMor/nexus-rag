import {supabase} from '@/lib/supabase/supabaseClient';
import type { User, AuthError } from '@supabase/supabase-js';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User | null;
  error?: string;
}

/**
 * Initiate user login
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      return { user: null, error: error.message };
    }

    return { user: data.user };
  } catch (error) {
    return { 
      user: null, 
      error: error instanceof Error ? error.message : 'Unexpected error during login' 
    };
  }
}

/**
 * Register new users
 */
export async function register(registerData: RegisterData): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: registerData.email,
      password: registerData.password,
      options: {
        data: {
          name: registerData.name,
        }
      }
    });

    if (error) {
      return { user: null, error: error.message };
    }

    return { user: data.user };
  } catch (error) {
    return { 
      user: null, 
      error: error instanceof Error ? error.message : 
          'Unexpected error during registration'
    };
  }
}

/**
 * Logout user
 */
export async function logout(): Promise<{ error?: string }> {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return { error: error.message };
    }

    return {};
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : 'Unexpected error during logout'
    };
  }
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Login with Google OAuth
 */
export async function signInWithGoogle(): Promise<{ error?: string }> {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      return { error: error.message };
    }

    return {};
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : 'Error with Google OAuth' 
    };
  }
}

/**
 * Reset password
 */
export async function resetPassword(email: string): Promise<{ error?: string }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      return { error: error.message };
    }

    return {};
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : 'Error sending recovery email' 
    };
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}

/**
 * Update user profile
 */
export async function updateProfile(updates: { full_name?: string; avatar_url?: string }): Promise<{ error?: string }> {
  try {
    const { error } = await supabase.auth.updateUser({
      data: updates
    });

    if (error) {
      return { error: error.message };
    }

    return {};
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : 'Error updating profile' 
    };
  }
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user ?? null);
  });
}