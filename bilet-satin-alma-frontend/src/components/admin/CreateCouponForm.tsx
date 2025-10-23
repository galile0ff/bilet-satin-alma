"use client";
import { useAuth } from '@/context/AuthContext';
import React, { useState, useEffect } from 'react';

interface Company {
  id: string;
  name: string;
}

const CreateCouponForm: React.FC = () => {
  const [code, setCode] = useState('');
  const [discountRate, setDiscountRate] = useState('');
  const [usageLimit, setUsageLimit] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/admin/companies', {
          headers: {
            'Authorization': `Bearer ${user?.id}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCompanies(data);
        } else {
          console.error('Failed to fetch companies');
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    if (user?.role === 'admin') {
      fetchCompanies();
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);

    try {
      const response = await fetch('http://localhost:8000/api/admin/coupons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id}`
        },
        body: JSON.stringify({
          code,
          discount_rate: discountRate,
          usage_limit: usageLimit,
          expiry_date: expiryDate,
          company_id: companyId,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Harikulade, kupon başarıyla oluşturuldu. 🎉');
        setIsSuccess(true);
        setCode('');
        setDiscountRate('');
        setUsageLimit('');
        setExpiryDate('');
        setCompanyId('');
      } else {
        setMessage(data.message || 'Kupon oluşturulurken bir hata oluştu.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error creating coupon:', error);
      setMessage('Bağlantı hatası veya sunucuya ulaşılamıyor.');
      setIsSuccess(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value.toUpperCase());
  };

  const messageClass = isSuccess 
    ? "bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded-md"
    : "bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md";

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Yeni Kupon Oluştur</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div>
            <label htmlFor="companyId" className="block text-sm font-medium text-gray-700 mb-1">Firma</label>
            <select
              id="companyId"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className="block w-full px-4 py-2 border border-black rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150"
              required
            >
              <option value="">Firma Seçin</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">Kupon Kodu</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={handleCodeChange}
              className="block w-full px-4 py-2 border border-black rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 uppercase"
              required
            />
          </div>
          
          <div>
            <label htmlFor="discountRate" className="block text-sm font-medium text-gray-700 mb-1">İndirim Oranı (%)</label>
            <input
              type="number"
              id="discountRate"
              value={discountRate}
              onChange={(e) => setDiscountRate(e.target.value)}
              min="1"
              max="100"
              placeholder="% 0-100"
              className="block w-full px-4 py-2 border border-black rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150"
              required
            />
          </div>
          
          <div>
            <label htmlFor="usageLimit" className="block text-sm font-medium text-gray-700 mb-1">Kullanım Limiti</label>
            <input
              type="number"
              id="usageLimit"
              value={usageLimit}
              onChange={(e) => setUsageLimit(e.target.value)}
              min="1"
              placeholder="Kişi Sayısı"
              className="block w-full px-4 py-2 border border-black rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150"
              required
            />
          </div>
          
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Geçerlilik Tarihi</label>
            <input
              type="date"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="block w-full px-4 py-2 border border-black rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150"
              required
            />
          </div>
        </div>
        
        {/* Mesaj Alanı ve Buton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4">
            
            {message ? (
                <div className={`sm:w-2/3 mb-4 sm:mb-0 ${messageClass}`}>
                    <p className="font-medium text-sm">{message}</p>
                </div>
            ) : (
                <div className="sm:w-2/3 mb-4 sm:mb-0"></div>
            )}

            <button
                type="submit"
                className="w-full sm:w-auto inline-flex justify-center py-2 px-6 border border-transparent shadow-md text-base font-medium rounded-lg text-white bg-black hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out transform hover:scale-[1.01]"
            >
                Kuponu Oluştur
            </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCouponForm;
