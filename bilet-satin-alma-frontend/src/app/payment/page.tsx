'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { getBusTrips, purchaseTicket } from '@/services/busService';
import { BusTrip } from '@/types/BusTrip';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tripIdParam = searchParams.get('tripId');
  const seatParam = searchParams.get('seat');

  const [trip, setTrip] = useState<BusTrip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [passengerInfo, setPassengerInfo] = useState({ name: '', tc: '' });
  const [processing, setProcessing] = useState(false);

  const seatNumber = useMemo(() => {
    const n = Number(seatParam);
    return Number.isFinite(n) ? n : null;
  }, [seatParam]);

  useEffect(() => {
    const loadTrip = async () => {
      try {
        const id = Number(tripIdParam);
        if (!Number.isFinite(id)) {
          setError('Geçersiz sefer bilgisi');
          return;
        }
        // Mock serviste tüm seferleri çekip id ile buluyoruz
        const all = await getBusTrips();
        const found = all.find(t => t.id === id) || null;
        setTrip(found);
        if (!found) setError('Sefer bulunamadı');
      } catch (e) {
        setError('Sefer bilgisi yüklenemedi');
      } finally {
        setLoading(false);
      }
    };
    loadTrip();
  }, [tripIdParam]);

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trip || !seatNumber) {
      setError('Sefer veya koltuk bilgisi eksik');
      return;
    }
    setProcessing(true);
    setError('');
    try {
      await purchaseTicket(trip.id, seatNumber, passengerInfo.name, passengerInfo.tc);
      router.push('/my-tickets');
    } catch (err) {
      setError('Ödeme sırasında bir hata oluştu');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <section className="section-spacing flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
          <div className="text-lg font-medium text-brand-neutral">Ödeme sayfası yükleniyor...</div>
        </div>
      </section>
    );
  }

  if (!trip || !seatNumber) {
    return (
      <section className="section-spacing">
        <div className="container-minimal">
          <div className="p-6 rounded-2xl border border-morphism-border bg-white">
            <div className="text-red-600">Sefer veya koltuk bilgisi bulunamadı.</div>
            <div className="mt-4">
              <Button onClick={() => router.push('/trips')} variant="ghost">Seferlere Dön</Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-spacing">
      <div className="container-minimal">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-section mb-6">Ödeme Bilgileri</h1>

            <div className="p-6 rounded-2xl border border-morphism-border bg-white mb-8">
              <h2 className="text-lg font-semibold text-brand-neutral mb-4">Sefer Özeti</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
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
              <div className="flex items-center justify-between">
                <div className="text-sm text-brand-neutral/70">Otobüs • {trip.busCompany} • {trip.busType}</div>
                <div className="text-sm text-brand-neutral/70">Seçilen Koltuk: <span className="font-semibold text-brand-neutral">{seatNumber}</span></div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-morphism-border bg-white">
              <h2 className="text-lg font-semibold text-brand-neutral mb-4">Yolcu Bilgileri</h2>
              <form onSubmit={handlePurchase} className="space-y-6">
                <Input
                  label="Ad Soyad"
                  type="text"
                  value={passengerInfo.name}
                  onChange={(e) => setPassengerInfo(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                  required
                />

                <Input
                  label="T.C. Kimlik No"
                  type="text"
                  value={passengerInfo.tc}
                  onChange={(e) => setPassengerInfo(prev => ({ ...prev, tc: e.target.value.replace(/\D/g, '') }))}
                  placeholder="12345678901"
                  pattern="\d{11}"
                  maxLength={11}
                  required
                />

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
                )}

                <div className="border-t border-morphism-border pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-semibold text-brand-neutral">Ödenecek Tutar:</span>
                    <span className="text-2xl font-bold text-brand-primary">{trip.price} TL</span>
                  </div>
                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={processing}>
                    {processing ? 'İşleniyor...' : 'Ödemeyi Tamamla'}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div>
            <div className="p-6 rounded-2xl border border-morphism-border bg-white">
              <h2 className="text-lg font-semibold text-brand-neutral mb-4">Güvenli Ödeme</h2>
              <ul className="list-disc list-inside text-sm text-brand-neutral/80 space-y-2">
                <li>Ödeme bilgileriniz güvenli şekilde işlenir.</li>
                <li>İşlem sonrası biletlerim sayfasında biletinizi görüntüleyebilirsiniz.</li>
                <li>İptal ve iade koşulları için kullanım koşullarını inceleyin.</li>
              </ul>
              <div className="mt-6">
                <Button variant="ghost" onClick={() => router.back()}>Geri Dön</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
