'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BusTrip } from '@/types/BusTrip';
import { getBusTrips } from '@/services/busService';
import SeatSelection from '@/components/SeatSelection';

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
      <div className="min-h-screen p-8 flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-indigo-50">
        <div className="flex flex-col items-center gap-4">
          <svg className="w-12 h-12 text-blue-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          <div className="text-lg font-medium text-slate-700">Seferler yükleniyor...</div>
        </div>
      </div>
    );
  }

  if (selectedTrip) {
    return (
      <SeatSelection
        trip={selectedTrip}
        onBack={() => setSelectedTrip(null)}
      />
    );
  }

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
              {searchParams.get('from')} <span className="text-indigo-500">→</span> {searchParams.get('to')}
            </h1>
            <p className="text-sm text-slate-600 mt-1">{searchParams.get('date')}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-600">{trips.length} sefer bulundu</div>
            <button className="px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-white/20 text-sm text-slate-700 hover:scale-105 transition">
              Filtrele
            </button>
          </div>
        </div>

        {trips.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-800">!</div>
            <div>
              <p className="font-medium text-yellow-800">Bu kriterlere uygun sefer bulunamadı.</p>
              <p className="text-sm text-yellow-700">Tarihi veya destinasyonu kontrol edin ve yeniden deneyin.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {trips.map(trip => (
              <div key={trip.id} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-transform duration-200 hover:-translate-y-1">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-sky-400 text-white font-semibold">
                      {trip.busCompany.split(' ').map(s => s[0]).join('').slice(0,2)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-800">{trip.busCompany}</h3>
                      <p className="text-sm text-slate-500">{trip.busType}</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="font-semibold text-slate-800">{trip.departureTime}</div>
                    <div className="text-sm text-slate-500">{trip.from}</div>
                  </div>

                  <div className="text-center">
                    <div className="font-semibold text-slate-800">{trip.arrivalTime}</div>
                    <div className="text-sm text-slate-500">{trip.to}</div>
                  </div>

                  <div className="text-right flex flex-col items-end">
                    <div className="text-2xl font-extrabold text-indigo-600">
                      {trip.price} TL
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => setSelectedTrip(trip)}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-medium shadow-md hover:brightness-105 transition"
                      >
                        Koltuk Seç
                      </button>
                      <button className="px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-slate-800 hover:bg-white/20 transition">
                        Detay
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {trip.features.map(feature => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-white/6 backdrop-blur-sm rounded-full text-xs text-slate-700 border border-white/5"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}