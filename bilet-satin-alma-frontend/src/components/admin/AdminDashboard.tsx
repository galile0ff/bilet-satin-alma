"use client";
import React from 'react';
import UserList from './UserList';
import CreateCouponForm from './CreateCouponForm';
import CouponList from './CouponList';
import CreateCompanyUserForm from './CreateCompanyUserForm';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('users');
  const [couponUpdateKey, setCouponUpdateKey] = React.useState(0);

  const handleCouponCreated = () => {
    // Bu fonksiyon, kupon listesini yenilemek için state'i günceller.
    setCouponUpdateKey(prevKey => prevKey + 1);
  };

  const tabClass = (tabName: string) => {
    const baseStyle = "py-3 px-5 text-base font-medium transition duration-200 ease-in-out cursor-pointer focus:outline-none whitespace-nowrap";
    
    if (activeTab === tabName) {
      return `${baseStyle} text-green-600 border-b-2 border-green-600 font-semibold`;
    } else {
      return `${baseStyle} text-gray-500 border-b-2 border-transparent hover:text-green-700`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex border-b border-green-200 overflow-x-auto">
        <button
          className={tabClass('users')}
          onClick={() => setActiveTab('users')}
        >
          Kullanıcılar
        </button>
        <button
          className={tabClass('coupons')}
          onClick={() => setActiveTab('coupons')}
        >
          Kupon Yönetimi
        </button>
        <button
          className={tabClass('company-users')}
          onClick={() => setActiveTab('company-users')}
        >
          Firma Kullanıcısı Oluştur
        </button>
        
      </div>

      <div className="pt-2">
        {activeTab === 'users' && <UserList />}
        {activeTab === 'coupons' && (
          <div className="space-y-8">
            <CreateCouponForm onCouponCreated={handleCouponCreated} />
            <CouponList refreshKey={couponUpdateKey} />
          </div>
        )}
        {activeTab === 'company-users' && <CreateCompanyUserForm />}
      </div>
    </div>
  );
};

export default AdminDashboard;