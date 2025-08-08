import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [queue, setQueue] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const API_BASE = 'http://localhost:3001';

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchQueue();
      fetchDoctors();
      fetchAppointments();
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      setUser({ username });
      setIsAuthenticated(true);
      
      // Fetch initial data
      await Promise.all([
        fetchQueue(),
        fetchDoctors(),
        fetchAppointments(),
      ]);

      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setQueue([]);
    setDoctors([]);
    setAppointments([]);
    router.push('/');
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  };

  const fetchQueue = async () => {
    try {
      const response = await fetch(`${API_BASE}/queue`, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setQueue(data);
      }
    } catch (error) {
      console.error('Error fetching queue:', error);
    }
  };

  const updateQueueStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_BASE}/queue/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        await fetchQueue();
      }
    } catch (error) {
      console.error('Error updating queue:', error);
    }
  };

  const deleteFromQueue = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/queue/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        await fetchQueue();
      }
    } catch (error) {
      console.error('Error deleting from queue:', error);
    }
  };

  const addToQueue = async (patientName, priority = 'Normal') => {
    try {
      const response = await fetch(`${API_BASE}/queue`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ patientName, priority }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const newPatient = await response.json();
      await fetchQueue();
      return newPatient;
    } catch (error) {
      console.error('Error adding to queue:', error);
      throw error;
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${API_BASE}/doctors`, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`${API_BASE}/appointments`, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const scheduleAppointment = async (appointmentData) => {
    try {
      console.log('Scheduling appointment:', appointmentData);
      
      const response = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(appointmentData),
      });
      
      console.log('Appointment response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Appointment error response:', errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const newAppointment = await response.json();
      console.log('New appointment scheduled:', newAppointment);
      await fetchAppointments();
      return newAppointment;
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      throw error;
    }
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_BASE}/appointments/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        await fetchAppointments();
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const value = {
    user,
    isAuthenticated,
    queue,
    doctors,
    appointments,
    loading,
    login,
    logout,
    fetchQueue,
    updateQueueStatus,
    deleteFromQueue,
    addToQueue,
    fetchDoctors,
    fetchAppointments,
    scheduleAppointment,
    updateAppointmentStatus,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}; 