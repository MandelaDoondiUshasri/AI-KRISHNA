import { request } from './api';
import { AuthResponse, User } from '../types';

export const authService = {
  async register(email: string, password: string, fullName?: string, preferredLanguage: string = 'en'): Promise<AuthResponse> {
    const res = await request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name: fullName, preferred_language: preferredLanguage })
    });
    localStorage.setItem('aikrishna_token', res.access_token);
    return res;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    localStorage.setItem('aikrishna_token', res.access_token);
    return res;
  },

  async getMe(): Promise<User> {
    return request<User>('/auth/me');
  },

  logout() {
    localStorage.removeItem('aikrishna_token');
  }
};

