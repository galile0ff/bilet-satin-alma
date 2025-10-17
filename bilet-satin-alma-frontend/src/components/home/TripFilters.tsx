'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface TripFiltersProps {
  onFilterChange: (filters: {
    date?: string;
    sortBy?: 'price' | 'time';
  }) => void;
}

export default function TripFilters({ onFilterChange }: TripFiltersProps) {
  const [date, setDate] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'time'>('time');

  const handleFilterChange = () => {
    onFilterChange({
      date: date || undefined,
      sortBy
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch gap-3">
      <div className="flex-1 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="sr-only">Tarihe Göre Filtrele</label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              handleFilterChange();
            }}
            min={new Date().toISOString().split('T')[0]}
            className="w-full h-11 px-4 bg-morphism-surface border border-morphism-border rounded-xl text-brand-neutral focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all duration-300"
          />
        </div>

        <div className="w-full sm:w-56">
          <label className="sr-only">Sırala</label>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as 'price' | 'time');
              handleFilterChange();
            }}
            className="w-full h-11 px-4 bg-morphism-surface border border-morphism-border rounded-xl text-brand-neutral focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all duration-300"
          >
            <option value="time">Kalkış Saati</option>
            <option value="price">Fiyat</option>
          </select>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="h-11"
        onClick={() => {
          setDate('');
          setSortBy('time');
          onFilterChange({});
        }}
      >
        Filtreleri Temizle
      </Button>
    </div>
  );
}
