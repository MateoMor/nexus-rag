'use client';

import { useState } from 'react';
import { login, signInWithGoogle } from '@/app/services/auth.service';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/features/auth/LoginForm';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await login({ email, password });
      
      if (result.error) {
        setError(result.error);
      } else if (result.user) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      setError('Unexpected error during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      if (result.error) {
        setError(result.error);
      }
    } catch (error) {
      setError('Error with Google OAuth');
    }
  };

  return (
    <LoginForm
      email={email}
      password={password}
      isLoading={isLoading}
      error={error}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      onGoogleLogin={handleGoogleLogin}
    />
  );
}