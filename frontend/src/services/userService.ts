import { request } from './api';
import { Favorite, User } from '../types';

export const userService = {
  async getFavorites(): Promise<Favorite[]> {
    return request<Favorite[]>('/user/favorites');
  },

  async addFavorite(itemType: 'verse' | 'message', verseId?: number, messageId?: number, title?: string, notes?: string): Promise<Favorite> {
    return request<Favorite>('/user/favorites', {
      method: 'POST',
      body: JSON.stringify({ item_type: itemType, verse_id: verseId, message_id: messageId, title, notes })
    });
  },

  async deleteFavorite(id: number): Promise<{ status: string }> {
    return request<{ status: string }>(`/user/favorites/${id}`, {
      method: 'DELETE'
    });
  },

  async updatePreferences(fullName?: string, preferredLanguage?: string): Promise<User> {
    return request<User>('/user/preferences', {
      method: 'PUT',
      body: JSON.stringify({ full_name: fullName, preferred_language: preferredLanguage })
    });
  }
};

