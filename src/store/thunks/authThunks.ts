import {createAsyncThunk} from '@reduxjs/toolkit';
import {authApi} from '../../api/auth';
import {LoginRequest, VerifyOtpRequest} from '../../types/auth.types';
import {storage} from '../../utils/storage';
import {AxiosError} from 'axios';
import {ApiError} from '../../types/api.types';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data: LoginRequest, {rejectWithValue}) => {
    try {
      const response = await authApi.login(data);
      // The API returns OTP for testing purposes
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data?.message) {
        return rejectWithValue(axiosError.response.data.message);
      }
      return rejectWithValue('Login failed. Please try again.');
    }
  },
);

export const verifyOtpThunk = createAsyncThunk(
  'auth/verifyOtp',
  async (data: VerifyOtpRequest, {rejectWithValue}) => {
    try {
      const response = await authApi.verifyOtp(data);
      // Store authenticated token
      await storage.setToken(response.data.token);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.data?.message) {
        return rejectWithValue(axiosError.response.data.message);
      }
      return rejectWithValue('OTP verification failed. Please try again.');
    }
  },
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, {rejectWithValue}) => {
    try {
      await storage.clear();
      return true;
    } catch (error) {
      return rejectWithValue('Logout failed. Please try again.');
    }
  },
);

