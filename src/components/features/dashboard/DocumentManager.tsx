import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Import molecules
import { DocumentCard } from '@/components/shared/molecules/DocumentCard';
import { FileUpload } from '@/components/shared/molecules/FileUpload';

// Import types
import type { Document } from '@/types';

export function DocumentManager({ documents }: { documents: Document[] }) {
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
