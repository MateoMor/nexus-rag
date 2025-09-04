import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

interface AuthCardProps {
  title: string;
  description: string;
  error: string | null;
  children: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

/**
 * Reusable card wrapper for auth forms
 */
export function AuthCard({
  title,
  description,
  error,
  children,
  footerText,
  footerLinkText,
  footerLinkHref
}: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {children}

          <div className="text-center text-sm text-muted-foreground">
            {footerText}{' '}
            <Link href={footerLinkHref} className="text-primary hover:underline font-medium">
              {footerLinkText}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}