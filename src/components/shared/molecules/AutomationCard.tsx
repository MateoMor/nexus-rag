import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/shared/atoms/Icon';

interface Automation {
  id: string;
  name: string;
  trigger: 'document_upload' | 'daily_summary' | 'keyword_mention';
  action: 'send_email' | 'slack_notification' | 'generate_summary';
  status: 'active' | 'paused';
  lastRun: string;
}

interface AutomationCardProps {
  automation: Automation;
  onToggle?: (id: string) => void;
  onEdit?: (id: string) => void;
}

/**
 * Automation card molecule component for displaying workflow information
 * 
 * @param props - AutomationCard component properties
 * @returns JSX.Element - Card displaying automation details with actions
 */
export function AutomationCard({ automation, onToggle, onEdit }: AutomationCardProps) {
  const getStatusVariant = (status: string) => {
    return status === 'active' ? 'default' : 'secondary';
  };

  return (
    <Card className="hover:bg-accent/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">{automation.name}</h4>
            <p className="text-sm text-muted-foreground">
              {automation.trigger} → {automation.action}
            </p>
            <p className="text-xs text-muted-foreground">
              Last run: {new Date(automation.lastRun).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant={getStatusVariant(automation.status)}>
              {automation.status}
            </Badge>
            {onEdit && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onEdit(automation.id)}
              >
                <Icon name="settings" size="sm" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}