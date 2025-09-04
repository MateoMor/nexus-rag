import React from 'react';
import { Input } from '@/components/ui/input';

interface FormFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  autoComplete?: string;
  minLength?: number;
  helperText?: React.ReactNode;
}

/**
 * Reusable form field component for auth forms
 */
export function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  autoComplete,
  minLength,
  helperText
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {helperText}
      </div>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        minLength={minLength}
      />
    </div>
  );
}