import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-brand-neutral"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={clsx(
          'w-full px-4 py-3 bg-morphism-surface border border-morphism-border rounded-xl',
          'placeholder-brand-neutral/50 text-brand-neutral',
          'transition-all duration-300 ease-out',
          'focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary',
          'hover:border-brand-primary/30',
          error && 'border-red-300 focus:border-red-500 focus:ring-red-500/50',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
