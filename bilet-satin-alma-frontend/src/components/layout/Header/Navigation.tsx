import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';

const navLinks = [
  { href: '/trips', label: 'Seferler' },
  { href: '/my-tickets', label: 'Biletlerim' },
  { href: '/campaigns', label: 'Kampanyalar' },
  { href: '/contact', label: 'İletişim' },
];

interface NavigationProps {
  mobile?: boolean;
  onLinkClick?: () => void;
}

export default function Navigation({ mobile = false, onLinkClick }: NavigationProps) {
  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className={clsx(
        'relative font-medium transition-all duration-300 ease-out',
        'hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 rounded-lg px-2 py-1 -mx-2 -my-1',
        mobile
          ? 'block w-full text-left px-4 py-3 text-base text-brand-neutral/80 hover:bg-brand-light rounded-xl'
          : 'text-brand-neutral/80 hover:text-brand-primary after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-brand-primary after:transition-all after:duration-300 hover:after:w-full'
      )}
      onClick={onLinkClick}
    >
      {children}
    </Link>
  );

  if (mobile) {
    return (
      <div className="space-y-1">
        {navLinks.map((link) => (
          <NavLink key={link.href} href={link.href}>
            {link.label}
          </NavLink>
        ))}
      </div>
    );
  }

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navLinks.map((link) => (
        <NavLink key={link.href} href={link.href}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
