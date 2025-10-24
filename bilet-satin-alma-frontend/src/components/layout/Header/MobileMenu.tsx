'use client';

import React, { useState } from 'react';
import { clsx } from 'clsx';
import Navigation from './Navigation';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-xl bg-morphism-surface border border-morphism-border hover:border-brand-primary/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
        aria-label="Menüyü aç"
        aria-expanded={isOpen}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={clsx(
            'block w-6 h-0.5 bg-brand-neutral transition-transform duration-300 ease-in-out',
            { 'rotate-45 translate-y-[3px]': isOpen, '-translate-y-1': !isOpen }
          )} />
          <span className={clsx(
            'block w-6 h-0.5 bg-brand-neutral mt-1 transition-opacity duration-300 ease-in-out',
            { 'opacity-0': isOpen }
          )} />
          <span className={clsx(
            'block w-6 h-0.5 bg-brand-neutral mt-1 transition-transform duration-300 ease-in-out',
            { '-rotate-45 -translate-y-[9px]': isOpen, 'translate-y-1': !isOpen }
          )} />
        </div>
      </button>
      
      <div className={clsx(
        "md:hidden fixed top-20 left-0 right-0 z-40 bg-morphism-surface backdrop-blur-md border-b border-morphism-border",
        "transition-all duration-300 ease-in-out overflow-hidden",
        { 'max-h-screen py-6': isOpen, 'max-h-0': !isOpen }
      )}>
        <div className="container-minimal">
          <Navigation mobile onLinkClick={() => setIsOpen(false)} />
        </div>
      </div>
    </>
  );
}
