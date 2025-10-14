import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'font-medium rounded-xl transition-all duration-300 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'active:scale-95',
        {
          // Primary
          'px-6 py-3 bg-brand-primary text-white hover:bg-brand-secondary hover:text-brand-neutral focus:ring-brand-primary/50':
            variant === 'primary',
          // Secondary
          'px-6 py-3 bg-brand-secondary text-brand-neutral hover:bg-brand-primary hover:text-white focus:ring-brand-secondary/50':
            variant === 'secondary',
          // Ghost
          'px-6 py-3 bg-transparent text-brand-neutral border border-morphism-border hover:bg-brand-light hover:border-brand-primary/30 focus:ring-brand-primary/50':
            variant === 'ghost',
          // Accent
          'px-6 py-3 bg-brand-accent text-brand-neutral hover:bg-yellow-400 focus:ring-brand-accent/50':
            variant === 'accent',
        },
        {
          'px-4 py-2 text-sm': size === 'sm',
          'px-6 py-3': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
