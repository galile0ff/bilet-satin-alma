import { useRef } from 'react';
import { Ticket } from '@/types/BusTrip';
import { deleteTicket } from '@/services/busService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface TicketCardProps {
  ticket: Ticket;
  onTicketDeleted: (ticketId: string) => void;
}

export default function TicketCard({ ticket, onTicketDeleted }: TicketCardProps) {
  const ticketRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const ticketElement = ticketRef.current;
    if (ticketElement) {
      // Butonları gizle
      const buttons = ticketElement.querySelector('.ticket-buttons') as HTMLElement;
      if (buttons) buttons.style.display = 'none';

      const canvas = await html2canvas(ticketElement, {
        scale: 2, // Daha yüksek çözünürlük için
        backgroundColor: null, // Arka planı şeffaf yap
      });

      // Butonları geri göster
      if (buttons) buttons.style.display = 'flex';

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'pt', 'a5'); // Yatay A5 formatı
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
        await deleteTicket(ticket.id);
        onTicketDeleted(ticket.id);
      } catch (error) {
        console.error('Bilet silinirken hata:', error);
        alert('Bilet silinirken bir hata oluştu.');
      }
    }
  };

  return (
    <div ref={ticketRef} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">{ticket.company_name}</h3>
          <div className="text-right">
            <p className="text-sm opacity-80">Yolculuk Tarihi</p>
            <p className="font-semibold text-lg">{new Date(ticket.departure_time).toLocaleDateString('tr-TR')}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Kalkış</p>
            <p className="text-2xl font-bold text-gray-800">{ticket.departure_city}</p>
            <p className="text-lg text-gray-600">{new Date(ticket.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Varış</p>
            <p className="text-2xl font-bold text-gray-800">{ticket.destination_city}</p>
            <p className="text-lg text-gray-600">{new Date(ticket.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-dashed">
          <div className="flex justify-between items-center text-center">
            <div>
              <p className="text-sm text-gray-500">Koltuk No</p>
              <p className="text-xl font-bold text-indigo-600">{ticket.seat_number}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fiyat</p>
              <p className="text-xl font-bold text-indigo-600">{ticket.total_price} TL</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Bilet Tarihi</p>
              <p className="text-xl font-bold text-indigo-600">{new Date(ticket.created_at).toLocaleDateString('tr-TR')}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-50 flex justify-end space-x-3 ticket-buttons">
        <button
          onClick={handleDownloadPdf}
          className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors"
        >
          PDF İndir
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
        >
          Bileti Sil
        </button>
      </div>
    </div>
  );
}
