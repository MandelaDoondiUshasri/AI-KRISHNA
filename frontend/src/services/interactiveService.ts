import { request } from './api';
import { 
  MoodItem, ArjunaScenario, MythItem, QuizQuestion, 
  KurukshetraStage, DailyChallengeData, Verse 
} from '../types';

export const interactiveService = {
  // 1. Mood Mirror
  async getMoods(): Promise<MoodItem[]> {
    return request<MoodItem[]>('/interactive/moods');
  },

  async getMoodGuidance(moodId: string, language: string = 'en'): Promise<any> {
    return request<any>(`/interactive/mood/${moodId}?language=${language}`);
  },

  // 2. Random Wisdom
  async getRandomWisdom(language: string = 'en'): Promise<any> {
    return request<any>(`/interactive/random-wisdom?language=${language}`);
  },

  // 3. Decode Problem
  async decodeProblem(problemText: string, language: string = 'en'): Promise<any> {
    return request<any>('/interactive/decode-problem', {
      method: 'POST',
      body: JSON.stringify({ problem_text: problemText, language })
    });
  },

  // 4. If You Were Arjuna
  async getArjunaScenarios(): Promise<ArjunaScenario[]> {
    return request<ArjunaScenario[]>('/interactive/arjuna-scenarios');
  },

  // 5. Myth vs Truth
  async getMyths(): Promise<MythItem[]> {
    return request<MythItem[]>('/interactive/myths');
  },

  // 6. Wisdom Quiz
  async getQuiz(language: string = 'en'): Promise<QuizQuestion[]> {
    return request<QuizQuestion[]>(`/interactive/quiz?language=${language}`);
  },

  async submitQuizScore(score: number, totalQuestions: number, sessionId?: string): Promise<any> {
    return request<any>('/interactive/quiz/submit', {
      method: 'POST',
      body: JSON.stringify({ score, total_questions: totalQuestions, session_id: sessionId })
    });
  },

  // 7. Explain Like I'm 10 (ELI10)
  async getELI10(chapter: number, verse: number, language: string = 'en'): Promise<any> {
    return request<any>(`/interactive/eli10/${chapter}/${verse}?language=${language}`);
  },

  // 8. Letter to Krishna
  async sendLetter(letterText: string, isEphemeral: boolean = false, language: string = 'en', sessionId?: string): Promise<any> {
    return request<any>('/interactive/letter', {
      method: 'POST',
      body: JSON.stringify({
        letter_text: letterText,
        is_ephemeral: isEphemeral,
        language,
        session_id: sessionId
      })
    });
  },

  async getMyLetters(): Promise<any[]> {
    return request<any[]>('/interactive/letters/my');
  },

  // 9. Interactive Kurukshetra
  async getKurukshetraStages(): Promise<KurukshetraStage[]> {
    return request<KurukshetraStage[]>('/interactive/kurukshetra');
  },

  // 10. Daily Challenges
  async getDailyChallenges(goal: string = 'focus', sessionId?: string): Promise<DailyChallengeData> {
    const params = new URLSearchParams({ goal });
    if (sessionId) params.append('session_id', sessionId);
    return request<DailyChallengeData>(`/interactive/daily-challenges?${params.toString()}`);
  },

  async toggleDailyChallengeTask(taskId: number, goalType: string, sessionId?: string): Promise<DailyChallengeData> {
    return request<DailyChallengeData>('/interactive/daily-challenges/toggle', {
      method: 'POST',
      body: JSON.stringify({
        task_id: taskId,
        goal_type: goalType,
        session_id: sessionId
      })
    });
  }
};
