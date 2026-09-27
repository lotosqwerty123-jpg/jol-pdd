import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { getDict } from '@/i18n/dictionaries';
import type { Lang } from '@/i18n/types';
import { loadUserSettings, saveUserSettings } from '@/store/storage';
import { DEFAULT_SETTINGS, type Profile, type UserSettings } from '@/store/types';
import { getPalette, type JolTheme } from '@/theme/colors';

type AppSettingsContextValue = UserSettings & {
  isHydrated: boolean;
  dict: ReturnType<typeof getDict>;
  colors: ReturnType<typeof getPalette>;
  setLang: (lang: Lang) => void;
  selectLanguage: (lang: Lang) => void;
  setTheme: (theme: JolTheme) => void;
  toggleTheme: () => void;
  updateProfile: (patch: Partial<Profile>) => void;
  finishOnboarding: () => void;
  resetOnboarding: () => void;
};

const AppSettingsContext = createContext<AppSettingsContextValue | null>(null);

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadUserSettings()
      .then((loaded) => {
        if (!cancelled) {
          setSettings(loaded);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsHydrated(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    void saveUserSettings(settings);
  }, [isHydrated, settings]);

  const patchSettings = useCallback((updater: (current: UserSettings) => UserSettings) => {
    setSettings(updater);
  }, []);

  const value = useMemo<AppSettingsContextValue>(() => {
    return {
      ...settings,
      isHydrated,
      dict: getDict(settings.lang),
      colors: getPalette(settings.theme),
      setLang: (lang) => {
        patchSettings((current) => ({ ...current, lang }));
      },
      selectLanguage: (lang) => {
        patchSettings((current) => ({
          ...current,
          lang,
          hasSelectedLanguage: true,
        }));
      },
      setTheme: (theme) => {
        patchSettings((current) => ({ ...current, theme }));
      },
      toggleTheme: () => {
        patchSettings((current) => ({
          ...current,
          theme: current.theme === 'dark' ? 'light' : 'dark',
        }));
      },
      updateProfile: (patch) => {
        patchSettings((current) => ({
          ...current,
          profile: { ...current.profile, ...patch },
        }));
      },
      finishOnboarding: () => {
        patchSettings((current) => ({
          ...current,
          onboardingCompleted: true,
          hasSelectedLanguage: true,
        }));
      },
      resetOnboarding: () => {
        patchSettings((current) => ({
          ...current,
          onboardingCompleted: false,
          hasSelectedLanguage: false,
        }));
      },
    };
  }, [isHydrated, patchSettings, settings]);

  return <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>;
}

export function useAppSettings() {
  const value = useContext(AppSettingsContext);
  if (!value) {
    throw new Error('useAppSettings must be used within AppSettingsProvider');
  }
  return value;
}
