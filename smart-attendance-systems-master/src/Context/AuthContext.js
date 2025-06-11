import { createContext, useContext, useState, useEffect } from 'react';
import api from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  const login = async (email, password) => {
    const res = await api.post('/login', { email, password });
    setAccessToken(res.data.accessToken);
  };

  const refresh = async () => {
    try {
      const res = await api.post('/refresh');
      setAccessToken(res.data.accessToken);
    } catch {
      setAccessToken(null);
    }
  };

  const logout = async () => {
    await api.post('/logout');
    setAccessToken(null);
  };

  useEffect(() => {
    refresh(); // On page reload, get new access token using refresh token
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
