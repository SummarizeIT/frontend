import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  LoginData,
  LoginResponse,
  ResetPasswordRequest,
  SimpleMessageResponse,
  UserData,
  ResetPasswordTokenCheckResponse,
  ResetPasswordChangeRequest
} from './AuthTypes';

interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  resetPassword: (data: ResetPasswordRequest) => Promise<void>;
  validateResetToken: (token: string) => Promise<ResetPasswordTokenCheckResponse>;
  changePasswordWithToken: (data: ResetPasswordChangeRequest) => Promise<void>;
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
  //Done
  const logout = (): void => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      axios.get<SimpleMessageResponse>('http://104.248.45.73:8080/auth/logout', {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
        .then(response => {
          console.log(response.data.message);
        })
        .catch(error => {
          console.error('Logout error:', error);
        });
    } else {
      console.error('Logout error: No access token found');
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
  };
  //Done
  const resetPassword = async (data: ResetPasswordRequest): Promise<void> => {
    try {
      const response = await axios.post<SimpleMessageResponse>('http://104.248.45.73:8080/auth/reset-password', data);
      alert(response.data.message);
    } catch (error) {
      console.error('Reset Password error:', error);
      alert('Failed to reset password. Please check your email.');
    }
  };

  //TODO
  const validateResetToken = async (token: string): Promise<ResetPasswordTokenCheckResponse> => {
    try {
      const response = await axios.get<ResetPasswordTokenCheckResponse>(`http://104.248.45.73:8080/auth/reset-password/${token}`);
      return response.data;
    } catch (error) {
      console.error('Token validation error:', error);
      throw error;
    }
  };

  const changePasswordWithToken = async (data: ResetPasswordChangeRequest): Promise<void> => {
    try {
      const response = await axios.post<SimpleMessageResponse>(`http://104.248.45.73:8080/auth/reset-password/${data.token}`, {
        password: data.password,
        passwordConfirm: data.passwordConfirm
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Password reset error:', error);
      alert('Failed to reset password.');
      throw error;
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
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, resetPassword, validateResetToken, changePasswordWithToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
