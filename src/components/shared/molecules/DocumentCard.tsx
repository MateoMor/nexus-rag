import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/shared/atoms/Icon';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'txt';
  size: number;
  uploadDate: string;
  status: 'processing' | 'ready' | 'error';
  chunks: number;
}

interface DocumentCardProps {
  document: Document;
  onDelete?: (id: string) => void;
}

/**
 * Document card molecule component for displaying document information
 * 
 * @param props - DocumentCard component properties
 * @returns JSX.Element - Card displaying document details with actions
 */
export function DocumentCard({ document, onDelete }: DocumentCardProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'ready': return 'default';
      case 'processing': return 'secondary';
      case 'error': return 'destructive';
      default: return 'outline';
    }
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📕';
      case 'docx': return '📘';
      default: return '📄';
    }
  };

  return (
    <Card className="hover:bg-accent/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl">{getFileIcon(document.type)}</div>
            <div>
              <h4 className="font-medium">{document.name}</h4>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(document.size)} • {document.chunks} chunks • {new Date(document.uploadDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant={getStatusVariant(document.status)}>
              {document.status}
            </Badge>
            {onDelete && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onDelete(document.id)}
              >
                <Icon name="delete" size="sm" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}