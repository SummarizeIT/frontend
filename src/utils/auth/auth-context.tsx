import { LoginRequest, RegisterRequest, MeResponse, PasswordRequest, PasswordResetResponse, ResetPasswordRequest } from '@/client';
import { OpenAPI } from '@/client/core/OpenAPI.ts';
import { AccountService, AuthService } from '@/client/services.gen.ts';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


OpenAPI.BASE = 'http://localhost:8010/proxy';

interface AuthContextType {
  user: MeResponse | null;
  isAuthenticated: boolean;
  login: (request: LoginRequest) => Promise<void>;
  register: (request: RegisterRequest) => Promise<void>;
  logout: () => void;
  resetPassword: (request: PasswordRequest) => Promise<void>;
  validateResetToken: (token: string) => Promise<PasswordResetResponse>;
  changePasswordWithToken: (token: string, request: ResetPasswordRequest) => Promise<PasswordResetResponse>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<MeResponse | null>(null);
  const navigate = useNavigate();


  //Done
  const fetchUserDetails = async () => {
    try {
      setUser(await AccountService.me());
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };
  //Done
  const login = async (request: LoginRequest): Promise<void> => {
    await AuthService.login({ requestBody: request })
      .then((response) => {
        localStorage.setItem('accesstoken', response.token);
        localStorage.setItem('refreshtoken', response.refreshToken);
        OpenAPI.TOKEN = response.token;
        fetchUserDetails();
        navigate("/Dashboard");
      }
      ).catch(error => {
        console.log(error)
      })
  }
  //Done
  const register = async (request: RegisterRequest): Promise<void> => {
    await AuthService.register({ requestBody: request })
      .then((response) => {
        alert(response.message);
        navigate("/signin");
      }
      ).catch(error => {
        console.log(error)
      })
  }
  //Done
  const logout = (): void => {
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('refreshtoken');
    setUser(null);
    AuthService.logout();
    OpenAPI.TOKEN = undefined;
  };
  //Done
  const resetPassword = async (request: PasswordRequest): Promise<void> => {
    await AuthService.resetPassword({ requestBody: request });
  };
  //TODO
  const validateResetToken = async (token: string): Promise<PasswordResetResponse> => {
    return await AuthService.resetPassword2({ token });
  };
  //TODO
  const changePasswordWithToken = async (token: string, request: ResetPasswordRequest): Promise<PasswordResetResponse> => {
    return await AuthService.resetPassword1({ requestBody: request, token });
  };
  //Done
  const refreshAuth = async () => {
    const refresh = localStorage.getItem('refreshtoken');
    if (refresh) {
      await AuthService.refresh({ refresh })
        .then((response) => {
          localStorage.setItem('accesstoken', response.token);
          localStorage.setItem('refreshtoken', response.refreshToken);
        }).catch(error => console.log(error))
    }
  };
  //Done
  useEffect(() => {
    const token = localStorage.getItem('accesstoken');
    if (token) {
      OpenAPI.TOKEN = token;
      refreshAuth();
      fetchUserDetails();
    }
  }, []);


  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, resetPassword, validateResetToken, changePasswordWithToken, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
