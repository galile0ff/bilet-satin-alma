'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function SearchSection() {
  const [cities, setCities] = useState<string[]>([]);
  const router = useRouter();
  const [searchData, setSearchData] = useState({
    from: '',
    to: ''
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/cities');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };

    fetchCities();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const { from, to } = searchData;
    const query = new URLSearchParams();
    if (from) {
      query.append('from', from);
    }
    if (to) {
      query.append('to', to);
    }
    router.push(`/trips?${query.toString()}`);
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
