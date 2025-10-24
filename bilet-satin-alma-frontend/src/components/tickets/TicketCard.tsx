import { useRef } from 'react';
import { Ticket } from '@/types/BusTrip';
import { deleteTicket } from '@/services/busService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface TicketCardProps {
  ticket: Ticket;
  onTicketDeleted: (ticketId: string, updatedUser: any) => void;
}

export default function TicketCard({ ticket, onTicketDeleted }: TicketCardProps) {
  const ticketRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const ticketElement = ticketRef.current;
    if (ticketElement) {
      const buttons = ticketElement.querySelector('.ticket-buttons') as HTMLElement;
      if (buttons) buttons.style.display = 'none';

      const canvas = await html2canvas(ticketElement, {
        scale: 2,
        backgroundColor: null,
      });

      if (buttons) buttons.style.display = 'flex';

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'pt', 'a5');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save(`bilet-${ticket.id}.pdf`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Bu bilet Orta Dünya\'dan silinecek, emin misin?')) {
      try {
        const response = await deleteTicket(ticket.id);
        onTicketDeleted(ticket.id, response.user);
      } catch (error: any) {
        alert(`Bilet silinirken bir hata oluştu: ${error.message}`);
      }
    }
  };

  return (
    <div ref={ticketRef} className="border border-green-200 rounded-lg bg-white">
      <div className="p-6 border-b border-green-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-green-800 mb-1">{ticket.company_name}</h3>
            <p className="text-sm text-gray-600">
              {new Date(ticket.departure_time).toLocaleDateString('tr-TR')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl sm:text-4xl font-extrabold text-green-800">{ticket.total_price} TL</p>
            <p className="text-sm text-gray-600">Koltuk: {ticket.seat_number}</p>
          </div>
        </div>
      </div>

      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-3 gap-4 items-center">
          <div>
            <p className="text-xs text-gray-600 mb-1">Kalkış</p>
            <p className="text-xl font-bold text-gray-900">{ticket.departure_city}</p>
            <p className="text-sm text-gray-600">
              {new Date(ticket.departure_time).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          
          <div className="flex justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-gray-600 mb-1">Varış</p>
            <p className="text-xl font-bold text-gray-900">{ticket.destination_city}</p>
            <p className="text-sm text-gray-600">
              {new Date(ticket.arrival_time).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-600 mb-1">Koltuk No</p>
            <p className="text-lg font-bold text-gray-900">{ticket.seat_number}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Fiyat</p>
            <p className="text-lg font-bold text-gray-900">{ticket.total_price} TL</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Alım Tarihi</p>
            <p className="text-lg font-bold text-gray-900">
              {new Date(ticket.created_at).toLocaleDateString('tr-TR')}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-green-50 flex justify-end gap-2 ticket-buttons">
        <button
          onClick={handleDownloadPdf}
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
        >
          PDF İndir
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
        >
          İptal Et
        </button>
      </div>
    </div>
  );
}