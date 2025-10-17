'use client';

import { useState, useEffect } from 'react';
import { BusTrip } from '@/types/BusTrip';
import { getTrips } from '@/services/busService';
import TripCard from './TripCard';
import TripFilters from './TripFilters';
import Card from '@/components/ui/Card';

export default function TripList() {
  const [trips, setTrips] = useState<BusTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredTrips, setFilteredTrips] = useState<BusTrip[]>([]);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const data = await getTrips();
        setTrips(data);
        setFilteredTrips(data);
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
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
        <p className="mt-4 text-brand-neutral/70">Seferler yükleniyor...</p>
      </div>
    );
  }

  if (filteredTrips.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-brand-neutral mb-2">Sefer Bulunamadı</h3>
        <p className="text-brand-neutral/70">Bu kriterlere uygun sefer bulunamadı. Filtrelerinizi değiştirerek tekrar deneyin.</p>
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="container-minimal">

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTrips.map(trip => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-brand-neutral/70">
            {filteredTrips.length} büyülü yolculuk bulundu.
          </p>
        </div>
      </div>
    </section>
  );
}
