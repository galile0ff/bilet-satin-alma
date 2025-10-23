"use client";
import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react';

interface Company {
  id: string;
  name: string;
}

const CreateCompanyUserForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/admin/companies', {
          headers: {
            'Authorization': `Bearer ${user?.id}`
          }
        });
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
        setMessage('Firma listesi yüklenirken hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'admin') {
      fetchCompanies();
    } else if (user) {
        setLoading(false);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);

    try {
      const response = await fetch('http://localhost:8000/api/admin/company-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id}`
        },
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
          company_id: companyId,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Harikulade, firma kullanıcısı başarıyla oluşturuldu.');
        setIsSuccess(true);
        setFullName('');
        setEmail('');
        setPassword('');
        setCompanyId('');
      } else {
        setMessage(data.message || 'Kullanıcı oluşturulurken bir hata oluştu.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error creating company user:', error);
      setMessage('Bağlantı hatası veya sunucuya ulaşılamıyor.');
      setIsSuccess(false);
    }
  };

  const messageClass = isSuccess 
    ? "bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded-md"
    : "bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md";

  if (loading) {
    return (
        <div className="text-center py-10 text-gray-500">
          <svg className="animate-spin h-5 w-5 mr-3 inline text-blue-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Firma listesi yükleniyor...
        </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Firma Kullanıcısı Oluştur</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Yetkili Ad Soyad</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Adı Soyadı"
              className="block w-full px-4 py-2 border border-black rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@firma.com"
              className="block w-full px-4 py-2 border border-black rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150"
              required
            />
          </div>

          {/* Şifre */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="(づ￣ 3￣)づ"
              className="block w-full px-4 py-2 border border-black rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150"
              required
            />
          </div>

          <div>
            <label htmlFor="companyId" className="block text-sm font-medium text-gray-700 mb-1">Firma</label>
            <select
              id="companyId"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className="block w-full px-4 py-2 border border-black rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 bg-white appearance-none pr-8"
              required
            >
              <option value="" disabled>Firma Seçin</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
            {companies.length === 0 && !loading && (
                <p className="text-xs text-red-500 mt-1">Lütfen önce bir firma oluşturun.</p>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4">
            
            {message ? (
                <div className={`sm:w-2/3 mb-4 sm:mb-0 ${messageClass}`}>
                    <p className="font-medium text-sm">{message}</p>
                </div>
            ) : (
                <div className="sm:w-2/3"></div> 
            )}

            <button
                type="submit"
                className="w-full sm:w-auto inline-flex justify-center py-2 px-6 border border-transparent shadow-md text-base font-medium rounded-lg text-white bg-black hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out transform hover:scale-[1.01] disabled:opacity-50"
                disabled={loading || companies.length === 0}
            >
                Kullanıcıyı Oluştur
            </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCompanyUserForm;