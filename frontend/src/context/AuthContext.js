import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockUser } from '../mock';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function - will be replaced with actual API call
  const login = async (email, password) => {
    try {
      // TODO: Replace with actual API call to /api/auth/login
      // const response = await axios.post(`${BACKEND_URL}/api/auth/login`, { email, password });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock validation
      if (email && password) {
        const userData = { ...mockUser, email };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, user: userData };
      }
      
      return { success: false, error: 'Credenciales inválidas' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Mock register function - will be replaced with actual API call
  const register = async (nombre, email, password) => {
    try {
      // TODO: Replace with actual API call to /api/auth/register
      // const response = await axios.post(`${BACKEND_URL}/api/auth/register`, { nombre, email, password });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock validation
      if (nombre && email && password) {
        const userData = { ...mockUser, nombre, email };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, user: userData };
      }
      
      return { success: false, error: 'Datos inválidos' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};