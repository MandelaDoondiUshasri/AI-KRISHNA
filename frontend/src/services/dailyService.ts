import { request } from './api';
import { DailyWisdom } from '../types';

export const dailyService = {
  async getTodayWisdom(): Promise<DailyWisdom> {
    return request<DailyWisdom>('/daily/today');
  },

  async getArchive(): Promise<DailyWisdom[]> {
    return request<DailyWisdom[]>('/daily/archive');
  }
};

