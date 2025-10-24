import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export interface BusTrip {
  id: string;
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  busCompany: string;
  price: number;
  bookedSeats: number[];
  capacity: number;
  busType: string;
  features: string[];
}

interface TripCardProps {
  trip: BusTrip;
}

function parseSafeDate(dateStr: string): Date | null {
  if (!dateStr) return null;

  const parts = dateStr.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/);
  
  if (parts) {
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[2], 10) - 1;
    const year = parseInt(parts[3], 10);
    const date = new Date(year, month, day);
    if (!isNaN(date.getTime())) return date;
  }

  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) return date;

  console.warn('Tanınamayan tarih formatı:', dateStr);
  return null;
}

function formatDate(date: Date | null): string {
  if (!date) {
    return 'Geçersiz Tarih';
  }
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  });
}

function getArrivalDate(
  departureDateStr: string,
  startTime: string,
  endTime: string
): Date | null {
  const departureDate = parseSafeDate(departureDateStr);
  if (!departureDate) return null;

  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  const arrivalDate = new Date(departureDate.getTime());

  if (endTotalMinutes < startTotalMinutes) {
    arrivalDate.setDate(arrivalDate.getDate() + 1);
  }

  return arrivalDate;
}

function calculateDuration(startTime: string, endTime: string): string {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  let startTotalMinutes = startHours * 60 + startMinutes;
  let endTotalMinutes = endHours * 60 + endMinutes;
  if (endTotalMinutes < startTotalMinutes) {
    endTotalMinutes += 24 * 60;
  }
  const durationInMinutes = endTotalMinutes - startTotalMinutes;
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  if (hours > 0 && minutes > 0) return `${hours}s ${minutes}dk`;
  if (hours > 0) return `${hours}s`;
  return `${minutes}dk`;
}

const ClockIcon = () => (
  <svg className="w-3.5 h-3.5 mr-1.5 text-brand-neutral/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const ArrowRightIcon = () => (
  <svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
);

export default function TripCard({ trip }: TripCardProps) {
  const duration = calculateDuration(trip.departureTime, trip.arrivalTime);
  const departureDateObj = parseSafeDate(trip.departureDate);
  const arrivalDateObj = getArrivalDate(
    trip.departureDate,
    trip.departureTime,
    trip.arrivalTime
  );
  const departureDateFormatted = formatDate(departureDateObj);
  const arrivalDateFormatted = formatDate(arrivalDateObj);

  return (
    <Card className="overflow-hidden animate-morph-in shadow-xl hover:shadow-2xl transition-all duration-300 ease-out bg-white rounded-2xl">
      
      <div className="px-6 py-5 bg-green-50 border-b border-green-200">
        <h3 className="text-xl font-semibold text-green-800 tracking-tight">
          {trip.busCompany}
        </h3>
          <p className="text-sm text-green-600 -mt-0.5">{trip.busType}</p>
      </div>


      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="text-left">
            <div className="text-3xl font-bold text-brand-neutral tracking-tight">
              {trip.departureTime}
            </div>
            <div className="text-base font-medium text-brand-neutral/90 mt-1">
              {trip.from}
            </div>
            <div className="text-sm text-brand-neutral/70">
              {departureDateFormatted}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-brand-neutral tracking-tight">
              {trip.arrivalTime}
            </div>
            <div className="text-base font-medium text-brand-neutral/90 mt-1">
              {trip.to}
            </div>
            <div className="text-sm text-brand-neutral/70">
              {arrivalDateFormatted}
            </div>
          </div>
        </div>

        <div className="flex items-center w-full mt-6">
          <div className="w-3 h-3 bg-brand-primary rounded-full ring-4 ring-brand-primary/10"></div>
          
          <div className="flex-1 border-t border-dashed border-brand-neutral/30 mx-3"></div>
          
          <div className="flex items-center px-3 py-1.5 rounded-full bg-brand-light border border-morphism-border">
            <ClockIcon />
            <span className="text-sm font-medium text-brand-neutral/90">
              {duration}
            </span>
          </div>
          
          <div className="flex-1 border-t border-dashed border-brand-neutral/30 mx-3"></div>
          
          <div className="p-1.5 rounded-full border-2 border-brand-primary/50 bg-white shadow-sm">
            <ArrowRightIcon />
          </div>
        </div>
      </div>

      <div className="px-6 py-5 border-t border-dashed border-brand-neutral/20 flex justify-between items-center">
        <div>
          <p className="text-xs text-brand-neutral/80 mb-0.5">Gezgin başına</p>
          <div className="text-3xl font-extrabold text-brand-primary tracking-tight">
            {trip.price} TL
          </div>
        </div>
        
        <Link href={`/trips?tripId=${trip.id}`} className="flex-shrink-0">
          <Button
            variant="primary"
            size="lg"
            className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Koltuk Seç
          </Button>
        </Link>
      </div>
    </Card>
  );
}