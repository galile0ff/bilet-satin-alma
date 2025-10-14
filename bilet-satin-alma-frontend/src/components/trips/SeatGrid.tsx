'use client';

import { useState } from 'react';
import { BusTrip } from '@/types/BusTrip';

interface SeatGridProps {
  trip: BusTrip;
  selectedSeat: number | null;
  onSeatSelect: (seatNumber: number) => void;
}

export default function SeatGrid({ trip, selectedSeat, onSeatSelect }: SeatGridProps) {
  const createSeatPlan = () => {
    const rows = 13;
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
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-brand-neutral mb-4">Koltuk Seçimi</h2>

        <div className="flex justify-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded border border-morphism-border"></div>
            <span className="text-sm text-brand-neutral/70">Dolu</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-brand-primary rounded border border-morphism-border"></div>
            <span className="text-sm text-brand-neutral/70">Seçili</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-morphism-border rounded"></div>
            <span className="text-sm text-brand-neutral/70">Boş</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-5 gap-2 max-w-md">
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
                onClick={() => onSeatSelect(seatNumber)}
                className={`
                  w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-300
                  ${!isAvailable
                    ? 'bg-gray-200 cursor-not-allowed text-gray-400'
                    : isSelected
                    ? 'bg-brand-primary text-white shadow-lg transform scale-110'
                    : 'border-2 border-morphism-border hover:border-brand-primary/50 hover:bg-brand-light'
                  }
                `}
              >
                {seatNumber}
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-center text-sm text-brand-neutral/70">
        Önde sürücü bölümü
      </div>
    </div>
  );
}
