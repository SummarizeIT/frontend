import axios from "axios";

export interface RegisterData {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  lastName: string;
}
class AuthManager {
  private static baseUrl: string='http://104.248.45.73:8080';

  private constructor() {}

  static async register(registerData: RegisterData): Promise<any> {
    const url = `${this.baseUrl}/auth/register`;
    try {
      const response = await axios.post(url, registerData);
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
    }
  }
  
}

export default AuthManager;
