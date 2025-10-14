import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { BusTrip } from '@/types/BusTrip';

interface TripCardProps {
  trip: BusTrip;
}

export default function TripCard({ trip }: TripCardProps) {
  return (
    <Card className="p-6 animate-morph-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center text-white font-semibold">
            {trip.busCompany.split(' ').map(s => s[0]).join('').slice(0,2)}
          </div>
          <div>
            <h3 className="font-semibold text-brand-neutral">{trip.busCompany}</h3>
            <p className="text-sm text-brand-neutral/70">{trip.busType}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-brand-primary">{trip.price} TL</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="font-semibold text-brand-neutral">{trip.departureTime}</div>
          <div className="text-sm text-brand-neutral/70">{trip.from}</div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full h-px bg-brand-neutral/20 relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white p-1 rounded-full border border-morphism-border">
              <svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="font-semibold text-brand-neutral">{trip.arrivalTime}</div>
          <div className="text-sm text-brand-neutral/70">{trip.to}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {trip.features.slice(0, 3).map((feature, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-brand-light text-brand-neutral/80 rounded-full text-xs border border-morphism-border"
          >
            {feature}
          </span>
        ))}
        {trip.features.length > 3 && (
          <span className="px-3 py-1 bg-brand-accent text-brand-neutral rounded-full text-xs">
            +{trip.features.length - 3}
          </span>
        )}
      </div>

      <div className="flex gap-3">
        <Link href={`/trips/${trip.id}`} className="flex-1">
          <Button variant="primary" size="sm" className="w-full">
            Detaylar
          </Button>
        </Link>
        <Link href={`/trips/${trip.id}`} className="flex-1">
          <Button variant="secondary" size="sm" className="w-full">
            Bilet Al
          </Button>
        </Link>
      </div>
    </Card>
  );
}
