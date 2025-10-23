'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getMyTickets, updateUser, updateBalance } from '@/services/busService';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TicketCard from '@/components/tickets/TicketCard';
import { Ticket } from '@/types/BusTrip';

export default function MyAccountPage() {
  const { user, loading, logout, updateUser: updateUserContext } = useAuth();
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [isAddingBalance, setIsAddingBalance] = useState(false);
  // Bakiye girişi için string tutmak, sıfırla başlama sorununu çözer
  const [balanceToAdd, setBalanceToAdd] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user?.role === 'company') {
      router.push('/company');
    } else if (user?.role === 'admin') {
      router.push('/admin');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name);
      fetchTickets();
    }
  }, [user]);

  const fetchTickets = async () => {
    try {
      const userTickets = await getMyTickets();
      setTickets(userTickets);
    } catch (error) {
      console.error('Biletlerini fetch edemedik:', error);
    }
  };

  const handleUpdateName = async () => {
    if (!fullName.trim()) {
      alert('Adınız boş olamaz!');
      return;
    }
    try {
      await updateUser({ full_name: fullName });
      if (user) {
        updateUserContext({ ...user, full_name: fullName });
      }
      setIsEditing(false);
    } catch (error: any) {
      alert(`Adını güncellerken bir hata oluştu: ${error.message}`);
    }
  };

  const handleTicketDeleted = (ticketId: string, updatedUser: any) => {
    updateUserContext(updatedUser);
    setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== ticketId));
  };
  
  // Bakiye kutucuğu sorununu çözen fonksiyon
  const handleBalanceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Sadece rakam veya boş string olmasına izin ver (böylece 0 ile başlama sorunu kalmaz)
    if (value === '' || /^[0-9]+$/.test(value)) {
      setBalanceToAdd(value);
    }
  };

  const handleAddBalance = async () => {
    // Sayıyı integer'a çevir, boşsa veya geçerli sayı değilse 0 kullan
    const amount = parseInt(balanceToAdd, 10) || 0; 
    
    if (amount <= 0) {
      alert('Lütfen geçerli bir bakiye miktarı girin.');
      return;
    }

    try {
      const response = await updateBalance(amount);
      updateUserContext(response.user);
      setIsAddingBalance(false);
      setBalanceToAdd(''); // Kutucuğu temizle
    } catch (error: any) {
      alert(`Bakiyeni güncellerken bir hata oluştu: ${error.message}`);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-primary font-serif">
        Orta Dünya'nın Kapıları Açılıyor...
      </div>
    );
  }

  return (
    <div className="container-minimal section-spacing pt-12">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        <span className="text-primary">Gezgin</span> Hesabım 🧭
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* === GEZGİN BİLGİLERİ KARTI === */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-fit">
          <h2 className="text-2xl font-bold mb-5 text-primary">Hesap Bilgileri</h2>
          
          <div className="space-y-5">
            
            {/* Ad Soyad Bölümü */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <strong className="text-sm text-gray-500">Ad Soyad</strong>
                <Button 
                  onClick={() => setIsEditing(!isEditing)} 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary hover:bg-primary/10 transition-colors"
                >
                  {isEditing ? 'İptal' : 'Düzenle'}
                </Button>
              </div>
              
              {isEditing ? (
                <div className="mt-2">
                  <Input
                    type="text"
                    placeholder="Yeni Ad Soyadınız"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mb-2"
                  />
                  <Button onClick={handleUpdateName} className="w-full">
                    Kaydet
                  </Button>
                </div>
              ) : (
                <p className="text-lg font-semibold text-gray-800">{fullName}</p>
              )}
            </div>

            {/* Email Bölümü */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <strong className="text-sm text-gray-500 block mb-1">Email Adresi</strong>
              <p className="text-lg font-semibold text-gray-800">{user.email}</p>
            </div>
            
            {/* Bakiye Bölümü */}
            <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="flex justify-between items-center">
                <strong className="text-sm text-gray-500">Mevcut Bakiye 💰</strong>
                <Button 
                  onClick={() => setIsAddingBalance(!isAddingBalance)} 
                  variant="ghost" 
                  size="sm" 
                  className="text-green-600 hover:bg-green-100 transition-colors font-bold"
                >
                  {isAddingBalance ? 'Kapat' : '+ Bakiye Ekle'}
                </Button>
              </div>
              <p className="text-3xl font-extrabold text-green-700 mt-1">{user.balance} <span className="text-xl font-semibold">TL</span></p>
            </div>

            {/* Bakiye Ekleme Formu */}
            {isAddingBalance && (
              <div className="p-3 border border-dashed border-gray-300 rounded-lg">
                <Input
                  label="Eklenecek Miktar (TL)"
                  type="number"
                  placeholder="Minimum 1 TL"
                  value={balanceToAdd}
                  onChange={handleBalanceInputChange}
                />
                <Button onClick={handleAddBalance} className="w-full bg-green-500 hover:bg-green-600">
                  Bakiyeyi Onayla
                </Button>
              </div>
            )}
            
            {/* Çıkış Yap Düğmesi */}
            <Button onClick={logout} variant="secondary" className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white">
              Çıkış Yap
            </Button>
            
          </div>
        </div>

        {/* === BİLETLER KARTI === */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-5 text-primary">Gelecek Yolculukların 🎫</h2>
          
          <div className="space-y-4">
            {tickets.length > 0 ? (
              tickets.map(ticket => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onTicketDeleted={handleTicketDeleted}
                />
              ))
            ) : (
              <div className="p-6 text-center bg-yellow-50 rounded-lg border-2 border-dashed border-yellow-300">
                <p className="text-xl font-medium text-gray-700 mb-2">Henüz hiçbir yolculuğa çıkmadın gezgin.</p>
                <p className="text-gray-500">Bir bilet al ve Orta Dünya yollarında maceraya atıl!</p>
                <Button onClick={() => router.push('/')} className="mt-4">Hemen Bilet Ara</Button> 
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
