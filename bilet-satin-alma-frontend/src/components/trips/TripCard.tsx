import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { BusTrip } from '@/types/BusTrip';

interface TripCardProps {
  trip: BusTrip;
  onSelectTrip: (trip: BusTrip) => void;
}

export default function TripCard({ trip, onSelectTrip }: TripCardProps) {
  return (
    <Card className="p-6 animate-morph-in">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-brand rounded-xl flex items-center justify-center text-white font-semibold">
            {trip.busCompany.split(' ').map(s => s[0]).join('').slice(0,2)}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-brand-neutral">{trip.busCompany}</h3>
            <p className="text-sm text-brand-neutral/70">{trip.busType}</p>
          </div>
        </div>

        <div className="text-center">
          <div className="font-semibold text-brand-neutral">{trip.departureTime}</div>
          <div className="text-sm text-brand-neutral/70">{trip.from}</div>
        </div>

        <div className="text-center flex items-center justify-center">
          <div className="w-full h-px bg-brand-neutral/20 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full border border-morphism-border">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="font-semibold text-brand-neutral">{trip.arrivalTime}</div>
          <div className="text-sm text-brand-neutral/70">{trip.to}</div>
        </div>

        <div className="text-right flex flex-col items-end">
          <div className="text-2xl font-bold text-brand-primary mb-3">
            {trip.price} TL
          </div>
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onSelectTrip(trip)}
            >
              Bilet Al
            </Button>
            <Link href={`/trips/${trip.id}`}>
              <Button variant="ghost" size="sm">
                Detay
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-morphism-border">
        <div className="flex flex-wrap gap-2">
          {trip.features.map((feature, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-brand-light text-brand-neutral/80 rounded-full text-xs border border-morphism-border"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
