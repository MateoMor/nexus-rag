import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Icon, IconName } from '@/components/shared/atoms/Icon';

interface Activity {
  id: string;
  type: 'document_uploaded' | 'query_made' | 'automation_triggered';
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

interface ActivityItemProps {
  activity: Activity;
}

/**
 * Activity item molecule component for displaying activity feed entries
 * 
 * @param props - ActivityItem component properties
 * @returns JSX.Element - Single activity entry with icon and description
 */
export function ActivityItem({ activity }: ActivityItemProps) {
  const getIcon = (type: string): IconName => {
    switch (type) {
      case 'document_uploaded': return 'document';
      case 'query_made': return 'chat';
      case 'automation_triggered': return 'bot';
      default: return 'activity';
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-accent/50 rounded-lg transition-colors">
      <div className="flex-shrink-0 mt-0.5">
        <Icon name={getIcon(activity.type)} size="md" className="text-muted-foreground" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">
          {activity.description}
        </p>
        <p className="text-xs text-muted-foreground">
          {new Date(activity.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
}