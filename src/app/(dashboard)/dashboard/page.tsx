'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';

// Import shadcn/ui components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Import types
import type { Document, ChatMessage } from '@/types';

// Import molecules
import { DocumentCard } from '@/components/shared/molecules/DocumentCard';
import { MessageBubble } from '@/components/shared/molecules/MessageBubble';
import { QueryInput } from '@/components/shared/molecules/QueryInput';
import { FileUpload } from '@/components/shared/molecules/FileUpload';

// Import icons
import { Settings, LogOut, Bot } from 'lucide-react';


/**
 * Document management section
 */
function DocumentManager({ documents }: { documents: Document[] }) {
  const handleFileUpload = (files: FileList) => {
    // TODO: Implement file upload logic
    console.log('Uploading files:', files);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>My Documents</CardTitle>
          <FileUpload onFileUpload={handleFileUpload} />
        </div>
      </CardHeader>
      <CardContent>
        {documents.length > 0 ? (
          <div className="space-y-4">
            {documents.map(doc => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-4xl mb-4">📁</div>
            <p>No documents uploaded yet</p>
            <p className="text-sm">Upload your first document to get started with RAG</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Main chat interface for querying documents
 */
function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I can help you find information from your uploaded documents. What would you like to know?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);

    // TODO: Implement actual RAG query logic
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'I found relevant information in your documents. Here\'s what I found...',
        timestamp: new Date().toISOString(),
        sources: ['document1.pdf', 'document2.docx']
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Ask your documents
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4">
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <Card className="bg-muted">
              <CardContent className="p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
      
      <div className="p-4 border-t">
        <QueryInput
          value={query}
          onChange={setQuery}
          onSubmit={handleSubmit}
          disabled={isLoading}
        />
      </div>
    </Card>
  );
}

/**
 * Dashboard header component
 */
function DashboardHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold">Nexus RAG Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.user_metadata?.name || user?.email}</p>
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
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
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