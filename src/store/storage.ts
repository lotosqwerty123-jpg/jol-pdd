import AsyncStorage from '@react-native-async-storage/async-storage';

import { isLang } from '@/i18n/types';
import { DEFAULT_SETTINGS, type Profile, type UserSettings } from '@/store/types';

export const USER_SETTINGS_KEY = 'jol.user-settings.v1';

function parseProfile(value: unknown): Profile {
  if (!value || typeof value !== 'object') {
    return DEFAULT_SETTINGS.profile;
  }

  const profile = value as Partial<Profile>;
  return {
    name: typeof profile.name === 'string' ? profile.name : '',
    category: typeof profile.category === 'string' ? profile.category : null,
    examDate: typeof profile.examDate === 'string' ? profile.examDate : null,
    dailyMinutes: typeof profile.dailyMinutes === 'number' ? profile.dailyMinutes : null,
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
      profile: parseProfile(data.profile),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function loadUserSettings(): Promise<UserSettings> {
  const raw = await AsyncStorage.getItem(USER_SETTINGS_KEY);
  return parseUserSettings(raw);
}

export async function saveUserSettings(settings: UserSettings): Promise<void> {
  await AsyncStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(settings));
}
