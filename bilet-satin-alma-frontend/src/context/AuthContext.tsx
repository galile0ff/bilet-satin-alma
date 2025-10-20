'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import NotificationModal from '@/components/ui/NotificationModal';

interface Notification {
  id: string;
  message: string;
}

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  balance: number;
  company_id?: string;
  company_name?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        if (parsedUser.role === 'user') {
          fetchNotifications(parsedUser.id);
        }
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (notifications.length > 0 && !currentNotification) {
      setCurrentNotification(notifications[0]);
    }
  }, [notifications, currentNotification]);

  const fetchNotifications = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/user/notifications`, {
        headers: {
          'Authorization': `Bearer ${userId}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  const handleCloseNotification = async () => {
    if (currentNotification) {
      try {
        await fetch(`http://localhost:8000/api/notifications/${currentNotification.id}/read`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${user?.id}`
          }
        });
        const remainingNotifications = notifications.slice(1);
        setNotifications(remainingNotifications);
        setCurrentNotification(null);
      } catch (error) {
        console.error("Failed to mark notification as read", error);
      }
    }
  };

  const login = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    if (userData.role === 'user') {
      fetchNotifications(userData.id);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setNotifications([]);
    setCurrentNotification(null);
  };

  const updateUser = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, updateUser, loading }}>
      {children}
      {currentNotification && (
        <NotificationModal
          message={currentNotification.message}
          type="error"
          onClose={handleCloseNotification}
        />
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
