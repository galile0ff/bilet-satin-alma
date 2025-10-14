'use client';

import Button from '@/components/ui/Button';

interface TripFiltersProps {
  tripCount: number;
  onFilterClick: () => void;
}

export default function TripFilters({ tripCount, onFilterClick }: TripFiltersProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-neutral mb-1">
          İstanbul → Ankara
        </h1>
        <p className="text-sm text-brand-neutral/70">25 Aralık 2024</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-sm text-brand-neutral/70">{tripCount} sefer bulundu</div>
        <Button variant="ghost" size="sm" onClick={onFilterClick}>
          Filtrele
        </Button>
      </div>
    </div>
  );
}
