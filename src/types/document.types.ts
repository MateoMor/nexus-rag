export interface Document {
    id: string;
    name: string;
    type: 'pdf' | 'docx' | 'txt';
    size: number;
    uploadDate: string;
    status: 'processing' | 'ready' | 'error';
    chunks: number;
  }