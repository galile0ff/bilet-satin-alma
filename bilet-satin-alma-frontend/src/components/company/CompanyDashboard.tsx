'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { PlusCircle, Edit, Trash2, Eye, User, Ticket, X, CheckCircle } from 'lucide-react';

interface Coupon {
  id: string;
  code: string;
  discount_rate: number;
  usage_limit: number;
  usage_count: number;
  expiry_date: string;
}

interface Trip {
  id: string;
  departure_city: string;
  destination_city: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  capacity: number;
}

interface Passenger {
  ticket_id: string;
  full_name: string;
  seat_number: number;
}

interface CouponUsage {
  full_name: string;
  used_at: string;
}

const CompanyDashboard = () => {
  const { user, updateUser } = useAuth();
  const [companyName, setCompanyName] = useState('');
  const [companyRepresentative, setCompanyRepresentative] = useState('');
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [viewingCouponUsage, setViewingCouponUsage] = useState<Coupon | null>(null);
  const [couponUsage, setCouponUsage] = useState<CouponUsage[]>([]);
  const [newCoupon, setNewCoupon] = useState({ code: '', discount_rate: '', usage_limit: '', expiry_date: '' });
  const [newTrip, setNewTrip] = useState({ 
    departure_city: '', 
    destination_city: '', 
    departure_date: '', 
    departure_hour: '', 
    arrival_date: '', 
    arrival_hour: '', 
    price: '', 
    capacity: '' });

  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });
  useEffect(() => {
    if (user) {
      setCompanyName(user.company_name || '');
      setCompanyRepresentative(user.full_name || '');
      fetchCoupons();
      fetchTrips();
    }
  }, [user]);

  const handleUpdateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/company/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id}`,
        },
        body: JSON.stringify({ name: companyName, representative: companyRepresentative }),
      });
      if (response.ok) {
        if(user) {
          updateUser({ ...user, company_name: companyName, full_name: companyRepresentative });
        }
        alert('Firma bilgileri güncellendi.');
      }
    } catch (error) {
      console.error('Failed to update company name', error);
    }
  };

  const fetchCoupons = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/company/coupons', {
        headers: {
          'Authorization': `Bearer ${user?.id}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCoupons(data);
      }
    } catch (error) {
      console.error('Failed to fetch coupons', error);
    }
  };

  const fetchTrips = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/company/trips', {
        headers: {
          'Authorization': `Bearer ${user?.id}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTrips(data);
      }
    } catch (error) {
      console.error('Failed to fetch trips', error);
    }
  };

  const fetchPassengers = async (tripId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/trips/${tripId}/passengers`, {
        headers: {
          'Authorization': `Bearer ${user?.id}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPassengers(data);
        setSelectedTrip(tripId);
      }
    } catch (error) {
      console.error('Failed to fetch passengers', error);
    }
  };

  const handleCancelTicket = async (ticketId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/company/tickets/${ticketId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user?.id}`,
        },
      });
      if (response.ok) {
        if (selectedTrip) {
          fetchPassengers(selectedTrip);
        }
        alert('Bilet iptal edildi.');
      }
    } catch (error) {
      console.error('Failed to cancel ticket', error);
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/company/coupons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id}`,
        },
        body: JSON.stringify(newCoupon),
      });
      if (response.ok) {
        fetchCoupons();
        setNewCoupon({ code: '', discount_rate: '', usage_limit: '', expiry_date: '' });
      }
    } catch (error) {
      console.error('Failed to create coupon', error);
    }
  };

  const handleUpdateCoupon = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCoupon) return;

    const formData = new FormData(e.currentTarget);
    const updatedCoupon = {
      code: formData.get('code'),
      discount_rate: formData.get('discount_rate'),
      usage_limit: formData.get('usage_limit'),
      expiry_date: formData.get('expiry_date'),
    };

    try {
      const response = await fetch(`http://localhost:8000/api/company/coupons/${editingCoupon.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id}`,
        },
        body: JSON.stringify(updatedCoupon),
      });

      if (response.ok) {
        fetchCoupons();
        setEditingCoupon(null);
      }
    } catch (error) {
      console.error('Failed to update coupon', error);
    }
  };

  const handleDeleteCoupon = async (couponId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/company/coupons/${couponId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user?.id}`,
        },
      });
      if (response.ok) {
        fetchCoupons();
      }
    } catch (error) {
      console.error('Failed to delete coupon', error);
    }
  };

  const handleCreateTrip = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { departure_city, destination_city } = newTrip;

    if (departure_city.toUpperCase() === destination_city.toUpperCase()) {
      alert('Kalkış ve varış noktası aynı olamaz.');
      return;
    }

    const departure_time = `${newTrip.departure_date}T${newTrip.departure_hour}`;
    const arrival_time = `${newTrip.arrival_date}T${newTrip.arrival_hour}`;

    const tripData = {
      ...newTrip,
      departure_time,
      arrival_time,
    };
    try {
      const response = await fetch('http://localhost:8000/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id}`,
        },
        body: JSON.stringify(tripData),
      });
      if (response.ok) {
        fetchTrips();
        setNewTrip({ 
          departure_city: '', 
          destination_city: '', 
          departure_date: '', 
          departure_hour: '', 
          arrival_date: '', 
          arrival_hour: '', 
          price: '', 
          capacity: '' });
      } else {
        const errorData = await response.json();
        alert(`Sefer oluşturulamadı: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Failed to create trip', error);
      alert('Sefer oluşturulurken beklenmedik bir hata oluştu.');
    }
  };

  const handleDeleteTrip = async (tripId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/trips/${tripId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user?.id}`,
        },
      });
      if (response.ok) {
        fetchTrips();
      }
    } catch (error) {
      console.error('Failed to delete trip', error);
    }
  };

  const handleUpdateTrip = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingTrip) return;

    const formData = new FormData(e.currentTarget);
    const departure_city = formData.get('departure_city') as string;
    const destination_city = formData.get('destination_city') as string;

    if (departure_city.toUpperCase() === destination_city.toUpperCase()) {
      alert('Kalkış ve varış noktası aynı olamaz.');
      return;
    }

    const departure_date = formData.get('departure_date') as string;
    const departure_hour = formData.get('departure_hour') as string;
    const arrival_date = formData.get('arrival_date') as string;
    const arrival_hour = formData.get('arrival_hour') as string;

    const updatedTrip = {
      departure_city: departure_city,
      destination_city: destination_city,
      departure_time: `${departure_date}T${departure_hour}:00`,
      arrival_time: `${arrival_date}T${arrival_hour}:00`,
      price: formData.get('price'),
      capacity: formData.get('capacity'),
    };

    try {
      const response = await fetch(`http://localhost:8000/api/trips/${editingTrip.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id}`,
        },
        body: JSON.stringify(updatedTrip),
      });

      if (response.ok) {
        fetchTrips();
        setEditingTrip(null);
      }
    } catch (error) {
      console.error('Failed to update trip', error);
    }
  };

  const handleViewCouponUsage = async (coupon: Coupon) => {
    try {
      const response = await fetch(`http://localhost:8000/api/company/coupons/${coupon.id}/usage`, {
        headers: {
          'Authorization': `Bearer ${user?.id}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCouponUsage(data);
        setViewingCouponUsage(coupon);
      }
    } catch (error) {
      console.error('Failed to fetch coupon usage', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="morphism-card p-6">
        <h2 className="text-2xl font-bold">Firma Bilgileri</h2>
        <form onSubmit={handleUpdateCompany} className="mt-4 space-y-4">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Firma Adı
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="input-minimal"
            />
          </div>
          <div>
            <label htmlFor="companyRepresentative" className="block text-sm font-medium text-gray-700">
              Firma Yetkilisi
            </label>
            <input
              type="text"
              id="companyRepresentative"
              value={companyRepresentative}
              onChange={(e) => setCompanyRepresentative(e.target.value)}
              className="input-minimal"
            />
          </div>
          <button type="submit" className="btn-minimal flex items-center">
            <CheckCircle size={18} className="mr-2" />
            Güncelle
          </button>
        </form>
      </div>

      <div className="morphism-card p-6">
        <h2 className="text-2xl font-bold">Kuponlar</h2>
        <p className="text-sm text-gray-500">Aynı isimden sadece 1 adet kupon oluşturulabilir</p>
        <div className="mt-4">
          <form onSubmit={handleCreateCoupon} className="space-y-4 p-4 border rounded-md bg-white/20">
            <h3 className="font-bold">Yeni Kupon Oluştur</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="code"
                placeholder="Kod"
                className="input-minimal"
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
              />
              <input 
                name="discount_rate" 
                placeholder="İndirim Oranı (%)" 
                type="number" 
                min="1" 
                max="100" 
                className="input-minimal" 
                value={newCoupon.discount_rate}
                onChange={(e) => setNewCoupon({ ...newCoupon, discount_rate: e.target.value })}
              />
              <input 
                name="usage_limit" 
                placeholder="Kullanım Limiti" 
                type="number" 
                className="input-minimal" 
                value={newCoupon.usage_limit}
                onChange={(e) => setNewCoupon({ ...newCoupon, usage_limit: e.target.value })}
              />
              <input 
                name="expiry_date" 
                type="date" 
                min={new Date().toISOString().split('T')[0]} 
                className="input-minimal" 
                value={newCoupon.expiry_date}
                onChange={(e) => setNewCoupon({ ...newCoupon, expiry_date: e.target.value })}
              />
            </div>
            <button type="submit" className="btn-minimal flex items-center">
              <PlusCircle size={18} className="mr-2" />
              Oluştur
            </button>
          </form>
          <div className="mt-4 space-y-2">
            {coupons.map((coupon) => (
              <div key={coupon.id} className="p-4 border rounded-md flex justify-between items-center bg-white/20 transition-all duration-300 hover:shadow-lg">
                <div>
                  <p><strong>Kod:</strong> {coupon.code}</p>
                  <p><strong>İndirim:</strong> %{coupon.discount_rate}</p>
                  <p><strong>Kullanım:</strong> {coupon.usage_count} / {coupon.usage_limit}</p>
                  <p><strong>Son Kullanma:</strong> {new Date(coupon.expiry_date).toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <button onClick={() => handleViewCouponUsage(coupon)} className="btn-ghost flex items-center"><Eye size={16} className="mr-2" />Kullananları Gör</button>
                  <button onClick={() => setEditingCoupon(coupon)} className="btn-ghost flex items-center"><Edit size={16} className="mr-2" />Düzenle</button>
                  <button onClick={() => handleDeleteCoupon(coupon.id)} className="btn-ghost bg-red-500/20 text-red-500 flex items-center"><Trash2 size={16} className="mr-2" />Sil</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {viewingCouponUsage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="morphism-card p-6 w-full max-w-md animate-morph-in">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Kuponu Kullananlar</h3>
              <ul className="mt-4 space-y-2">
                {couponUsage.map((usage, index) => (
                  <li key={index} className="flex items-center">
                    <User size={16} className="mr-2" />
                    {usage.full_name} - {new Date(usage.used_at).toLocaleString()}
                  </li>
                ))}
              </ul>
              <div className="flex justify-end mt-4">
                <button onClick={() => setViewingCouponUsage(null)} className="btn-ghost flex items-center"><X size={18} className="mr-2" />Kapat</button>
              </div>
            </div>
          </div>
        )}

        {editingCoupon && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="morphism-card p-6 w-full max-w-md animate-morph-in">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Kuponu Düzenle</h3>
              <form onSubmit={handleUpdateCoupon} className="mt-4 space-y-4">
                <input name="code" defaultValue={editingCoupon.code} className="input-minimal" />
                <input name="discount_rate" defaultValue={editingCoupon.discount_rate} type="number" min="1" max="100" className="input-minimal" />
                <input name="usage_limit" defaultValue={editingCoupon.usage_limit} type="number" className="input-minimal" />
                <input name="expiry_date" defaultValue={editingCoupon.expiry_date.split('T')[0]} type="date" min={new Date().toISOString().split('T')[0]} className="input-minimal" />
                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={() => setEditingCoupon(null)} className="btn-ghost flex items-center"><X size={18} className="mr-2" />İptal</button>
                  <button type="submit" className="btn-minimal flex items-center"><CheckCircle size={18} className="mr-2" />Güncelle</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="morphism-card p-6">
        <h2 className="text-2xl font-bold">Seferler ve Yolcular</h2>
        <p className="text-sm text-gray-500">Aynı güzergaha aynı tarihte sadece bir sefer oluşturulabilir.</p>
        <div className="mt-4">
          <form onSubmit={handleCreateTrip} className="space-y-4 p-4 border rounded-md bg-white/20">
            <h3 className="font-bold">Yeni Sefer Oluştur</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                name="departure_city" 
                placeholder="Kalkış Şehri" 
                className="input-minimal" 
                value={newTrip.departure_city}
                onChange={(e) => setNewTrip({ ...newTrip, departure_city: e.target.value.toUpperCase() })}
              />
              <input 
                name="destination_city" 
                placeholder="Varış Şehri" 
                className="input-minimal" 
                value={newTrip.destination_city}
                onChange={(e) => setNewTrip({ ...newTrip, destination_city: e.target.value.toUpperCase() })}
              />
              <div className="flex gap-2">
                <input 
                  name="departure_date" 
                  type="date" 
                  min={new Date().toISOString().split('T')[0]} 
                  className="input-minimal w-2/3" 
                  value={newTrip.departure_date}
                  onChange={(e) => setNewTrip({ ...newTrip, departure_date: e.target.value })}
                  required
                />
                <select
                  name="departure_hour"
                  className="input-minimal w-1/3"
                  value={newTrip.departure_hour}
                  onChange={(e) => setNewTrip({ ...newTrip, departure_hour: e.target.value })}
                  required
                >
                  {hours.map(hour => (
                    <option key={hour} value={hour}>{hour}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <input 
                  name="arrival_date" 
                  type="date" 
                  min={newTrip.departure_date || new Date().toISOString().split('T')[0]}
                  className="input-minimal w-2/3" 
                  value={newTrip.arrival_date}
                  onChange={(e) => setNewTrip({ ...newTrip, arrival_date: e.target.value })}
                  required
                />
                <select
                  name="arrival_hour"
                  className="input-minimal w-1/3"
                  value={newTrip.arrival_hour}
                  onChange={(e) => setNewTrip({ ...newTrip, arrival_hour: e.target.value })}
                  required
                >
                  {hours.map(hour => (
                    <option key={hour} value={hour}>{hour}</option>
                  ))}
                </select>
              </div>
              <input 
                name="price" 
                placeholder="Fiyat" 
                type="number" 
                className="input-minimal" 
                value={newTrip.price}
                onChange={(e) => setNewTrip({ ...newTrip, price: e.target.value })}
              />
              <input 
                name="capacity" 
                placeholder="Kapasite" 
                type="number" 
                max="20" 
                className="input-minimal" 
                value={newTrip.capacity}
                onChange={(e) => setNewTrip({ ...newTrip, capacity: e.target.value })}
              />
            </div>
            <button type="submit" className="btn-minimal flex items-center">
              <PlusCircle size={18} className="mr-2" />
              Oluştur
            </button>
          </form>
        </div>
        <div className="mt-4 space-y-4">
          {trips.map((trip) => (
            <div key={trip.id} className="p-4 border rounded-md bg-white/20 transition-all duration-300 hover:shadow-lg">
              <h3 className="font-bold">{trip.departure_city} - {trip.destination_city}</h3>
              <p>{new Date(trip.departure_time).toLocaleString()}</p>
              <div className="flex space-x-2 mt-2">
                <button onClick={() => fetchPassengers(trip.id)} className="btn-ghost flex items-center">
                  <Eye size={16} className="mr-2" />
                  Yolcuları Görüntüle
                </button>
                <button onClick={() => setEditingTrip(trip)} className="btn-ghost flex items-center">
                  <Edit size={16} className="mr-2" />
                  Seferi Düzenle
                </button>
                <button onClick={() => handleDeleteTrip(trip.id)} className="btn-ghost bg-red-500/20 text-red-500 flex items-center">
                  <Trash2 size={16} className="mr-2" />
                  Seferi Sil
                </button>
              </div>
              {selectedTrip === trip.id && (
                <div className="mt-4 animate-morph-in">
                  <h4 className="font-bold">Yolcular</h4>
                  <ul className="mt-2 space-y-2">
                    {passengers.map((passenger) => (
                      <li key={passenger.ticket_id} className="flex justify-between items-center p-2 rounded-md bg-white/20">
                        <span className="flex items-center"><User size={16} className="mr-2" />{passenger.full_name} - Koltuk: {passenger.seat_number}</span>
                        <button
                          onClick={() => handleCancelTicket(passenger.ticket_id)}
                          className="btn-ghost bg-red-500/20 text-red-500 flex items-center"
                        >
                          <Ticket size={16} className="mr-2" />
                          Bileti İptal Et
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {editingTrip && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="morphism-card p-6 w-full max-w-md animate-morph-in">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Seferi Düzenle</h3>
              <form onSubmit={handleUpdateTrip} className="mt-4 space-y-4">
                <input name="departure_city" defaultValue={editingTrip.departure_city} className="input-minimal" onChange={(e) => (e.target.value = e.target.value.toUpperCase())} />
                <input name="destination_city" defaultValue={editingTrip.destination_city} className="input-minimal" onChange={(e) => (e.target.value = e.target.value.toUpperCase())} />
                <div className="flex gap-2">
                  <input name="departure_date" defaultValue={editingTrip.departure_time.split(' ')[0]} type="date" min={new Date().toISOString().split('T')[0]} className="input-minimal w-2/3" required />
                  <select name="departure_hour" defaultValue={editingTrip.departure_time.split(' ')[1]?.slice(0, 5) || '00:00'} className="input-minimal w-1/3" required>
                    {hours.map(hour => (
                      <option key={hour} value={hour}>{hour}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <input 
                    name="arrival_date" 
                    defaultValue={editingTrip.arrival_time.split(' ')[0]} 
                    type="date" 
                    min={editingTrip.departure_time.split(' ')[0]} 
                    className="input-minimal w-2/3" 
                    required 
                  />
                  <select name="arrival_hour" defaultValue={editingTrip.arrival_time.split(' ')[1]?.slice(0, 5) || '00:00'} className="input-minimal w-1/3" required>
                    {hours.map(hour => (
                      <option key={hour} value={hour}>{hour}</option>
                    ))}
                  </select>
                </div>
                <input name="price" defaultValue={editingTrip.price} type="number" className="input-minimal" />
                <input name="capacity" defaultValue={editingTrip.capacity} type="number" max="20" className="input-minimal" />
                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={() => setEditingTrip(null)} className="btn-ghost flex items-center"><X size={18} className="mr-2" />İptal</button>
                  <button type="submit" className="btn-minimal flex items-center"><CheckCircle size={18} className="mr-2" />Güncelle</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
