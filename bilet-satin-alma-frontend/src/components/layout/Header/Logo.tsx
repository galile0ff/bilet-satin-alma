import React from 'react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center space-x-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 rounded-xl p-2 -m-2"
    >
      <div className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M20 8h-7m0 0H6.5a2.5 2.5 0 0 0 0 5H13m7-5-2 5m2-5 2 5m-2-5v5m-7 0h6.5a2.5 2.5 0 0 0 0-5H13m0 5H6.5m0 0-2 5m2-5-2-5m2 5v5" />
        </svg>
      </div>
      <span className="text-xl font-bold text-brand-neutral group-hover:text-brand-primary transition-colors duration-300">
        OtobüsTicket
      </span>
    </Link>
  );
}
