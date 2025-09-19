'use client';

import { useAuth } from '@/app/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Settings, LogOut } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold">Nexus RAG Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.user_metadata?.name || user?.email}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button
              onClick={logout}
              variant="destructive"
              size="sm"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}