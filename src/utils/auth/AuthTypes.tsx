export interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  expiresIn: {
    token: number;
    refreshToken: number;
  };
}

export interface AuthError {
  message: string;
  items?: Record<string, string>;
}

export interface SimpleMessageResponse {
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordTokenCheckResponse {
  id: string;
  token: string;
  userId: string;
  expirationDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResetPasswordChangeData {
  password: string;
  passwordConfirm: string;
}


interface Organization {
  id: string;
  name: string;
  avatar: string;
  rootFolder: string;
  adminPermissions: string[];
}

interface Invite {
  id: string;
  name: string;
  avatar: string;
}

export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  rootFolder: string;
  avatar: string;
  organizations: Organization[];
  invites: Invite[];
}
