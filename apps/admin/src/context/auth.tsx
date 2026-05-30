import { createContext, useCallback, useContext, useState } from 'react';
import { api } from '../lib/api';

interface AuthContextValue {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    () => sessionStorage.getItem('auth_token')
  );

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.post<{ token: string }>('/auth/login', { email, password });
    sessionStorage.setItem('auth_token', res.data.token);
    setToken(res.data.token);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('auth_token');
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
