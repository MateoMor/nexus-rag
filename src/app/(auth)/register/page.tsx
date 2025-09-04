'use client';

import { useState } from 'react';
import { register, signInWithGoogle } from '@/app/services/auth.service';
import { useRouter } from 'next/navigation';
import { RegisterForm } from '@/components/features/auth/RegisterForm';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Validate password confirmation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }
    
    try {
      const result = await register({ name, email, password });
      
      if (result.error) {
        setError(result.error);
      } else if (result.user) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      setError('Unexpected error during registration');
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
    <RegisterForm
      name={name}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      isLoading={isLoading}
      error={error}
      onNameChange={setName}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onConfirmPasswordChange={setConfirmPassword}
      onSubmit={handleSubmit}
      onGoogleLogin={handleGoogleLogin}
    />
  );
}