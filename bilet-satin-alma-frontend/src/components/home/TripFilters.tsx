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
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <label className="block text-sm font-medium text-brand-neutral mb-2">
            Tarihe Göre Filtrele
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              handleFilterChange();
            }}
            min={new Date().toISOString().split('T')[0]}
            className="px-4 py-2 bg-morphism-surface border border-morphism-border rounded-xl text-brand-neutral focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all duration-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-neutral mb-2">
            Sırala
          </label>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as 'price' | 'time');
              handleFilterChange();
            }}
            className="px-4 py-2 bg-morphism-surface border border-morphism-border rounded-xl text-brand-neutral focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all duration-300"
          >
            <option value="time">Kalkış Saatine Göre</option>
            <option value="price">Fiyata Göre</option>
          </select>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
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
