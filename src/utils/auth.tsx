import axios from "axios";

export interface RegisterData {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  lastName: string;
}

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface ResetPasswordData {
  email: string;
}
class AuthManager {
  private static baseUrl: string='http://104.248.45.73:8080';

  private constructor() {}

  static async register(registerData: RegisterData): Promise<any> {
    const url = `${this.baseUrl}/auth/register`;
    return axios.post(url, registerData);
  }

  static async login(loginData: LoginData): Promise<any> {
    const url = `${this.baseUrl}/auth/login`;
    return axios.post(url, loginData);
  }

  static async logout(): Promise<any> {
    const url = `${this.baseUrl}/auth/logout`;
    return axios.get(url);
  }

  static async refresh(): Promise<any> {
    const url = `${this.baseUrl}/auth/refresh`;
    return axios.get(url);
  }

  static async resetPassword(resetData: ResetPasswordData): Promise<any> {
    const url = `${this.baseUrl}/auth/reset-password`;
    return axios.post(url, resetData);
  }
}

export default AuthManager;
