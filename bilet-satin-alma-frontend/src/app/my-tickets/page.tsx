'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import TicketList from '@/components/tickets/TicketList';

export default function MyTickets() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login?redirect=/my-tickets');
      } else if (user.role === 'admin') {
        router.push('/admin');
      } else if (user.role === 'company') {
        router.push('/company');
      }
    }
  }, [user, loading, router]);

  if (loading || !user || user.role === 'admin' || user.role === 'company') {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-primary font-serif">
        Yükleniyor...
      </div>
    );
  }

  return (
    <section className="section-spacing">
      <div className="container-minimal">
        <TicketList />
      </div>
    </section>
  );
}
