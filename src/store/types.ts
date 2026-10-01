import type { Lang } from '@/i18n/types';
import type { JolTheme } from '@/theme/colors';

export type ConnectionMode = 'online' | 'offline';

export type Profile = {
  name: string;
  category: string | null;
  examDate: string | null;
  examDateUnknown: boolean;
  dailyMinutes: number | null;
};

export type QuestionProgress = {
  selectedOptionId: string;
  correct: boolean;
  attempts: number;
  updatedAt: number;
};

export type ExamAttempt = {
  id: string;
  mode?: 'mock' | 'strict';
  createdAt: number;
  score: number;
  total: number;
  passed: boolean;
  answers: Record<string, string>;
  wrongQuestionIds: string[];
};

export type LearningState = {
  questionProgress: Record<string, QuestionProgress>;
  lastQuestionId: string | null;
  totalAnswers: number;
  correctAnswers: number;
  wrongQuestionIds: string[];
  examHistory: ExamAttempt[];
};

export type UserSettings = {
  lang: Lang;
  theme: JolTheme;
  hasSelectedLanguage: boolean;
  onboardingCompleted: boolean;
  connectionMode: ConnectionMode;
  profile: Profile;
  learning: LearningState;
};

export const DEFAULT_PROFILE: Profile = {
  name: '',
  category: null,
  examDate: null,
  examDateUnknown: false,
  dailyMinutes: null,
};

export const DEFAULT_LEARNING_STATE: LearningState = {
  questionProgress: {},
  lastQuestionId: null,
  totalAnswers: 0,
  correctAnswers: 0,
  wrongQuestionIds: [],
  examHistory: [],
};

export const DEFAULT_SETTINGS: UserSettings = {
  lang: 'ru',
  theme: 'dark',
  hasSelectedLanguage: false,
  onboardingCompleted: false,
  connectionMode: 'online',
  profile: DEFAULT_PROFILE,
  learning: DEFAULT_LEARNING_STATE,
};
