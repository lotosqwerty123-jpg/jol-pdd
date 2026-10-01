import AsyncStorage from '@react-native-async-storage/async-storage';

import { isLang } from '@/i18n/types';
import {
  DEFAULT_LEARNING_STATE,
  DEFAULT_SETTINGS,
  type ExamAttempt,
  type LearningState,
  type Profile,
  type QuestionProgress,
  type UserSettings,
} from '@/store/types';

export const USER_SETTINGS_KEY = 'jol.user-settings.v2';

function parseProfile(value: unknown): Profile {
  if (!value || typeof value !== 'object') {
    return DEFAULT_SETTINGS.profile;
  }

  const profile = value as Partial<Profile>;
  return {
    name: typeof profile.name === 'string' ? profile.name : '',
    category: typeof profile.category === 'string' ? profile.category : null,
    examDate: typeof profile.examDate === 'string' ? profile.examDate : null,
    examDateUnknown:
      typeof profile.examDateUnknown === 'boolean' ? profile.examDateUnknown : false,
    dailyMinutes: typeof profile.dailyMinutes === 'number' ? profile.dailyMinutes : null,
  };
}

function parseQuestionProgress(value: unknown): Record<string, QuestionProgress> {
  if (!value || typeof value !== 'object') {
    return {};
  }

  const result: Record<string, QuestionProgress> = {};

  for (const [questionId, raw] of Object.entries(value)) {
    if (!raw || typeof raw !== 'object') {
      continue;
    }

    const item = raw as Partial<QuestionProgress>;
    if (typeof item.selectedOptionId !== 'string' || typeof item.correct !== 'boolean') {
      continue;
    }

    result[questionId] = {
      selectedOptionId: item.selectedOptionId,
      correct: item.correct,
      attempts: typeof item.attempts === 'number' ? item.attempts : 1,
      updatedAt: typeof item.updatedAt === 'number' ? item.updatedAt : Date.now(),
    };
  }

  return result;
}

function parseExamHistory(value: unknown): ExamAttempt[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is ExamAttempt => {
      if (!item || typeof item !== 'object') {
        return false;
      }

      const attempt = item as Partial<ExamAttempt>;
      return (
        typeof attempt.id === 'string' &&
        typeof attempt.createdAt === 'number' &&
        typeof attempt.score === 'number' &&
        typeof attempt.total === 'number' &&
        typeof attempt.passed === 'boolean' &&
        Boolean(attempt.answers) &&
        typeof attempt.answers === 'object' &&
        Array.isArray(attempt.wrongQuestionIds)
      );
    })
    .map((attempt) => ({
      ...attempt,
      mode: (attempt.mode === 'strict' ? 'strict' : 'mock') as ExamAttempt['mode'],
    }))
    .slice(0, 20);
}

function parseLearning(value: unknown): LearningState {
  if (!value || typeof value !== 'object') {
    return DEFAULT_LEARNING_STATE;
  }

  const learning = value as Partial<LearningState>;

  return {
    questionProgress: parseQuestionProgress(learning.questionProgress),
    lastQuestionId: typeof learning.lastQuestionId === 'string' ? learning.lastQuestionId : null,
    totalAnswers: typeof learning.totalAnswers === 'number' ? learning.totalAnswers : 0,
    correctAnswers: typeof learning.correctAnswers === 'number' ? learning.correctAnswers : 0,
    wrongQuestionIds: Array.isArray(learning.wrongQuestionIds)
      ? learning.wrongQuestionIds.filter((id): id is string => typeof id === 'string')
      : [],
    examHistory: parseExamHistory(learning.examHistory),
  };
}

export function parseUserSettings(raw: string | null): UserSettings {
  if (!raw) {
    return DEFAULT_SETTINGS;
  }

  try {
    const data = JSON.parse(raw) as Partial<UserSettings>;
    return {
      lang: isLang(data.lang) ? data.lang : DEFAULT_SETTINGS.lang,
      theme: data.theme === 'light' || data.theme === 'dark' ? data.theme : DEFAULT_SETTINGS.theme,
      hasSelectedLanguage: Boolean(data.hasSelectedLanguage),
      onboardingCompleted: Boolean(data.onboardingCompleted),
      connectionMode: data.connectionMode === 'offline' ? 'offline' : 'online',
      profile: parseProfile(data.profile),
      learning: parseLearning(data.learning),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function loadUserSettings(): Promise<UserSettings> {
  const rawV2 = await AsyncStorage.getItem(USER_SETTINGS_KEY);
  if (rawV2) {
    return parseUserSettings(rawV2);
  }

  const legacy = await AsyncStorage.getItem('jol.user-settings.v1');
  return parseUserSettings(legacy);
}

export async function saveUserSettings(settings: UserSettings): Promise<void> {
  await AsyncStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(settings));
}
