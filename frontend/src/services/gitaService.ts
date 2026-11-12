import { request } from './api';
import { Chapter, Verse, LifeSituation } from '../types';

export const gitaService = {
  async getChapters(): Promise<Chapter[]> {
    return request<Chapter[]>('/gita/chapters');
  },

  async getChapterDetail(chapterNumber: number): Promise<{ chapter: Chapter; verses: Verse[] }> {
    return request<{ chapter: Chapter; verses: Verse[] }>(`/gita/chapters/${chapterNumber}`);
  },

  async getVerse(chapterNumber: number, verseNumber: number): Promise<Verse> {
    return request<Verse>(`/gita/verses/${chapterNumber}/${verseNumber}`);
  },

  async searchVerses(q?: string, situation?: string, chapter?: number): Promise<{ total: number; results: Verse[] }> {
    const params = new URLSearchParams();
    if (q) params.append('q', q);
    if (situation) params.append('situation', situation);
    if (chapter) params.append('chapter', chapter.toString());
    return request<{ total: number; results: Verse[] }>(`/gita/search?${params.toString()}`);
  },

  async getSituations(): Promise<LifeSituation[]> {
    return request<LifeSituation[]>('/gita/situations');
  }
};

