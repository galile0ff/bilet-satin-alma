'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { purchaseTicket } from '@/services/busService';
import { BusTrip } from '@/types/BusTrip';

interface PassengerFormProps {
  trip: BusTrip;
  selectedSeat: number | null;
}

export default function PassengerForm({ trip, selectedSeat }: PassengerFormProps) {
  const router = useRouter();
  const [passengerInfo, setPassengerInfo] = useState({
    name: '',
    tc: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (err) {
      setError('Bilet satın alınırken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-brand-neutral">Yolcu Bilgileri</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
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
          onChange={(e) => setPassengerInfo(prev => ({
            ...prev,
            tc: e.target.value.replace(/\D/g, '')
          }))}
          placeholder="12345678901"
          pattern="\d{11}"
          maxLength={11}
          required
        />

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="border-t border-morphism-border pt-6">
          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold text-brand-neutral">Toplam Tutar:</span>
            <span className="text-2xl font-bold text-brand-primary">
              {trip.price} TL
            </span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={loading || !selectedSeat}
          >
            {loading ? 'İşleniyor...' : 'Ödeme Yap'}
          </Button>
        </div>
      </form>
    </div>
  );
}
