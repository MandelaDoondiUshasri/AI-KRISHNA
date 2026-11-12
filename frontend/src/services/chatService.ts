import { request } from './api';
import { Conversation, Message } from '../types';

export const chatService = {
  async listConversations(): Promise<Conversation[]> {
    return request<Conversation[]>('/chat/conversations');
  },

  async getConversation(id: number): Promise<Conversation> {
    return request<Conversation>(`/chat/conversations/${id}`);
  },

  async createConversation(title?: string, language: string = 'en'): Promise<Conversation> {
    return request<Conversation>('/chat/conversations', {
      method: 'POST',
      body: JSON.stringify({ title, language })
    });
  },

  async deleteConversation(id: number): Promise<{ status: string }> {
    return request<{ status: string }>(`/chat/conversations/${id}`, {
      method: 'DELETE'
    });
  },

  async sendMessage(content: string, conversationId?: number, language: string = 'en'): Promise<{
    conversation_id: number;
    user_message: Message;
    krishna_message: Message;
  }> {
    return request('/chat/message', {
      method: 'POST',
      body: JSON.stringify({
        content,
        conversation_id: conversationId,
        language
      })
    });
  },

  async regenerateMessage(conversationId: number, language: string = 'en'): Promise<{
    conversation_id: number;
    krishna_message: Message;
  }> {
    return request('/chat/message/regenerate', {
      method: 'POST',
      body: JSON.stringify({
        conversation_id: conversationId,
        language
      })
    });
  }
};

