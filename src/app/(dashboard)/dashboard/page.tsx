'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';

// Import shadcn/ui components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/shared/atoms/spinner';

// Import refactored molecules
import { MetricCard } from '@/components/shared/molecules/MetricCard';
import { DocumentCard } from '@/components/shared/molecules/DocumentCard';
import { MessageBubble } from '@/components/shared/molecules/MessageBubble';
import { QueryInput } from '@/components/shared/molecules/QueryInput';
import { FileUpload } from '@/components/shared/molecules/FileUpload';
import { AutomationCard } from '@/components/shared/molecules/AutomationCard';
import { ActivityItem } from '@/components/shared/molecules/ActivityItem';

// Import icons
import { Settings, LogOut, Plus, Bot } from 'lucide-react';

/**
 * Interface for dashboard statistics
 */
interface DashboardStats {
  totalDocuments: number;
  totalQueries: number;
  storageUsed: number;
  queriesThisMonth: number;
  avgResponseTime: number;
  mostUsedFeature: string;
}

/**
 * Interface for document data
 */
interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'txt';
  size: number;
  uploadDate: string;
  status: 'processing' | 'ready' | 'error';
  chunks: number;
}

/**
 * Interface for chat messages
 */
interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: string[];
}

/**
 * Interface for automation workflows
 */
interface Automation {
  id: string;
  name: string;
  trigger: 'document_upload' | 'daily_summary' | 'keyword_mention';
  action: 'send_email' | 'slack_notification' | 'generate_summary';
  status: 'active' | 'paused';
  lastRun: string;
}

/**
 * Interface for activity feed items
 */
interface Activity {
  id: string;
  type: 'document_uploaded' | 'query_made' | 'automation_triggered';
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

/**
 * Dashboard overview section with key metrics
 */
function DashboardOverview({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard
        title="Documents"
        value={stats.totalDocuments}
        icon="📄"
        trend="+12% this month"
      />
      <MetricCard
        title="Queries"
        value={stats.totalQueries}
        icon="❓"
        trend="+8% this month"
      />
      <MetricCard
        title="Storage Used"
        value={`${stats.storageUsed} MB`}
        icon="💾"
        limit="500 MB"
      />
      <MetricCard
        title="Avg Response"
        value={`${stats.avgResponseTime}ms`}
        icon="⚡"
        status="Excellent"
      />
    </div>
  );
}

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
 * Automation management section
 */
function AutomationManager({ automations }: { automations: Automation[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Automations</CardTitle>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Automation
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {automations.length > 0 ? (
          <div className="space-y-3">
            {automations.map(automation => (
              <AutomationCard key={automation.id} automation={automation} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-4xl mb-4">🤖</div>
            <p>No automations configured</p>
            <p className="text-sm">Create your first automation workflow</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Recent activity feed
 */
function ActivityFeed({ activities }: { activities: Activity[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length > 0 ? (
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {activities.map(activity => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-4xl mb-4">📊</div>
            <p>No recent activity</p>
          </div>
        )}
      </CardContent>
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
          <div></div>
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
    </header>
  );
}

/**
 * Main dashboard page component
 */
export default function DashboardPage() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  // Mock data - replace with real data fetching
  const [stats] = useState<DashboardStats>({
    totalDocuments: 12,
    totalQueries: 156,
    storageUsed: 89,
    queriesThisMonth: 45,
    avgResponseTime: 850,
    mostUsedFeature: 'Document Query'
  });

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

  const [automations] = useState<Automation[]>([
    {
      id: '1',
      name: 'Daily Summary Email',
      trigger: 'daily_summary',
      action: 'send_email',
      status: 'active',
      lastRun: '2024-01-15'
    },
    {
      id: '2',
      name: 'Document Upload Notification',
      trigger: 'document_upload',
      action: 'slack_notification',
      status: 'paused',
      lastRun: '2024-01-10'
    }
  ]);

  const [activities] = useState<Activity[]>([
    {
      id: '1',
      type: 'query_made',
      description: 'Asked about Q4 revenue from Company_Report_2024.pdf',
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      type: 'document_uploaded',
      description: 'Uploaded Product_Specifications.docx',
      timestamp: '2024-01-14T15:45:00Z'
    },
    {
      id: '3',
      type: 'automation_triggered',
      description: 'Daily Summary Email sent successfully',
      timestamp: '2024-01-14T09:00:00Z'
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
        {/* Overview Section */}
        <DashboardOverview stats={stats} />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Documents & Chat */}
          <div className="lg:col-span-2 space-y-8">
            <DocumentManager documents={documents} />
            <ChatInterface />
          </div>
          
          {/* Right Column - Automations & Activity */}
          <div className="space-y-8">
            <AutomationManager automations={automations} />
            <ActivityFeed activities={activities} />
          </div>
        </div>
      </main>
    </div>
  );
}