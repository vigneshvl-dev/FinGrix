import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string | null;
  disabled?: boolean;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = '••••••••••••••••',
  autoComplete = 'current-password',
  required,
  error,
  disabled
}) => {
  const [showPassword, setShowPassword] = useState(false);

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
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`
            w-full h-11 pl-3.5 pr-10 rounded bg-white text-xs text-text-primary placeholder:text-text-muted border transition-colors font-mono
            focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand
            ${error ? 'border-risk bg-risk-subtle/10' : 'border-border hover:border-border-dark'}
            ${disabled ? 'opacity-50 cursor-not-allowed bg-surface-secondary' : ''}
          `}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-primary transition-colors focus:outline-none focus:text-brand"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
      {error && (
        <p 
          id={`${id}-error`} 
          className="text-[11px] text-risk flex items-center gap-1 mt-1 font-medium font-sans"
        >
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
