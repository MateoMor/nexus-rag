import {supabase} from '@/lib/supabase/supabaseClient';
import type { User, AuthError } from '@supabase/supabase-js';

/**
 * Interface for login credentials
 */
export interface LoginCredentials {
  /** User's email address */
  email: string;
  /** User's password */
  password: string;
}

/**
 * Interface for user registration data
 */
export interface RegisterData {
  /** User's email address */
  email: string;
  /** User's password (minimum 6 characters) */
  password: string;
  /** User's full name */
  name: string;
}

/**
 * Interface for authentication response
 */
export interface AuthResponse {
  /** Authenticated user object or null if failed */
  user: User | null;
  /** Error message if authentication failed */
  error?: string;
}

/**
 * Authenticates a user with email and password
 * 
 * @param credentials - Object containing email and password
 * @returns Promise<AuthResponse> - User object on success, error message on failure
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
 * Registers a new user account
 * 
 * @param registerData - Object containing email, password, and name
 * @returns Promise<AuthResponse> - User object on success, error message on failure
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
 * Signs out the current user
 * 
 * @returns Promise<{ error?: string }> - Error message if logout failed
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
 * Retrieves the current authenticated user
 * 
 * @returns Promise<User | null> - Current user object or null if not authenticated
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
 * Initiates Google OAuth authentication
 * 
 * @returns Promise<{ error?: string }> - Error message if OAuth initiation failed
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
 * Sends a password reset email to the user
 * 
 * @param email - User's email address for password reset
 * @returns Promise<{ error?: string }> - Error message if reset failed
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
      error: error instanceof Error ? error.message : 'Error sending reset email'
    };
  }
}

/**
 * Checks if a user is currently authenticated
 * 
 * @returns Promise<boolean> - True if user is authenticated, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}

/**
 * Updates the current user's profile information
 * 
 * @param updates - Object containing profile updates (full_name, avatar_url)
 * @returns Promise<{ error?: string }> - Error message if update failed
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
 * Sets up a listener for authentication state changes
 * 
 * @param callback - Function to call when auth state changes
 * @returns Subscription object with unsubscribe method
 */
export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user ?? null);
  });
}