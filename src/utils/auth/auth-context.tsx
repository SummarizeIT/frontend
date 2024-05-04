import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  LoginData,
  LoginResponse,
  ResetPasswordChangeData,
  ResetPasswordRequest,
  SimpleMessageResponse,
  UserData
} from './AuthTypes';

interface AuthContextType {
    user: UserData | null;
    isAuthenticated: boolean;
    login: (data: LoginData) => Promise<void>;
    logout: () => void;
    resetPassword: (data: ResetPasswordRequest) => Promise<void>;
    resetPasswordWithToken: (token: string, data: ResetPasswordChangeData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);

  //Done
  const fetchUserDetails = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const response = await axios.get<UserData>('http://104.248.45.73:8080/account', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    }
  };
  //Done
  const login = async (data: LoginData): Promise<void> => {
    try {
      const response = await axios.post<LoginResponse>('http://104.248.45.73:8080/auth/login', data);
      localStorage.setItem('accessToken', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      await fetchUserDetails();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    axios.get<SimpleMessageResponse>('http://104.248.45.73:8080/auth/logout').then(response => {
      console.log(response.data.message);
    }).catch(error => {
      console.error('Logout error:', error);
    });
  };

  const resetPassword = async (data: ResetPasswordRequest): Promise<void> => {
    try {
      const response = await axios.post<SimpleMessageResponse>('http://104.248.45.73:8080/auth/reset-password', data);
      alert(response.data.message);
    } catch (error) {
      console.error('Reset Password error:', error);
      alert('Failed to reset password. Please check your email.');
    }
  };

  const resetPasswordWithToken = async (token: string, data: ResetPasswordChangeData): Promise<void> => {
    try {
      const response = await axios.post<SimpleMessageResponse>(`http://104.248.45.73:8080/auth/reset-password/${token}`, data);
      console.log(response.data.message);
    } catch (error) {
      console.error('Reset Password with Token error:', error);
    }
  };


  //Done
  useEffect(() => {
    const refreshAuth = async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { data } = await axios.get<LoginResponse>('http://104.248.45.73:8080/auth/refresh', {
            headers: { refresh: `Bearer ${refreshToken}` }
          });
          localStorage.setItem('accessToken', data.token);
          localStorage.setItem('refreshToken', data.refreshToken);
          await fetchUserDetails();
          console.log('Token refreshed');
        } catch (error) {
          console.error('Error refreshing token:', error);
        }
      }
    };
    refreshAuth();
   
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, resetPassword, resetPasswordWithToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
