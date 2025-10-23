"use client";
import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  company_id?: string;
}

const EditUserModal: React.FC<{
  user: User;
  onClose: () => void;
  onUpdate: (id: string, email: string, password?: string) => void;
}> = ({ user, onClose, onUpdate }) => {
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(user.id, email, password || undefined);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Kullanıcıyı Düzenle</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Yeni Parola (isteğe bağlı)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">İptal</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Kaydet</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    if (user?.role !== 'admin') {
      setError("Yetkisiz Erişim: Bu içeriği görüntülemek için yönetici olmalısınız. - Burası Mordor!");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${user?.id}`
        }
      });

      if (!response.ok) {
        throw new Error(`Veri çekme hatası: ${response.statusText}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('Kullanıcıları çekerken hata:', err);
      setError("Kullanıcı verileri yüklenirken bir sorun oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
    } else if (user) {
      setLoading(false);
    }
  }, [user]);

  const handleDelete = async (userId: string) => {
    if (window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/admin/users/${userId}`,
         {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user?.id}`
          }
        });

        if (!response.ok) {
          throw new Error('Kullanıcı silinemedi');
        }

        setUsers(users.filter(u => u.id !== userId));
      } catch (err) {
        console.error('Kullanıcı silinirken hata:', err);
        setError('Kullanıcı silinirken bir hata oluştu.');
      }
    }
  };

  const handleUpdate = async (id: string, email: string, password?: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/users/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id}`
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Kullanıcı güncellenemedi');
      }

      await fetchUsers(); // Re-fetch users to get updated data
      setEditingUser(null);
    } catch (err: any) {
      console.error('Kullanıcı güncellenirken hata:', err);
      setError(`Kullanıcı güncellenirken bir hata oluştu: ${err.message}`);
    }
  };

  const getRoleBadge = (role: string) => {
    const baseStyle = "px-2 py-0.5 text-xs font-semibold rounded-full uppercase tracking-wider";
    switch (role.toLowerCase()) {
      case 'admin':
        return <span className={`${baseStyle} bg-red-100 text-red-800`}>Yönetici</span>;
      case 'company':
        return <span className={`${baseStyle} bg-gray-800 text-white`}>Firma</span>;
      case 'user':
      default:
        return <span className={`${baseStyle} bg-green-100 text-green-800`}>Müşteri</span>;
    }
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Kullanıcılar Listesi</h2>
      <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ad Soyad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Firma ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="transition duration-150 ease-in-out hover:bg-blue-50/50 odd:bg-white even:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.full_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.company_id || '—'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-2">
                    <button onClick={() => setEditingUser(user)} className="text-blue-500 hover:text-blue-700 transition-colors"><Pencil size={16} /></button>
                    {/* Admin rolündeki kullanıcılar için silme butonunu gösterme */}
                    {user.role !== 'admin' && (
                      <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700 transition-colors"><Trash2 size={16} /></button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500 text-sm italic">
                  Henüz kayıtlı kullanıcı bulunmamaktadır.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {editingUser && (
        <EditUserModal 
          user={editingUser} 
          onClose={() => setEditingUser(null)} 
          onUpdate={handleUpdate} 
        />
      )}
    </div>
  );
};

export default UserList;