'use client';

import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import Logo from './Logo';
import Navigation from './Navigation';
import AuthButtons from './AuthButtons';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkScroll = () => setIsScrolled(window.scrollY > 50);
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <>
      {/* Header Placeholder */}
      <div className="h-20" />

      {/* Header */}
      <header className={clsx(
        "fixed w-full top-0 z-50 transition-all duration-300 ease-out",
        isScrolled
          ? 'bg-morphism-surface backdrop-blur-md border-b border-morphism-border shadow-morphism'
          : 'bg-transparent'
      )}>
        <div className="container-minimal">
          <div className="flex justify-between items-center h-20">
            {/* Logo ve Desktop Navigation */}
            <div className="flex items-center space-x-8">
              <Logo />
              <Navigation />
            </div>

            {/* Sağ Menü */}
            <div className="flex items-center space-x-3">
              <AuthButtons />
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
