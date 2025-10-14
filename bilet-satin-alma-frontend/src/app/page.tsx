'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BusTrip } from '@/types/BusTrip';
import { getBusTrips } from '@/services/busService';

const cities = [
  "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya",
  "Adana", "Konya", "Gaziantep", "Şanlıurfa", "Mersin"
];

export default function Home() {
  const router = useRouter();
  const [trips, setTrips] = useState<BusTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'time'>('time');

  useEffect(() => {
    const loadTrips = async () => {
      try {
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

  const sortedTrips = [...trips].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    }
    return a.departureTime.localeCompare(b.departureTime);
  });

  const filteredTrips = date
    ? sortedTrips.filter(trip => trip.departureDate === date)
    : sortedTrips;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 mb-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Otobüs Bileti Satın Al</h1>
          <p className="text-lg opacity-90">Türkiye'nin her yerine güvenli ve konforlu yolculuk</p>
        </div>
        
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tarihe Göre Filtrele
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="p-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sırala
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'price' | 'time')}
              className="p-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="time">Kalkış Saatine Göre</option>
              <option value="price">Fiyata Göre</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Seferler yükleniyor...</p>
          </div>
        ) : filteredTrips.length === 0 ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4">
            <p className="text-yellow-700 dark:text-yellow-500">Bu tarih için sefer bulunamadı.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredTrips.map(trip => (
              <div 
                key={trip.id} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  <div>
                    <h3 className="font-semibold text-lg dark:text-white">{trip.busCompany}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{trip.busType}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="font-semibold dark:text-white">{trip.departureTime}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{trip.from}</div>
                  </div>

                  <div className="text-center flex items-center justify-center">
                    <div className="w-full h-px bg-gray-300 dark:bg-gray-600 relative">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="font-semibold dark:text-white">{trip.arrivalTime}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{trip.to}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {trip.price} TL
                    </div>
                    <button
                      onClick={() => router.push(`/trips/${trip.id}`)}
                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                      Bileti Seç
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    {trip.features.map((feature, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
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
    </div>
  );
}
