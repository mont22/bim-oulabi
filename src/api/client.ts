import axios, {AxiosInstance, AxiosError, InternalAxiosRequestConfig} from 'axios';
import {API_CONFIG} from '../constants/config';
import {storage} from '../utils/storage';
import {ApiError} from '../types/api.types';

let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: () => void) => {
  onUnauthorized = handler;
};

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = await storage.getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    this.client.interceptors.response.use(
      response => response,
      async (error: AxiosError<ApiError>) => {
        if (error.response?.status === 401) {
          await storage.clear();
          if (onUnauthorized) {
            onUnauthorized();
          }
        }
        return Promise.reject(error);
      },
    );
  }

  public getInstance(): AxiosInstance {
    return this.client;
  }
}

export const apiClient = new ApiClient().getInstance();

