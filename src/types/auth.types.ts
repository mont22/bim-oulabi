export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  otp?: number;
  message?: string;
}

export interface VerifyOtpRequest {
  otp: string;
}

export interface VerifyOtpResponse {
  token: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  tempToken: string | null; // Token before OTP verification
}

