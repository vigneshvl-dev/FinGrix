import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string | null;
  disabled?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  required,
  error,
  disabled
}) => {
  return (
    <div className="space-y-1.5">
      <label 
        htmlFor={id} 
        className="block text-xs font-medium text-text-primary"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`
            w-full h-11 px-3.5 rounded bg-white text-xs text-text-primary placeholder:text-text-muted border transition-colors
            focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand
            ${error ? 'border-risk bg-risk-subtle/10' : 'border-border hover:border-border-dark'}
            ${disabled ? 'opacity-50 cursor-not-allowed bg-surface-secondary' : ''}
          `}
        />
      </div>
      {error && (
        <p 
          id={`${id}-error`} 
          className="text-[11px] text-risk flex items-center gap-1 mt-1 font-medium"
        >
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
