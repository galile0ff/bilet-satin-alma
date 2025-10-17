'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BusTrip } from '@/types/BusTrip';
import { getBusTrips } from '@/services/busService';
import SeatGrid from '@/components/trips/SeatGrid';
import Button from '@/components/ui/Button';

export default function TripDetailPage() {
  const params = useParams();
  const router = useRouter();
  const idParam = params?.id as string | undefined;
  const tripId = useMemo(() => {
    const n = Number(idParam);
    return Number.isFinite(n) ? n : null;
  }, [idParam]);

  const [trip, setTrip] = useState<BusTrip | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  useEffect(() => {
    const loadTrip = async () => {
      if (!tripId) {
        setLoading(false);
        return;
      }
      try {
        const all = await getBusTrips();
        const found = all.find(t => t.id === tripId) || null;
        setTrip(found);
      } finally {
        setLoading(false);
      }
    };
    loadTrip();
  }, [tripId]);

  if (loading) {
    return (
      <section className="section-spacing flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
          <div className="text-lg font-medium text-brand-neutral">Sefer detayları yükleniyor...</div>
        </div>
      </section>
    );
  }

  if (!trip) {
    return (
      <section className="section-spacing">
        <div className="container-minimal">
          <div className="p-6 rounded-2xl border border-morphism-border bg-white">
            <div className="text-brand-neutral">Sefer bulunamadı.</div>
            <div className="mt-4 flex gap-3">
              <Button variant="ghost" onClick={() => router.back()}>Geri</Button>
              <Button variant="primary" onClick={() => router.push('/trips')}>Seferlere Dön</Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-spacing">
      <div className="container-minimal">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-brand-primary hover:text-brand-secondary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Geri Dön
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol: Koltuk seçimi */}
          <div>
            <h2 className="text-section mb-6">Koltuk Seçimi</h2>
            <SeatGrid trip={trip} selectedSeat={selectedSeat} onSeatSelect={setSelectedSeat} />
          </div>

          {/* Sağ: Sefer bilgileri ve ödeme yönlendirmesi */}
          <div>
            <h2 className="text-section mb-6">Sefer Bilgileri</h2>
            <div className="space-y-4 p-6 rounded-2xl border border-morphism-border bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-brand-neutral">{trip.busCompany}</div>
                  <div className="text-sm text-brand-neutral/70">{trip.busType}</div>
                </div>
                <div className="text-2xl font-bold text-brand-primary">{trip.price} TL</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-brand-neutral/70">Kalkış</div>
                  <div className="font-medium text-brand-neutral">{trip.from}</div>
                  <div className="text-sm text-brand-neutral/70">{trip.departureDate} • {trip.departureTime}</div>
                </div>
                <div>
                  <div className="text-sm text-brand-neutral/70">Varış</div>
                  <div className="font-medium text-brand-neutral">{trip.to}</div>
                  <div className="text-sm text-brand-neutral/70">{trip.departureDate} • {trip.arrivalTime}</div>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-sm text-brand-neutral/70 mb-2">Özellikler</div>
                <div className="flex flex-wrap gap-2">
                  {trip.features.map((f, i) => (
                    <span key={i} className="px-3 py-1 bg-brand-light text-brand-neutral/80 rounded-full text-xs border border-morphism-border">{f}</span>
                  ))}
                </div>
              </div>

              <div className="border-t border-morphism-border pt-6 space-y-3">
                <div className="text-sm text-brand-neutral/70">
                  Seçilen Koltuk: {selectedSeat ? (
                    <span className="font-semibold text-brand-neutral">{selectedSeat}</span>
                  ) : (
                    <span className="text-brand-neutral/50">Henüz seçilmedi</span>
                  )}
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={!selectedSeat}
                  onClick={() => {
                    if (!selectedSeat) return;
                    router.push(`/payment?tripId=${trip.id}&seat=${selectedSeat}`);
                  }}
                >
                  Ödemeye Geç
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
