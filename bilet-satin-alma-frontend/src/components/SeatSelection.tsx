'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BusTrip } from '@/types/BusTrip';
import { purchaseTicket } from '@/services/busService';

interface SeatSelectionProps {
  trip: BusTrip;
  onBack: () => void;
}

export default function SeatSelection({ trip, onBack }: SeatSelectionProps) {
  const router = useRouter();
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [passengerInfo, setPassengerInfo] = useState({
    name: '',
    tc: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSeat) {
      setError('Lütfen bir koltuk seçin');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await purchaseTicket(
        trip.id,
        selectedSeat,
        passengerInfo.name,
        passengerInfo.tc
      );
      router.push('/my-tickets');
    } catch (error) {
      setError('Bilet satın alınırken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // 2+1 veya 2+2 otobüs düzeni için koltuk planı
  const createSeatPlan = () => {
    const rows = 13; // Varsayılan 13 sıra
    const seats = [];
    const is2plus1 = trip.busType === "2+1";

    for (let row = 1; row <= rows; row++) {
      if (is2plus1) {
        // 2+1 düzeni
        seats.push(row * 3 - 2); // Sol
        seats.push(row * 3 - 1); // Sol orta
        seats.push(null); // Koridor
        seats.push(row * 3); // Sağ
      } else {
        // 2+2 düzeni
        seats.push(row * 4 - 3); // Sol
        seats.push(row * 4 - 2); // Sol orta
        seats.push(null); // Koridor
        seats.push(row * 4 - 1); // Sağ orta
        seats.push(row * 4); // Sağ
      }
    }
    return seats;
  };

  const seatPlan = createSeatPlan();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-700"
        >
          <span>← Sefer Listesine Dön</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sol taraf: Koltuk seçimi */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Koltuk Seçimi</h2>
            
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <span className="text-sm">Dolu</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Seçili</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                <span className="text-sm">Boş</span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {seatPlan.map((seatNumber, index) => {
                if (seatNumber === null) {
                  return <div key={`space-${index}`} className="w-8 h-8" />;
                }

                const isAvailable = trip.availableSeats.includes(seatNumber);
                const isSelected = selectedSeat === seatNumber;

                return (
                  <button
                    key={seatNumber}
                    disabled={!isAvailable}
                    onClick={() => setSelectedSeat(seatNumber)}
                    className={`
                      w-8 h-8 rounded-md flex items-center justify-center text-sm
                      ${!isAvailable ? 'bg-gray-200 cursor-not-allowed' :
                        isSelected ? 'bg-green-500 text-white' :
                        'border-2 border-gray-300 hover:border-blue-500'
                      }
                    `}
                  >
                    {seatNumber}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sağ taraf: Yolcu bilgileri ve ödeme */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Yolcu Bilgileri</h2>

            <form onSubmit={handlePurchase} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  required
                  value={passengerInfo.name}
                  onChange={(e) => setPassengerInfo(prev => ({
                    ...prev,
                    name: e.target.value
                  }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  T.C. Kimlik No
                </label>
                <input
                  type="text"
                  required
                  pattern="\d{11}"
                  maxLength={11}
                  value={passengerInfo.tc}
                  onChange={(e) => setPassengerInfo(prev => ({
                    ...prev,
                    tc: e.target.value.replace(/\D/g, '')
                  }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Toplam Tutar:</span>
                  <span className="text-xl font-bold text-blue-600">
                    {trip.price} TL
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading || !selectedSeat}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                           disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'İşleniyor...' : 'Ödeme Yap'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}