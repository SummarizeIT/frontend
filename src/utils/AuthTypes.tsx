export interface UserData {
    email: string;
    password: string;
    name?: string;
    lastName?: string;
  }
  
  export interface LoginData {
    email: string;
    password: string;
    rememberMe: boolean;
  }
  
  export interface LoginResponse {
    user: {
      id: string;
      name: string;
      email: string;
    };
    token: string;
    refreshToken: string;
  }
  
  export interface RegisterResponse extends LoginResponse {}
  
  export interface RefreshResponse {
    accessToken: string;
  }
  
  export interface ResetPasswordRequest {
    email: string;
  }
  
  export interface ResetPasswordResponse {
    message: string;
  }
  
  export interface ChangePasswordData {
    token: string;
    newPassword: string;
  }