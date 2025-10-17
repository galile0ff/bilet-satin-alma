import { BusTrip } from '../types/BusTrip';

const API_URL = 'http://localhost:8000/api'; // Assuming backend runs on port 8000

export const getTrips = async (): Promise<BusTrip[]> => {
  const response = await fetch(`${API_URL}/trips`);
  if (!response.ok) {
    throw new Error('Failed to fetch trips');
  }
  return response.json();
};

export const register = async (userData: any) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to register');
  }
  return response.json();
};

export const login = async (credentials: any) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to login');
  }
  return response.json();
};

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.id || ''}`
  };
};

export const getMyTickets = async () => {
  const response = await fetch(`${API_URL}/user/tickets`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user tickets');
  }
  return response.json();
};

export const updateUser = async (userData: { full_name: string }) => {
  const response = await fetch(`${API_URL}/user/update`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update user');
  }
  return response.json();
};

export const updateBalance = async (amount: number) => {
  const response = await fetch(`${API_URL}/user/balance`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ amount }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update balance');
  }
  return response.json();
};

export const purchaseTicket = async (tripId: string, seatNumber: number) => {
  const response = await fetch(`${API_URL}/tickets`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ trip_id: tripId, seat_number: seatNumber }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to purchase ticket');
  }
  return response.json();
};

export const cancelTicket = async (ticketId: string) => {
  const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to cancel ticket');
  }
  return response.json();
};

export const deleteTicket = async (ticketId: string) => {
  const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete ticket');
  }
  return response.json();
};
