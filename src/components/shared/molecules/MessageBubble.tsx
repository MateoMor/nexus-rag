import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: string[];
}

interface MessageBubbleProps {
  message: ChatMessage;
}

/**
 * Message bubble molecule component for chat interface
 * 
 * @param props - MessageBubble component properties
 * @returns JSX.Element - Styled message bubble for chat
 */
export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.type === 'user';
  
  return (
    <div className={cn("flex mb-4", isUser ? "justify-end" : "justify-start")}>
      <Card className={cn(
        "max-w-xs lg:max-w-md",
        isUser 
          ? "bg-primary text-primary-foreground" 
          : "bg-muted"
      )}>
        <CardContent className="p-3">
          <p className="text-sm">{message.content}</p>
          {message.sources && (
            <div className="mt-2 text-xs opacity-75">
              Sources: {message.sources.join(', ')}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}