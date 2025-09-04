import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { AuthCard } from './AuthCard';
import { FormField } from './FormField';
import { AuthDivider } from './AuthDivider';
import { SocialLoginButton } from './SocialLoginButton';

interface LoginFormProps {
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleLogin: () => void;
}

/**
 * Login form component with reusable auth components
 */
export function LoginForm({
  email,
  password,
  isLoading,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onGoogleLogin
}: LoginFormProps) {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to your Nexus RAG account"
      error={error}
      footerText="Don't have an account?"
      footerLinkText="Sign up here"
      footerLinkHref="/register"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          id="email"
          label="Email address"
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={onEmailChange}
          required
          autoComplete="email"
        />

        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={onPasswordChange}
          required
          autoComplete="current-password"
          helperText={
            <Link 
              href="/forgot-password" 
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          }
        />

        <div className="space-y-3">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>

          <AuthDivider />

          <SocialLoginButton
            provider="google"
            onClick={onGoogleLogin}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </div>
      </form>
    </AuthCard>
  );
}