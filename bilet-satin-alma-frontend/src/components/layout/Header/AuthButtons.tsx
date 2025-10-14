import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface AuthButtonsProps {
  mobile?: boolean;
  onLinkClick?: () => void;
}

export default function AuthButtons({ mobile = false, onLinkClick }: AuthButtonsProps) {
  if (mobile) {
    return (
      <div className="space-y-3 pt-4 border-t border-morphism-border">
        <div className="flex items-center justify-center space-x-4">
          <Link href="/login" onClick={onLinkClick} className="flex-1">
            <Button variant="ghost" size="sm" className="w-full">
              Giriş Yap
            </Button>
          </Link>
          <Link href="/register" onClick={onLinkClick} className="flex-1">
            <Button variant="primary" size="sm" className="w-full">
              Üye Ol
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-3">
      <Link href="/login">
        <Button variant="ghost" size="sm">
          Giriş Yap
        </Button>
      </Link> 
      <Link href="/register">
        <Button variant="primary" size="sm">
          Üye Ol
        </Button>
      </Link>
    </div>
  );
}
