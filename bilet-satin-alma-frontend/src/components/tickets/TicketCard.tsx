import { Ticket } from '@/types/BusTrip';

interface TicketCardProps {
  ticket: Ticket;
}

export default function TicketCard({ ticket }: TicketCardProps) {
  return (
    <div className="bg-morphism-surface backdrop-blur-md border border-morphism-border rounded-2xl p-6 shadow-morphism animate-morph-in">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center space-x-3 mb-4">
            <h3 className="text-lg font-semibold text-brand-neutral">
              {ticket.busCompany}
            </h3>
            <span className="px-3 py-1 text-xs rounded-full bg-brand-primary text-white font-medium">
              {ticket.seatNumber} Numaralı Koltuk
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <p className="font-semibold text-brand-neutral">{ticket.departureTime}</p>
              <p className="text-sm text-brand-neutral/70">{ticket.from}</p>
            </div>

            <div className="flex-1 h-px bg-brand-neutral/20 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-primary absolute -top-2 left-1/2 transform -translate-x-1/2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            <div>
              <p className="font-semibold text-brand-neutral">{ticket.arrivalTime}</p>
              <p className="text-sm text-brand-neutral/70">{ticket.to}</p>
            </div>
          </div>
        </div>

        <div className="lg:text-center">
          <div className="mb-2">
            <p className="text-sm text-brand-neutral/70">Yolculuk Tarihi</p>
            <p className="font-semibold text-brand-neutral">{ticket.departureDate}</p>
          </div>
          <div>
            <p className="text-sm text-brand-neutral/70">Satın Alma Tarihi</p>
            <p className="font-semibold text-brand-neutral">{ticket.purchaseDate}</p>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="text-right mb-4">
            <p className="text-sm text-brand-neutral/70">Bilet Tutarı</p>
            <p className="text-2xl font-bold text-brand-primary">{ticket.price} TL</p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              className="px-4 py-2 text-sm font-medium text-brand-primary hover:text-brand-secondary transition-colors"
              onClick={() => window.print()}
            >
              PDF İndir
            </button>
            <button
              className="px-4 py-2 bg-brand-primary text-white rounded-xl font-medium hover:bg-brand-secondary transition-colors"
              onClick={() => alert('Bilet detayları görüntülenecek')}
            >
              Bileti Görüntüle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
