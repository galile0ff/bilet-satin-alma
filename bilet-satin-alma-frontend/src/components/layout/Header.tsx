'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { clsx } from 'clsx'; // Class'ları koşullu birleştirmek için yardımcı kütüphane

// --- İkonları Ayrı Bileşenler Haline Getirelim ---
// Bu, ana bileşenin daha okunaklı olmasını sağlar.

const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 8h-7m0 0H6.5a2.5 2.5 0 0 0 0 5H13m7-5-2 5m2-5 2 5m-2-5v5m-7 0h6.5a2.5 2.5 0 0 0 0-5H13m0 5H6.5m0 0-2 5m2-5-2-5m2 5v5" />
  </svg>
);

const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
  </svg>
);

const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

// --- Navigasyon Linklerini Tek Bir Yerde Tanımlayalım ---
// Bu, kod tekrarını önler (DRY Prensibi)
const navLinks = [
  { href: '/trips', label: 'Seferler' },
  { href: '/my-tickets', label: 'Biletlerim' },
  { href: '/campaigns', label: 'Kampanyalar' },
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const checkScroll = () => setIsScrolled(window.scrollY > 50); // Daha belirgin olması için 0'dan 50'ye çektik
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true }); // Performans için
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  // Hydration hatasını önlemek için mounted state'i kontrolü
  if (!mounted) {
    return <div className="h-20" />; // Yüklenirken boşluk bırakarak layout kaymasını engelle
  }

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
      onClick={() => setIsMenuOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <>
      {/* Header'ın kapladığı alan için placeholder */}
      <div className="h-20" />
      
      {/* Header */}
      <header className={clsx(
        "fixed w-full top-0 z-50 transition-all duration-300 ease-in-out",
        {
          'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md': isScrolled,
          'bg-transparent dark:bg-transparent': !isScrolled
        }
      )}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center h-20">
            {/* Logo ve Sol Menü */}
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg">
                <LogoIcon className={clsx(
                  "h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-all duration-300 ease-in-out",
                  { 'scale-90': isScrolled, 'scale-100': !isScrolled }
                )} />
                <span className="text-xl font-bold text-gray-900 dark:text-white/90 group-hover:text-blue-600 dark:group-hover:text-blue-400 tracking-tighter transition-colors duration-300">
                  OtobüsTicket
                </span>
              </Link>
              {/* Ana Menü - Desktop */}
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <NavLink key={link.href} href={link.href}>
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Sağ Menü ve Butonlar */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Tema değiştir"
              >
                {theme === 'dark' ? 
                  <SunIcon className="h-5 w-5 text-yellow-400" /> : 
                  <MoonIcon className="h-5 w-5 text-gray-700" />
                }
              </button>
              {/* Kullanıcı Menüsü - Desktop */}
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300">
                  Giriş Yap
                </Link>
                <Link href="/register" className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5">
                  Üye Ol
                </Link>
              </div>
              {/* Mobil Menü Butonu (Animasyonlu) */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-label="Menüyü aç"
                  aria-expanded={isMenuOpen}
                >
                  <div className="w-6 h-6 flex flex-col justify-center items-center">
                    <span className={clsx(
                      'block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 transition-transform duration-300 ease-in-out',
                      { 'rotate-45 translate-y-[3px]': isMenuOpen, '-translate-y-1': !isMenuOpen }
                    )}></span>
                    <span className={clsx(
                      'block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 mt-1 transition-opacity duration-300 ease-in-out',
                      { 'opacity-0': isMenuOpen }
                    )}></span>
                    <span className={clsx(
                      'block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 mt-1 transition-transform duration-300 ease-in-out',
                      { '-rotate-45 -translate-y-[9px]': isMenuOpen, 'translate-y-1': !isMenuOpen }
                    )}></span>
                  </div>
                </button>
              </div>
            </div>
          </nav>

          {/* Mobil Menü (Aşağı kayarak açılan animasyonlu) */}
          <div className={clsx(
            "md:hidden overflow-hidden transition-all duration-500 ease-in-out",
            { 'max-h-screen py-4': isMenuOpen, 'max-h-0': !isMenuOpen }
          )}>
            <div className="flex flex-col space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              <div className="flex items-center justify-center space-x-4 pt-2">
                 <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex-1 text-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors">
                  Giriş Yap
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)} className="flex-1 text-center px-4 py-3 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Üye Ol
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}