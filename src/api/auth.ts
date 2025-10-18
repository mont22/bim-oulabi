import {apiClient} from './client';
import {
  LoginRequest,
  LoginResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from '../types/auth.types';
import {ApiResponse} from '../types/api.types';

export const authApi = {
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      '/login',
      data,
    );
    return response.data;
  },

  verifyOtp: async (
    data: VerifyOtpRequest,
  ): Promise<ApiResponse<VerifyOtpResponse>> => {
    const response = await apiClient.post<ApiResponse<VerifyOtpResponse>>(
      '/login/2fa',
      data,
    );
    return response.data;
  },
};

