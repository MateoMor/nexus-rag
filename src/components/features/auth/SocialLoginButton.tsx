import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/atoms/Icon';

interface SocialLoginButtonProps {
  provider: 'google' | 'github' | 'facebook';
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

/**
 * Reusable social login button component
 */
export function SocialLoginButton({ 
  provider, 
  onClick, 
  disabled, 
  isLoading 
}: SocialLoginButtonProps) {
  const getProviderText = (provider: string) => {
    switch (provider) {
      case 'google': return 'Continue with Google';
      case 'github': return 'Continue with GitHub';
      case 'facebook': return 'Continue with Facebook';
      default: return `Continue with ${provider}`;
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      <Icon name={provider} size="sm" className="mr-2" />
      {getProviderText(provider)}
    </Button>
  );
}