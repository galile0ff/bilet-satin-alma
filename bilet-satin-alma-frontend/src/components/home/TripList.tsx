'use client';

import { useState, useEffect } from 'react';
import { BusTrip } from '@/types/BusTrip';
import { getBusTrips } from '@/services/busService';
import TripCard from './TripCard';
import TripFilters from './TripFilters';

export default function TripList() {
  const [trips, setTrips] = useState<BusTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredTrips, setFilteredTrips] = useState<BusTrip[]>([]);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const data = await getBusTrips();
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

  const handleFilterChange = (filters: { date?: string; sortBy?: 'price' | 'time' }) => {
    let filtered = [...trips];

    // Tarih filtresi
    if (filters.date) {
      filtered = filtered.filter(trip => trip.departureDate === filters.date);
    }

    // Sıralama
    if (filters.sortBy === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else {
      filtered.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    }

    setFilteredTrips(filtered);
  };

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
    <section className="section-spacing">
      <div className="container-minimal">
        <div className="text-center mb-12">
          <h2 className="text-section mb-4">Popüler Seferler</h2>
          <p className="text-body max-w-2xl mx-auto">
            En çok tercih edilen rotalarda güncel sefer bilgilerini görüntüleyin
          </p>
        </div>

        <TripFilters onFilterChange={handleFilterChange} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTrips.map(trip => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-brand-neutral/70 mb-4">
            {filteredTrips.length} sefer gösteriliyor
          </p>
          <button className="px-6 py-3 bg-morphism-surface border border-morphism-border rounded-xl text-brand-neutral hover:border-brand-primary/30 transition-all duration-300">
            Daha Fazla Sefer Gör
          </button>
        </div>
      </div>
    </section>
  );
}
