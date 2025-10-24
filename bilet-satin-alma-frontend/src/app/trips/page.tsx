'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { BusTrip } from '@/types/BusTrip';
import { getTrips } from '@/services/busService';
import SearchSection from '@/components/home/SearchSection';
import TripCard from '@/components/trips/TripCard';
import SeatGrid from '@/components/trips/SeatGrid';
import Button from '@/components/ui/Button';

export default function Trips() {
  const [trips, setTrips] = useState<BusTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState<BusTrip | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showAuthWarning, setShowAuthWarning] = useState(false);

  useEffect(() => {
    if (user?.role === 'company') {
      router.push('/trips');
    }
  }, [user, router]);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const from = searchParams.get('from');
        const to = searchParams.get('to');
        const data = await getTrips(from, to);
        setTrips(data);

        const tripId = searchParams.get('tripId');
        if (tripId) {
          const selected = data.find(t => t.id === tripId);
          if (selected) {
            setSelectedTrip(selected);
          }
        }
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
      <div className="section-spacing bg-gray-50/50">
        <div className="container-minimal">
          <div className="mb-8">
            <button
              onClick={() => { setSelectedTrip(null); setSelectedSeat(null); }}
              className="flex items-center gap-2 text-brand-primary hover:text-brand-secondary transition-colors font-medium border border-brand-primary/20 hover:border-brand-primary rounded-full px-4 py-2 bg-white shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Seferlere Geri Dön
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2"> 
              <h2 className="text-2xl font-bold text-brand-neutral mb-2">Yolculuk Öncesi Hazırlık</h2>
              <div className="p-4 mb-6 rounded-xl border-2 border-yellow-700/50 bg-yellow-50 shadow-md text-yellow-800">
                <h3 className="flex items-center gap-2 font-semibold text-lg mb-1">
                  <svg className="w-6 h-6 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 3h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.368 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Yolculuk Kuralı: Tek Bir Yüzük, Tek Bir Koltuk!
                </h3>
                <p className="text-sm">
                  Orta Dünya'nın şartları gereği, her fani **yalnızca tek bir koltuk** seçebilir. Lütfen yerinizi dikkatlice belirleyiniz. Yanınızdaki boş koltuk bir elf, cüce veya ork tarafından doldurulabilir.
                </p>
              </div>

              <div className="p-4 mb-6 rounded-xl border-2 border-blue-700/50 bg-blue-50 shadow-md text-blue-800">
                <h3 className="flex items-center gap-2 font-semibold text-lg mb-1">
                  <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  İptal Politikası
                </h3>
                <p className="text-sm">
                  Biletinizi sefer saatine <strong>1 saat</strong> kalana kadar iptal edebilirsiniz. İptal durumunda ödediğiniz tutar bakiyenize iade edilecektir.
                </p>
              </div>

              <SeatGrid trip={selectedTrip} selectedSeat={selectedSeat} onSeatSelect={setSelectedSeat} />
            </div>

            <div className="lg:col-span-1"> 
              <h2 className="text-2xl font-bold text-brand-neutral mb-4">Seferinizin Bilgileri</h2> 
              <div className="space-y-4 p-6 rounded-2xl border border-morphism-border bg-white shadow-xl"> 
                <div className="pb-4 border-b border-morphism-border/50"> 
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-xl text-brand-neutral">{selectedTrip.busCompany}</div>
                      <div className="text-sm text-brand-neutral/70">{selectedTrip.busType}</div>
                    </div>
                    <div className="text-3xl font-extrabold text-brand-primary">{selectedTrip.price} TL</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-2 border-l-4 border-brand-primary/50"> 
                    <div className="text-sm text-brand-neutral/70">Kalkış Diyarı</div>
                    <div className="font-semibold text-brand-neutral">{selectedTrip.from}</div>
                    <div className="text-xs text-brand-neutral/60">{selectedTrip.departureDate} • {selectedTrip.departureTime}</div>
                  </div>
                  <div className="p-2 border-l-4 border-green-500/50"> 
                    <div className="text-sm text-brand-neutral/70">Varış Noktası</div>
                    <div className="font-semibold text-brand-neutral">{selectedTrip.to}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-morphism-border/50">
                  <div className="text-sm text-brand-neutral/70 mb-2 font-medium">Seferin Özellikleri</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrip.features.map((f, i) => (
                      <span key={i} className="px-3 py-1 bg-brand-light text-brand-neutral/80 rounded-full text-xs border border-morphism-border shadow-inner">{f}</span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-morphism-border pt-6">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full h-12 text-lg font-bold" 
                    onClick={() => {
                      if (!selectedSeat) {
                        alert('Lütfen bir koltuk seçin.');
                        return;
                      }
                      if (!user) {
                        setShowAuthWarning(true);
                      } else {
                        router.push(`/payment?tripId=${selectedTrip.id}&seat=${selectedSeat}`);
                      }
                    }}
                  >
                    Koltuk {selectedSeat ? `#${selectedSeat}` : ''} için Altın Keseni Hazırla (●'◡'●)
                  </Button>
                  {showAuthWarning && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                      <p className="mb-2">
                        Altın keseni açmadan önce kim olduğunu bilmeliyiz gezgin. Ödeme yapabilmek için lütfen giriş yap ya da kayıt ol — Orta Dünya’da yolculuklar güvenle başlar.
                      </p>
                      <Button 
                        variant="secondary"
                        size="sm"
                        className="w-full"
                        onClick={() => router.push(`/login?redirect=/trips?tripId=${selectedTrip.id}`)}
                      >
                        Giriş Yap / Kayıt Ol
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-[-4.5rem]">
        <SearchSection />
      </div>
      <section className="pt-2 pb-12">
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
    </>
  );
}
