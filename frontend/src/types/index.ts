export type Language = 'en' | 'hi' | 'te';

export interface User {
  id: number;
  email: string;
  full_name: string | null;
  preferred_language: Language;
  role: 'user' | 'admin';
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface Chapter {
  id: number;
  chapter_number: number;
  name_sanskrit: string;
  name_transliteration: string;
  name_english: string;
  verses_count: number;
  summary_en: string | null;
  summary_hi: string | null;
  summary_te: string | null;
  key_themes: string | null;
}

export interface Verse {
  id: number;
  chapter_number: number;
  verse_number: number;
  slok_sanskrit: string;
  transliteration: string;
  translation_en: string;
  translation_hi: string | null;
  translation_te: string | null;
  explanation: string | null;
  core_concepts: string | null;
  life_situations: string | null;
  chapter_title_en: string | null;
}

export interface VerseReference {
  id?: number;
  chapter_number: number;
  verse_number: number;
  slok_sanskrit: string;
  transliteration: string;
  translation: string;
  chapter_title: string;
}

export interface StructuredResponse {
  situation_understanding: string;
  krishna_wisdom: string;
  verse: VerseReference | null;
  is_direct_verse: boolean;
  how_it_applies: string;
  practical_steps: string[];
  thought_to_remember: string;
  emotion_detected?: string;
  disclaimer?: string;
  is_crisis?: boolean;
}

export interface Message {
  id: number;
  conversation_id: number;
  sender: 'user' | 'krishna';
  content: string;
  emotion_detected?: string | null;
  verse_id_referenced?: number | null;
  structured_data?: StructuredResponse | null;
  created_at: string;
}

export interface Conversation {
  id: number;
  title: string;
  language: Language;
  created_at: string;
  updated_at: string;
  messages: Message[];
}

export interface DailyWisdom {
  id: number;
  date_str: string;
  verse: Verse;
  reflection_en: string;
  reflection_hi: string | null;
  reflection_te: string | null;
  practical_focus: string | null;
  created_at: string;
}

export interface Favorite {
  id: number;
  user_id: number;
  item_type: 'verse' | 'message';
  verse_id?: number | null;
  message_id?: number | null;
  title?: string | null;
  notes?: string | null;
  verse?: Verse | null;
  created_at: string;
}

export interface AdminMetrics {
  total_users: number;
  active_users: number;
  total_conversations: number;
  total_messages: number;
  total_verses: number;
  popular_situations: { emotion: string; count: number }[];
  most_referenced_verses: { reference: string; transliteration: string; count: number }[];
}

export interface AIConfig {
  provider: string;
  gemini_configured: boolean;
  openai_configured: boolean;
  current_model: string;
}

export interface LifeSituation {
  id: string;
  title: string;
  title_en?: string;
  title_hi?: string;
  title_te?: string;
  icon: string;
  description: string;
}

export interface MoodItem {
  id: string;
  emoji: string;
  title_en: string;
  title_hi: string;
  title_te: string;
  verse_ref: string;
  summary_en: string;
  summary_hi: string;
  summary_te: string;
  practice_en: string;
  practice_hi: string;
  practice_te: string;
}

export interface ArjunaScenario {
  id: string;
  title: string;
  context: string;
  question: string;
  options: {
    id: string;
    text: string;
    is_gita_aligned: boolean;
    feedback: string;
  }[];
  verse_ref: string;
  core_lesson: string;
}

export interface MythItem {
  id: string;
  statement: string;
  is_myth: boolean;
  title: string;
  truth_en: string;
  truth_hi: string;
  truth_te: string;
  verse_proof: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

export interface KurukshetraStage {
  stage_num: number;
  title: string;
  description: string;
  choice_a: string;
  choice_b: string;
  aligned_choice: string;
  lesson: string;
}

export interface DailyChallengeTask {
  id: number;
  title: string;
  completed: boolean;
}

export interface DailyChallengeData {
  date: string;
  goal_type: string;
  challenges: DailyChallengeTask[];
  streak_count: number;
  is_completed: boolean;
}


