'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BusTrip } from '@/types/BusTrip';
import { getBusTrips } from '@/services/busService';
import TripCard from '@/components/trips/TripCard';
import SeatGrid from '@/components/trips/SeatGrid';
import Button from '@/components/ui/Button';

export default function Trips() {
  const [trips, setTrips] = useState<BusTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState<BusTrip | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadTrips = async () => {
      try {
        // Tüm seferleri getir (parametresiz)
        const data = await getBusTrips();
        setTrips(data);
      } catch (error) {
        console.error('Seferler yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTrips();
  }, []);

  if (loading) {
    return (
      <section className="section-spacing flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
          <div className="text-lg font-medium text-brand-neutral">Seferler yükleniyor...</div>
        </div>
      </section>
    );
  }

  if (selectedTrip) {
    return (
      <div className="section-spacing">
        <div className="container-minimal">
          <div className="mb-6">
            <button
              onClick={() => { setSelectedTrip(null); setSelectedSeat(null); }}
              className="flex items-center gap-2 text-brand-primary hover:text-brand-secondary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Geri Dön
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-section mb-6">Koltuk Seçimi</h2>
              <SeatGrid trip={selectedTrip} selectedSeat={selectedSeat} onSeatSelect={setSelectedSeat} />
            </div>

            <div>
              <h2 className="text-section mb-6">Sefer Bilgileri</h2>
              <div className="space-y-4 p-6 rounded-2xl border border-morphism-border bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-brand-neutral">{selectedTrip.busCompany}</div>
                    <div className="text-sm text-brand-neutral/70">{selectedTrip.busType}</div>
                  </div>
                  <div className="text-2xl font-bold text-brand-primary">{selectedTrip.price} TL</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-brand-neutral/70">Kalkış</div>
                    <div className="font-medium text-brand-neutral">{selectedTrip.from}</div>
                    <div className="text-sm text-brand-neutral/70">{selectedTrip.departureDate} • {selectedTrip.departureTime}</div>
                  </div>
                  <div>
                    <div className="text-sm text-brand-neutral/70">Varış</div>
                    <div className="font-medium text-brand-neutral">{selectedTrip.to}</div>
                    <div className="text-sm text-brand-neutral/70">{selectedTrip.departureDate} • {selectedTrip.arrivalTime}</div>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="text-sm text-brand-neutral/70 mb-2">Özellikler</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrip.features.map((f, i) => (
                      <span key={i} className="px-3 py-1 bg-brand-light text-brand-neutral/80 rounded-full text-xs border border-morphism-border">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-morphism-border pt-6">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={!selectedSeat}
                    onClick={() => {
                      if (!selectedSeat) return;
                      router.push(`/payment?tripId=${selectedTrip.id}&seat=${selectedSeat}`);
                    }}
                  >
                    Ödemeye Geç
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="section-spacing">
      <div className="container-minimal">
        {trips.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-brand-neutral mb-2">Sefer Bulunamadı</h3>
            <p className="text-brand-neutral/70">Şu anda görüntülenecek sefer bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {trips.map(trip => (
              <TripCard
                key={trip.id}
                trip={trip}
                onSelectTrip={setSelectedTrip}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
