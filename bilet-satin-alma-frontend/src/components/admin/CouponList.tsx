"use client";
import { useAuth } from '@/context/AuthContext';
import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Coupon {
  id: string;
  code: string;
  discount_rate: number;
  usage_limit: number;
  expiry_date: string;
  company_name: string;
  creator: 'Admin' | 'Firma';
  usage_count: number;
}

interface CouponListProps {
  refreshKey: number;
}

const CouponList: React.FC<CouponListProps> = ({ refreshKey }) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      if (user?.role !== 'admin') {
        setError("Yetkisiz Erişim: Bu içeriği görüntülemek için yönetici olmalısınız.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:8000/api/admin/all-coupons', {
          headers: {
            'Authorization': `Bearer ${user?.id}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `Veri çekme hatası: ${response.statusText}`);
        }

        setCoupons(data);
      } catch (err: any) {
        console.error('Kuponları çekerken hata:', err);
        setError(err.message || "Kupon verileri yüklenirken bilinmeyen bir sorun oluştu.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'admin') {
      fetchCoupons();
    } else if (user) {
      setLoading(false);
    }
  }, [user, refreshKey]);

  const handleDelete = async (couponId: string) => {
    if (!window.confirm('Bu kuponu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/admin/coupons/${couponId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user?.id}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Kupon silinemedi.');
      }

      setCoupons(coupons.filter((coupon) => coupon.id !== couponId));
    } catch (err: any) {
      setError(err.message || 'Kupon silinirken bir hata oluştu.');
    }
  };
  const getCreatorBadge = (creator: string) => {
    const baseStyle = "px-2 py-0.5 text-xs font-semibold rounded-full uppercase tracking-wider";
    if (creator === 'Admin') {
      return <span className={`${baseStyle} bg-red-100 text-red-800`}>Admin</span>;
    }
    return <span className={`${baseStyle} bg-gray-800 text-white`}>Firma</span>;
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        <svg className="animate-spin h-5 w-5 mr-3 inline text-blue-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Veriler yükleniyor...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md" role="alert">
        <p className="font-bold">Hata!</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 shadow-xl rounded-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Kupon Listesi</h2>
      <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Firma Adı</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kupon Kodu</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İndirim Oranı</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kullanım</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Geçerlilik Tarihi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Oluşturan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coupons.length > 0 ? (
              coupons.map((coupon) => (
                <tr key={coupon.id} className="transition duration-150 ease-in-out hover:bg-blue-50/50 odd:bg-white even:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{coupon.company_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{coupon.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coupon.discount_rate}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coupon.usage_count} / {coupon.usage_limit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(coupon.expiry_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getCreatorBadge(coupon.creator)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button onClick={() => handleDelete(coupon.id)} className="text-red-500 hover:text-red-700 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500 text-sm italic">
                  Henüz oluşturulmuş kupon bulunmamaktadır.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponList;