import { createContext, useContext, useState, useEffect} from 'react';
import { apiClient } from '../services/apiClient';
import type { ReactNode } from 'react';
import type { User, AuthContextType }  from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
    handleOAuthCallback();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      apiClient.setToken(token);
      const userData = await apiClient.get('/api/user');
      setUser(userData);
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('auth_token');
      apiClient.setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthCallback = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      handleAuthCallback(token);
    }
  };

  const handleAuthCallback = async (token: string) => {
    try {
      apiClient.setToken(token);
      const userData = await apiClient.get('/api/user');
      setUser(userData);
      
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (error) {
      console.error('Auth callback failed:', error);
    }
  };

  const login = () => {
    window.location.href = `${'http://localhost:8000'}/auth/google`;
  };

  const logout = async () => {
    try {
      await apiClient.post('/api/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      apiClient.setToken(null);
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}