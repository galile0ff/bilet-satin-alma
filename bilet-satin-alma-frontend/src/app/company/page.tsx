'use client';

import CompanyDashboard from '@/components/company/CompanyDashboard';
import { useAuth } from '@/context/AuthContext';

export default function CompanyPage() {
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary via-secondary to-accent opacity-20"></div>
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary rounded-full filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent rounded-full filter blur-3xl opacity-30 animate-float animation-delay-3000"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Firma Yönetim Paneli
          </h1>
          <p className="mt-2 text-xl">
            Hoş geldiniz, 
            <span className="font-semibold text-primary ml-1">
              {user?.full_name || 'Misafir'}!
            </span>
          </p>
        </header>

        <main className="mt-6">
           <CompanyDashboard />
        </main>
      </div>
    </div>
  );
}
