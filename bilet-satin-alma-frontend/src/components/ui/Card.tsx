import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export default function Card({
  children,
  className,
  hover = true,
  glass = false
}: CardProps) {
  return (
    <div
      className={clsx(
        'bg-morphism-surface backdrop-blur-md border border-morphism-border rounded-2xl',
        'transition-all duration-300 ease-out',
        hover && 'shadow-morphism hover:shadow-morphism-lg hover:-translate-y-1',
        glass && 'bg-white/10 border-white/20',
        className
      )}
    >
      {children}
    </div>
  );
}
