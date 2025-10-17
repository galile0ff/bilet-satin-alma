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
  const [searchData, setSearchData] = useState({
    from: '',
    to: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/trips');
  };

  return (

    <section className="py-12">
      <div className="container-minimal">
        <div className="max-w-4xl mx-auto">
          <Card className="p-4 md:p-5 animate-morph-in">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-stretch gap-3">
              <div className="flex-1">
                <label className="sr-only">
                  Nereden (opsiyonel)
                </label>
                <select
                  value={searchData.from}
                  onChange={(e) => setSearchData(prev => ({ ...prev, from: e.target.value }))}
                  className="w-full h-11 px-4 bg-white/50 border border-morphism-border rounded-xl text-brand-neutral focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all duration-300"
                >
                  <option value="">Nereden</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="sr-only">
                  Nereye (opsiyonel)
                </label>
                <select
                  value={searchData.to}
                  onChange={(e) => setSearchData(prev => ({ ...prev, to: e.target.value }))}
                  className="w-full h-11 px-4 bg-white/50 border border-morphism-border rounded-xl text-brand-neutral focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all duration-300"
                >
                  <option value="">Nereye</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="w-full md:w-auto">
                <Button type="submit" variant="primary" size="md" className="w-full md:w-auto h-11 px-6">
                  Seferleri Göster
                </Button>   
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}