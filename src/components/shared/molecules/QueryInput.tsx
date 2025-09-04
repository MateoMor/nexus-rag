import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface QueryInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

/**
 * Query input molecule component for chat interface
 * 
 * @param props - QueryInput component properties
 * @returns JSX.Element - Input form for submitting queries
 */
export function QueryInput({ value, onChange, onSubmit, disabled }: QueryInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ask a question about your documents..."
        disabled={disabled}
        className="flex-1"
      />
      <Button
        type="submit"
        disabled={!value.trim() || disabled}
        size="icon"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}