'use client';

import { useAuth } from '@/app/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, ArrowRight, FileText, MessageSquare, Bot } from 'lucide-react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Auto-redirigir usuarios autenticados
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Mostrar landing page para usuarios no autenticados
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Nexus RAG
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              AI-powered document processing and intelligent Q&A system
            </p>
            
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={() => router.push('/login')}
                size="lg"
                className="px-8"
              >
                Sign In <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                onClick={() => router.push('/register')}
                variant="outline"
                size="lg"
                className="px-8"
              >
                Get Started
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <FileText className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Document Processing</CardTitle>
                <CardDescription>
                  Upload and process your documents with AI
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Intelligent Q&A</CardTitle>
                <CardDescription>
                  Ask questions about your documents and get instant answers
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Bot className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>AI-Powered</CardTitle>
                <CardDescription>
                  Leverage advanced AI to understand your content
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null; // Este caso no debería ocurrir debido al useEffect
}