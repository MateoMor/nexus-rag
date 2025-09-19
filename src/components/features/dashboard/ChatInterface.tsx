import { useState } from 'react';

// Import molecules
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// import types
import type { ChatMessage } from '@/types';

import { MessageBubble } from '@/components/shared/molecules/MessageBubble';
import { QueryInput } from '@/components/shared/molecules/QueryInput';
import { Bot } from 'lucide-react';


export function ChatInterface() {
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