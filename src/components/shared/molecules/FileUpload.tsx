import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
}

/**
 * File upload molecule component for document management
 * 
 * @param props - FileUpload component properties
 * @returns JSX.Element - File upload button with hidden input
 */
export function FileUpload({ onFileUpload, accept = ".pdf,.docx,.txt", multiple = true, disabled }: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files);
    }
  };

  return (
    <label className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      <Button 
        variant="default" 
        disabled={disabled}
        className="pointer-events-none"
      >
        <Upload className="h-4 w-4 mr-2" />
        Upload Documents
      </Button>
      <Input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />
    </label>
  );
}