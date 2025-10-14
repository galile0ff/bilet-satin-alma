'use client';

import { useEffect, useState } from 'react';
import { getMyTickets } from '@/services/busService';
import { Ticket } from '@/types/BusTrip';

export default function MyTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'date' | 'price'>('date');

  useEffect(() => {
    const loadTickets = async () => {
      try {
        console.log('Biletler yükleniyor...');
        const data = await getMyTickets();
        console.log('Yüklenen biletler:', data);
        if (!data) {
          throw new Error('Bilet verisi boş geldi');
        }
        setTickets(data);
      } catch (error) {
        console.error('Biletler yüklenirken hata:', error);
        // Kullanıcıya hata mesajı göster
        alert('Biletler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.');
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, []);

  const filteredAndSortedTickets = [...tickets]
    .filter(ticket => 
      ticket.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.busCompany.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.departureDate).getTime() - new Date(a.departureDate).getTime();
      }
      return b.price - a.price;
    });

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Biletlerim</h1>
          <p className="text-gray-600 dark:text-gray-400">Satın aldığınız tüm otobüs biletleri</p>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Şehir veya firma ara..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full sm:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'price')}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="date">Tarihe Göre</option>
              <option value="price">Fiyata Göre</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Biletler yükleniyor...</p>
          </div>
        ) : filteredAndSortedTickets.length === 0 ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4">
            <p className="text-yellow-700 dark:text-yellow-500">Hiç biletiniz bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredAndSortedTickets.map(ticket => (
              <div
                key={ticket.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-2">
                    <div className="flex items-center space-x-3 mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {ticket.busCompany}
                      </h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                        {ticket.seatNumber} Numaralı Koltuk
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{ticket.departureTime}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{ticket.from}</p>
                      </div>
                      
                      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute -top-2 left-1/2 transform -translate-x-1/2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{ticket.arrivalTime}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{ticket.to}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:text-center">
                    <div className="mb-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Yolculuk Tarihi</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{ticket.departureDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Satın Alma Tarihi</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{ticket.purchaseDate}</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div className="text-right mb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Bilet Tutarı</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{ticket.price} TL</p>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button
                        className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                        onClick={() => window.print()}
                      >
                        PDF İndir
                      </button>
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
                        onClick={() => alert('Bilet detayları görüntülenecek')}
                      >
                        Bileti Görüntüle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
