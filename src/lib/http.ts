import { AxiosRequestConfig, AxiosError, isAxiosError } from 'axios';
import api from './api';

interface ErrorResponse {
  message?: string;
  error?: string;
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
}

const handleError = (error: unknown) => {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    return {
      message: axiosError.response?.data?.error || 'An error occurred',
      status: axiosError.response?.status || 500,
      data: null,
    };
  }
  return {
    message: 'An unexpected error occurred',
    status: 500,
    data: null,
  };
};

export const http = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await api.get<T>(url, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw handleError(error);
    }
  },

  post: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await api.post<T>(url, data, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw handleError(error);
    }
  },

  put: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await api.put<T>(url, data, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw handleError(error);
    }
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await api.delete<T>(url, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw handleError(error);
    }
  },
}; 