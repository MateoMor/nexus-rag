import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Icon, IconName } from '@/components/shared/atoms/Icon';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: IconName;
  trend?: string;
  limit?: string;
  status?: string;
  className?: string;
}

/**
 * Metric card molecule component for displaying dashboard statistics
 * 
 * @param props - MetricCard component properties
 * @returns JSX.Element - Card displaying a metric with icon and additional info
 */
export function MetricCard({ 
  title, 
  value, 
  icon, 
  trend, 
  limit, 
  status,
  className 
}: MetricCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {trend && <p className="text-sm text-green-600">{trend}</p>}
            {limit && <p className="text-sm text-muted-foreground">of {limit}</p>}
            {status && <p className="text-sm text-blue-600">{status}</p>}
          </div>
          <div className="text-primary">
            <Icon name={icon} size="xl" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}