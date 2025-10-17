'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getTrips, purchaseTicket } from '@/services/busService';
import { BusTrip } from '@/types/BusTrip';
import Button from '@/components/ui/Button';

// ----------------------------------------------------------------------
// TYPESCRIPT: DetailItem Bileşeni için Prop Tanımı
// ----------------------------------------------------------------------
interface DetailItemProps {
    title: string;
    value: string | number; 
    isHighlighted?: boolean;
}

// ----------------------------------------------------------------------
// YARDIMCI BİLEŞEN: Detay Satırı
// ----------------------------------------------------------------------
const DetailItem: React.FC<DetailItemProps> = ({ title, value, isHighlighted = false }) => (
    <div className={`flex justify-between items-center py-3 px-1 transition-all duration-300 ${
        isHighlighted 
            ? 'border-l-4 border-yellow-600 bg-yellow-50/50 pl-5 rounded-md shadow-sm' 
            : 'border-b border-gray-200 hover:bg-gray-50'
    }`}>
        <span className={`${isHighlighted ? 'font-bold text-lg text-gray-800' : 'text-base text-gray-600'}`}>{title}</span>
        <span className={`${isHighlighted ? 'font-extrabold text-xl text-yellow-700' : 'font-semibold text-gray-800'}`}>{value}</span>
    </div>
);


// ----------------------------------------------------------------------
// ANA BİLEŞEN: PaymentPage
// ----------------------------------------------------------------------
export default function PaymentPage() {
    const { user, loading, updateUser } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [trip, setTrip] = useState<BusTrip | null>(null);
    const [seat, setSeat] = useState<number | null>(null);

    // Kullanıcı girişi kontrolü
    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    // URL parametrelerinden sefer ve koltuk bilgisini çekme
    useEffect(() => {
        const tripId = searchParams.get('tripId');
        const seatNumber = searchParams.get('seat');
        if (tripId && seatNumber) {
            setSeat(Number(seatNumber));
            getTrips().then(trips => {
                const foundTrip = trips.find(t => t.id === tripId);
                setTrip(foundTrip || null);
            });
        }
    }, [searchParams]);

    // Yükleme ve veri kontrolü
    if (loading || !user) {
        return (
            <div className="section-spacing flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
                    <div className="text-lg font-medium text-brand-neutral">Altın keseniz kontrol ediliyor...</div>
                </div>
            </div>
        );
    }
    
    if (!trip) {
        return (
            <div className="container-minimal section-spacing text-center text-red-600">
                Hata: Sefer bilgileri bulunamadı. Lütfen seferlere geri dönün.
            </div>
        );
    }

    // Bakiye kontrolü
    const isBalanceSufficient = user.balance >= trip.price;
    const missingAmount = trip.price - user.balance;

    const handlePurchase = async () => {
        if (!trip || seat === null) {
            alert('Sefer veya koltuk bilgisi eksik.');
            return;
        }

        try {
            const result = await purchaseTicket(trip.id, seat);
            alert(result.message);
            if (result.user) {
                updateUser(result.user); // Update user context with new balance
            }
            router.push('/my-tickets');
        } catch (error: any) {
            alert(`Hata: ${error.message}`);
        }
    };

    return (
        <div className="container-minimal section-spacing bg-gray-50/50 min-h-screen-minus-header">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Fatura Bilgisi: Yolculuk Onayı</h1>
            <p className="text-gray-600 mb-8">Bu yolculuğa çıkmadan önceki son adımlarınız.</p>
            
            {/* ANA İÇERİK: ÜÇ SÜTUNLU DÜZEN (Detaylar ve Ödeme) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* SOL KISIM: YOLCULUK DETAYLARI */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Sefer Bilgileri Kartı */}
                    <div className="p-8 bg-white rounded-3xl shadow-2xl border border-gray-100">
                        <h2 className="text-3xl font-extrabold mb-6 text-brand-primary flex items-center gap-3 border-b pb-3 border-brand-primary/20">
                            <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2h-1v-4h1z" /></svg>
                            Sefer Detayları
                        </h2>
                        
                        <div className="space-y-2">
                            <DetailItem title="Güzergah" value={`${trip.from} ➡️ ${trip.to}`} />
                            <DetailItem title="Tarih / Saat" value={`${trip.departureDate} • ${trip.departureTime}`} />
                            
                            <DetailItem 
                                title="Koltuk Numarası" 
                                value={seat === null ? 'Bilinmiyor' : seat} 
                                isHighlighted={true} 
                            /> 
                            
                            <DetailItem title="Taşıyıcı Firma" value={trip.busCompany} />
                            <DetailItem title="Otobüs Tipi" value={trip.busType} />
                        </div>
                    </div>

                    {/* Fiyat ve Özet Kartı */}
                    <div className="p-8 bg-white rounded-3xl shadow-2xl border border-gray-100">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-3">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m4 2h.01M16 18H9a2 2 0 01-2-2v-3a2 2 0 012-2h7l4-2v7l-4 2z" /></svg>
                            Fatura Özeti
                        </h2>
                        <div className="space-y-3 pt-2">
                            <div className="flex justify-between items-center pt-4">
                                <span className="text-2xl font-extrabold text-gray-900">TOPLAM ÖDEME</span>
                                <span className="text-4xl font-black text-brand-primary tracking-tight">{trip.price} TL</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* SAĞ KISIM: BAKİYE VE ONAY BUTONU (Sticky) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-12 p-6 bg-yellow-50 rounded-3xl shadow-2xl border-2 border-yellow-300">
                        <h3 className="text-2xl font-extrabold mb-4 text-gray-900">Kese Durumu</h3>

                        <div className="flex flex-col gap-3 mb-6 border-b pb-4 border-yellow-200">
                            <div className="flex justify-between items-center text-lg">
                                <span className="text-gray-700">Mevcut Altın:</span>
                                <span className="font-bold text-green-700 text-xl">{user.balance} TL</span>
                            </div>
                            <div className="flex justify-between items-center text-lg pt-2">
                                <span className="text-gray-700">Gerekli Altın:</span>
                                <span className="font-bold text-red-600 text-xl">{trip.price} TL</span>
                            </div>
                        </div>
                        
                        {/* ONAY BUTONU VEYA YETERSİZ BAKİYE UYARISI */}
                        {isBalanceSufficient ? (
                          <Button 
                            variant="primary" 
                            size="lg" 
                            className="w-full mt-4 h-14 text-xl font-extrabold tracking-wide"
                            onClick={handlePurchase} 
                          >
                            Kesenin Ağzını Aç (●'◡'●)
                          </Button>
                        ) : (
                          <>
                            <div className="mt-4 p-4 bg-red-100 border-2 border-red-500 rounded-xl text-red-800 font-bold text-center">
                              <p className="mb-2">⚠️ YETERSİZ BAKİYE!</p>
                              <p className="text-sm">
                                Lütfen kesenize **{missingAmount.toFixed(2)} TL** daha altın ekleyin.
                              </p>
                            </div>
                            <Button 
                                variant="secondary"
                                size="lg"
                                className="w-full mt-4 h-14 opacity-70 cursor-not-allowed"
                                disabled={true}
                            >
                                Ödeme Kapısı Kilitli
                            </Button>
                          </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
