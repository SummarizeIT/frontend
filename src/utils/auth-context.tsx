import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {
    UserData,
    LoginData,
    LoginResponse,
    RegisterResponse,
    RefreshResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
    ChangePasswordData
} from './AuthTypes';

interface AuthContextType {
    user: LoginResponse['user'] | null;
    isAuthenticated: boolean;
    login: (data: LoginData) => Promise<void>;
    logout: () => void;
    register: (data: UserData) => Promise<void>;
    resetPassword: (data: ResetPasswordRequest) => Promise<void>;
    changePassword: (data: ChangePasswordData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoginResponse['user'] | null>(null);

  const fetchUserDetails = async (token: string) => {
    try {
      const response = await axios.get<LoginResponse['user']>('http://104.248.45.73:8080/account', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const login = async (data: LoginData): Promise<void> => {
    try {
      const response = await axios.post<LoginResponse>('http://104.248.45.73:8080/auth/login', data);
      localStorage.setItem('accessToken', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      await fetchUserDetails(response.data.token);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    axios.get('http://104.248.45.73:8080/auth/logout');
  };

  const register = async (data: UserData): Promise<void> => {
    const response = await axios.post<RegisterResponse>('http://104.248.45.73:8080/auth/register', data);
    setUser(response.data.user);
    localStorage.setItem('accessToken', response.data.token);
    localStorage.setItem('refreshToken', response.data.refreshToken);
  };

  const resetPassword = async (data: ResetPasswordRequest): Promise<void> => {
    await axios.post<ResetPasswordResponse>('http://104.248.45.73:8080/auth/reset-password', data);
  };

  const changePassword = async (data: ChangePasswordData): Promise<void> => {
    await axios.post<ResetPasswordResponse>(`http://104.248.45.73:8080/auth/reset-password/${data.token}`, {
      newPassword: data.newPassword
    });
  };

  useEffect(() => {
    const refreshAuth = async () => {
      try {
        const { data } = await axios.get<RefreshResponse>('http://104.248.45.73:8080/auth/refresh', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
          }
        });
        localStorage.setItem('accessToken', data.accessToken);
        fetchUserDetails(data.accessToken);
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    };

    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register, resetPassword, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
