'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { useAuth } from '@/context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 8h-7m0 0H6.5a2.5 2.5 0 0 0 0 5H13m7-5-2 5m2-5 2 5m-2-5v5m-7 0h6.5a2.5 2.5 0 0 0 0-5H13m0 5H6.5m0 0-2 5m2-5-2-5m2 5v5" />
  </svg>
);

const navLinks = [
  { href: '/trips', label: 'Tüm Seferler', roles: ['user', 'guest', 'company'] },
  { href: '/my-tickets', label: 'Biletlerim', roles: ['user'] },
  { href: '/campaigns', label: 'Güncel Kampanyalar', roles: ['user', 'guest'] },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkScroll = () => setIsScrolled(window.scrollY > 50);
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
    router.refresh();
  };

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className="relative text-[var(--text-light)] hover:text-[var(--primary)] transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-[var(--primary)] after:transition-all after:duration-300 hover:after:w-full"
      onClick={() => setIsMenuOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <>
      <div className="h-20" />
      <header className={clsx(
        'fixed w-full top-0 z-50 transition-all duration-300 ease-in-out',
        {
          'bg-white/80 backdrop-blur-lg shadow-md': isScrolled,
          'bg-transparent': !isScrolled,
        }
      )}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg">
                <LogoIcon className={clsx(
                  'h-8 w-8 text-[var(--primary)] group-hover:text-[var(--secondary)] transition-all duration-300 ease-in-out',
                  { 'scale-90': isScrolled, 'scale-100': !isScrolled }
                )} />
                <span className="text-xl font-bold text-[var(--text-light)] group-hover:text-[var(--primary)] tracking-tighter transition-colors duration-300">
                  galileoff.
                </span>
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.filter(link => !link.roles || link.roles.includes(user?.role || 'guest')).map((link) => (
                  <NavLink key={link.href} href={link.href}>
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {!user ? (
                <div className="hidden md:flex items-center space-x-2">
                  <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-300">
                    Giriş Yap
                  </Link>
                  <Link href="/register" className="px-4 py-2 text-sm font-medium bg-[var(--primary)] hover:bg-[var(--secondary)] text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5">
                    Üye Ol
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                    <Link href={user.role === 'company' ? "/company" : "/my-account"} className="p-2 rounded-full text-gray-700 hover:bg-gray-200 hover:text-[var(--primary)] transition-colors duration-300" aria-label="Hesabım">
                        <FaUserCircle className="w-6 h-6" />
                    </Link>
                    <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5">
                        Çıkış Yap
                    </button>
                </div>
              )}

              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-label="Menüyü aç"
                  aria-expanded={isMenuOpen}
                >
                  <div className="w-6 h-6 flex flex-col justify-center items-center">
                    <span className={clsx('block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ease-in-out', {
                      'rotate-45 translate-y-[3px]': isMenuOpen,
                      '-translate-y-1': !isMenuOpen,
                    })}></span>
                    <span className={clsx('block w-6 h-0.5 bg-gray-800 mt-1 transition-opacity duration-300 ease-in-out', {
                      'opacity-0': isMenuOpen,
                    })}></span>
                    <span className={clsx('block w-6 h-0.5 bg-gray-800 mt-1 transition-transform duration-300 ease-in-out', {
                      '-rotate-45 -translate-y-[9px]': isMenuOpen,
                      'translate-y-1': !isMenuOpen,
                    })}></span>
                  </div>
                </button>
              </div>
            </div>
          </nav>

          <div className={clsx('md:hidden overflow-hidden transition-all duration-500 ease-in-out', {
            'max-h-screen py-4': isMenuOpen,
            'max-h-0': !isMenuOpen,
          })}>
            <div className="flex flex-col space-y-2 border-t border-gray-200 pt-4">
              {navLinks.filter(link => !link.roles || link.roles.includes(user?.role || 'guest')).map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-gray-200 my-2"></div>
              {!user ? (
                <div className="flex items-center justify-center space-x-4 pt-2">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex-1 text-center px-4 py-3 text-base font-medium text-gray-700 bg-gray-100 rounded-lg transition-colors">
                    Giriş Yap
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)} className="flex-1 text-center px-4 py-3 text-base font-medium bg-[var(--primary)] hover:bg-[var(--secondary)] text-white rounded-lg transition-colors">
                    Üye Ol
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2 py-3">
                  <Link href={user.role === 'company' ? "/company" : "/my-account"} onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 px-4 py-2 text-base font-medium text-gray-700 bg-gray-100 rounded-lg">
                    <FaUserCircle className="w-5 h-5" />
                    <span>{user.role === 'company' ? 'Firma Paneli' : 'Hesabım'}</span>
                  </Link>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full px-4 py-3 text-base font-medium text-red-600 bg-red-50 rounded-lg">
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
