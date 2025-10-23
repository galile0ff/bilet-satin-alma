"use client";
import React from 'react';
import AdminDashboard from '@/components/admin/AdminDashboard';

const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto p-10 bg-white shadow-2xl shadow-red-200/50 rounded-2xl max-w-7xl transform transition duration-500 hover:shadow-3xl">
        <header className="mb-10 border-b-4 border-blue-500/10 pb-6">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">
            <span className="text-green-500">Admin</span> Kontrol Paneli
          </h1>
          <p className="text-base text-gray-500 mt-2 font-light">Krallığın kayıt defterleri ve büyülü taşlar üzerindeki tüm verileri buradan gözet. Orta Dünya'nın ana seyahat işlerini — ticaret loncaları, sefer indirimleri ve yolcu listelerini — buradan yönet, galileoff.’un kâtibi. </p>
        </header>
        <AdminDashboard />
      </div>
    </div>
  );
};

export default AdminPage;