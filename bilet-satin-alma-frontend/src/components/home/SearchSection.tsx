'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const cities = [
  "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya",
  "Adana", "Konya", "Gaziantep", "Şanlıurfa", "Mersin"
];

export default function SearchSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'search' | 'query'>('search');
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: ''
  });
  const [prnCode, setPrnCode] = useState('');
  const [ticketDetails, setTicketDetails] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchData.from && searchData.to && searchData.date) {
      const params = new URLSearchParams({
        from: searchData.from,
        to: searchData.to,
        date: searchData.date
      });
      router.push(`/trips?${params.toString()}`);
    }
  };

  const handleTicketQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (prnCode.trim()) {
      // Mock ticket data
      const mockTicket = {
        prn: prnCode,
        passengerName: 'Frodo Baggins',
        from: 'Hobbiton',
        to: 'Mordor',
        date: '2024-12-25',
        time: '14:30',
        seat: 'A12',
        busCompany: 'Mordor Express',
        status: 'Onaylandı'
      };
      setTicketDetails(mockTicket);
    }
  };

  return (
    <section className="section-spacing bg-morphism-surface">
      <div className="container-minimal">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 animate-morph-in">
            {/* Tab Buttons */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('search')}
                  className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                    activeTab === 'search'
                      ? 'bg-[var(--primary)] text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Sefer Ara
                </button>
                <button
                  onClick={() => setActiveTab('query')}
                  className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                    activeTab === 'query'
                      ? 'bg-[var(--primary)] text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Bilet Sorgula
                </button>
              </div>
            </div>

            {activeTab === 'search' ? (
              <>
                <h2 className="text-section text-center mb-8">Sefer Ara</h2>
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-brand-neutral mb-2">
                        Nereden
                      </label>
                      <select
                        value={searchData.from}
                        onChange={(e) => setSearchData(prev => ({ ...prev, from: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/50 border border-morphism-border rounded-xl text-brand-neutral focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all duration-300"
                        required
                      >
                        <option value="">Şehir seçin</option>
                        {cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-neutral mb-2">
                        Nereye
                      </label>
                      <select
                        value={searchData.to}
                        onChange={(e) => setSearchData(prev => ({ ...prev, to: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/50 border border-morphism-border rounded-xl text-brand-neutral focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all duration-300"
                        required
                      >
                        <option value="">Şehir seçin</option>
                        {cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-neutral mb-2">
                        Tarih
                      </label>
                      <input
                        type="date"
                        value={searchData.date}
                        onChange={(e) => setSearchData(prev => ({ ...prev, date: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 bg-white/50 border border-morphism-border rounded-xl text-brand-neutral focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <Button type="submit" variant="primary" size="lg">
                      Seferleri Göster
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-section text-center mb-8">Bilet Sorgula</h2>
                <form onSubmit={handleTicketQuery} className="space-y-6">
                  <div className="max-w-md mx-auto">
                    <label className="block text-sm font-medium text-brand-neutral mb-2">
                      PRN Kodu
                    </label>
                    <input
                      type="text"
                      value={prnCode}
                      onChange={(e) => setPrnCode(e.target.value)}
                      placeholder="PRN kodunuzu girin"
                      className="w-full px-4 py-3 bg-white/50 border border-morphism-border rounded-xl text-brand-neutral focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="text-center">
                    <Button type="submit" variant="primary" size="lg">
                      Sorgula
                    </Button>
                  </div>
                </form>

                {ticketDetails && (
                  <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800 mb-4">Bilet Bilgileri</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">PRN Kodu:</span>
                        <span className="ml-2 text-gray-900">{ticketDetails.prn}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Yolcu Adı:</span>
                        <span className="ml-2 text-gray-900">{ticketDetails.passengerName}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Güzergah:</span>
                        <span className="ml-2 text-gray-900">{ticketDetails.from} → {ticketDetails.to}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Tarih & Saat:</span>
                        <span className="ml-2 text-gray-900">{ticketDetails.date} {ticketDetails.time}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Koltuk:</span>
                        <span className="ml-2 text-gray-900">{ticketDetails.seat}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Firma:</span>
                        <span className="ml-2 text-gray-900">{ticketDetails.busCompany}</span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="font-medium text-gray-700">Durum:</span>
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {ticketDetails.status}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
