'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';

// Import types
import type { Document } from '@/types';

// Import features
import { DocumentManager } from '@/components/features/dashboard/DocumentManager';
import { ChatInterface } from '@/components/features/dashboard/ChatInterface';


/**
 * Main dashboard page component - Only Documents and Chat
 */
export default function DashboardPage() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  // Mock documents data
  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Company_Report_2024.pdf',
      type: 'pdf',
      size: 2048000,
      uploadDate: '2024-01-15',
      status: 'ready',
      chunks: 45
    },
    {
      id: '2',
      name: 'Product_Specifications.docx',
      type: 'docx',
      size: 1024000,
      uploadDate: '2024-01-14',
      status: 'processing',
      chunks: 23
    }
  ]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content Grid - Only Documents & Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DocumentManager documents={documents} />
          <ChatInterface />
        </div>
      </main>
    </div>
  );
}