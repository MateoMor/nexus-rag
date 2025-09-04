import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { AuthCard } from './AuthCard';
import { FormField } from './FormField';
import { AuthDivider } from './AuthDivider';
import { SocialLoginButton } from './SocialLoginButton';

interface RegisterFormProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  error: string | null;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onConfirmPasswordChange: (confirmPassword: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleLogin: () => void;
}

/**
 * Register form component with reusable auth components
 */
export function RegisterForm({
  name,
  email,
  password,
  confirmPassword,
  isLoading,
  error,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onGoogleLogin
}: RegisterFormProps) {
  return (
    <AuthCard
      title="Create account"
      description="Join Nexus RAG and start building with AI"
      error={error}
      footerText="Already have an account?"
      footerLinkText="Sign in here"
      footerLinkHref="/login"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          id="name"
          label="Full name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={onNameChange}
          required
          autoComplete="name"
        />

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
          placeholder="Minimum 6 characters"
          value={password}
          onChange={onPasswordChange}
          required
          autoComplete="new-password"
          minLength={6}
        />

        <FormField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          required
          autoComplete="new-password"
        />

        <div className="space-y-3">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Creating account...' : 'Create account'}
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