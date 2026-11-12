import { request } from './api';
import { AdminMetrics, AIConfig } from '../types';

export const adminService = {
  async getMetrics(): Promise<AdminMetrics> {
    return request<AdminMetrics>('/admin/metrics');
  },

  async getConfig(): Promise<AIConfig> {
    return request<AIConfig>('/admin/config');
  },

  async updateConfig(provider: string, geminiKey?: string, openaiKey?: string, modelName?: string): Promise<AIConfig> {
    return request<AIConfig>('/admin/config', {
      method: 'POST',
      body: JSON.stringify({
        provider,
        gemini_api_key: geminiKey,
        openai_api_key: openaiKey,
        model_name: modelName
      })
    });
  },

  async getUsers(): Promise<any[]> {
    return request<any[]>('/admin/users');
  }
};

