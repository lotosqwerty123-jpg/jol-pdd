import type { Lang } from '@/i18n/types';
import type { JolTheme } from '@/theme/colors';

export type Profile = {
  name: string;
  category: string | null;
  examDate: string | null;
  dailyMinutes: number | null;
};

export type UserSettings = {
  lang: Lang;
  theme: JolTheme;
  hasSelectedLanguage: boolean;
  onboardingCompleted: boolean;
  profile: Profile;
};

export const DEFAULT_PROFILE: Profile = {
  name: '',
  category: null,
  examDate: null,
  dailyMinutes: null,
};

export const DEFAULT_SETTINGS: UserSettings = {
  lang: 'ru',
  theme: 'dark',
  hasSelectedLanguage: false,
  onboardingCompleted: false,
  profile: DEFAULT_PROFILE,
};
