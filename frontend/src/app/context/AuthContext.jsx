'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    isLoggedIn: false,
    username: null,
    email: null,
    token: null
  });

  // Load user data from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const login = (userData) => {
    const userState = {
      isLoggedIn: true,
      username: userData.username,
      email: userData.email,
      token: userData.token
    };
    // Update state and store in localStorage
    setUser(userState);
    localStorage.setItem('user', JSON.stringify(userState));
  };

  const logout = () => {
    const userState = {
      isLoggedIn: false,
      username: null,
      email: null,
      token: null
    };
    // Clear state and remove from localStorage
    setUser(userState);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
