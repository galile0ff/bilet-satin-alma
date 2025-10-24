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
  onSelectTrip: (trip: BusTrip) => void;
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
    weekday: 'short',
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
  <svg
    className="w-4 h-4 mr-1.5 text-brand-neutral/70"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default function TripCard({ trip, onSelectTrip }: TripCardProps) {
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
    <Card className="animate-morph-in shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 ease-out">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-y-6 gap-x-4 items-center p-6">
        <div className="md:col-span-1">
          <div>
            <h3 className="font-semibold text-lg text-brand-neutral tracking-tight">
              {trip.busCompany}
            </h3>
            <p className="text-sm text-brand-neutral/70">{trip.busType}</p>
          </div>
        </div>

        <div className="text-center md:text-left">
          <div className="text-2xl font-bold text-brand-neutral tracking-tight">
            {trip.departureTime}
          </div>
          <div className="text-sm font-medium text-brand-neutral/90">
            {trip.from}
          </div>
          <div className="text-xs text-brand-neutral/70 mt-0.5">
            {departureDateFormatted}
          </div>
        </div>

        <div className="text-center flex flex-col items-center justify-center">
          <div className="flex items-center px-3 py-1.5 rounded-full bg-brand-light border border-morphism-border">
            <ClockIcon />
            <span className="text-sm font-medium text-brand-neutral/80">
              {duration}
            </span>
          </div>
          <div className="w-full border-t border-dashed border-brand-neutral/30 mt-3"></div>
        </div>

        <div className="text-center md:text-right">
          <div className="text-2xl font-bold text-brand-neutral tracking-tight">
            {trip.arrivalTime}
          </div>
          <div className="text-sm font-medium text-brand-neutral/90">
            {trip.to}
          </div>
          <div className="text-xs text-brand-neutral/70 mt-0.5">
            {arrivalDateFormatted}
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <div className="text-3xl font-extrabold text-brand-primary tracking-tight">
            {trip.price} TL
          </div>
          <p className="text-xs text-brand-neutral/60 -mt-1 mb-3">gezgin başına</p>
          <Button
            variant="primary"
            size="lg"
            className="w-full md:w-auto shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            onClick={() => onSelectTrip(trip)}
          >
            Koltuk Seç
          </Button>
        </div>
      </div>
    </Card>
  );
}