import { http } from './http';

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  _id: string;
  role: number;
  email: string;
  walletAddress: string | null;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  userName: string | null;
  telegramUserName: string | null;
  dateOfBirth: string | null;
  gender: string;
  otp: number;
  isBlocked: boolean;
  isVerrified: boolean;
  kycStatus: string;
  kycReason: string;
  subscribe: boolean;
  admin_Domain: string;
  databaseName: string;
  lp_Domain: string;
  isActiveSubAdmin: boolean;
  isDeleted: boolean;
  godClientId: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginResponse {
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
  status: number;
  message?: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    return http.post<LoginResponse>('/user/adminLogin', credentials);
  },
};