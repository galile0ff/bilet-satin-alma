'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BusTrip } from '@/types/BusTrip';
import { getBusTrips } from '@/services/busService';
import TripFilters from '@/components/trips/TripFilters';
import TripCard from '@/components/trips/TripCard';

export default function Trips() {
  const searchParams = useSearchParams();
  const [trips, setTrips] = useState<BusTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState<BusTrip | null>(null);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const from = searchParams.get('from') || '';
        const to = searchParams.get('to') || '';
        const date = searchParams.get('date') || '';

        const data = await getBusTrips(from, to, date);
        setTrips(data);
      } catch (error) {
        console.error('Seferler yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTrips();
  }, [searchParams]);

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
              onClick={() => setSelectedTrip(null)}
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
              {/* Seat selection component will be added here */}
              <div className="text-center py-8">
                <p className="text-brand-neutral/70">Koltuk seçimi özelliği yakında eklenecek</p>
              </div>
            </div>

            <div>
              <h2 className="text-section mb-6">Yolcu Bilgileri</h2>
              {/* Passenger form component will be added here */}
              <div className="text-center py-8">
                <p className="text-brand-neutral/70">Yolcu bilgileri formu yakında eklenecek</p>
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
        <TripFilters tripCount={trips.length} onFilterClick={() => {}} />

        {trips.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-brand-neutral mb-2">Sefer Bulunamadı</h3>
            <p className="text-brand-neutral/70">
              Bu kriterlere uygun sefer bulunamadı. Filtrelerinizi değiştirerek tekrar deneyin.
            </p>
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
