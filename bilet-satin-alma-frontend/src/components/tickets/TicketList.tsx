'use client';

import { useState, useEffect } from 'react';
import { Ticket } from '@/types/BusTrip';
import { getMyTickets } from '@/services/busService';
import TicketCard from './TicketCard';

export default function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await getMyTickets();
        setTickets(data);
      } catch (error) {
        console.error('Biletler yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
        <p className="mt-4 text-brand-neutral/70">Biletleriniz yükleniyor...</p>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-brand-neutral mb-2">Henüz Biletiniz Yok</h3>
        <p className="text-brand-neutral/70 mb-6">
          İlk biletinizi satın almak için sefer aramaya başlayın.
        </p>
        <a
          href="/trips"
          className="inline-flex items-center px-6 py-3 bg-brand-primary text-white rounded-xl font-medium hover:bg-brand-secondary transition-colors"
        >
          Sefer Ara
        </a>
      </div>
    );
  }

  const handleTicketDeleted = (ticketId: string) => {
    setTickets(tickets.filter(ticket => ticket.id !== ticketId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-brand-neutral">Biletlerim</h1>
        <div className="text-sm text-brand-neutral/70">
          {tickets.length} bilet bulundu
        </div>
      </div>

      <div className="space-y-4">
        {tickets.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} onTicketDeleted={handleTicketDeleted} />
        ))}
      </div>
    </div>
  );
}
