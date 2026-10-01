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
import { useNetworkStatus, type JolNetworkState } from '@/hooks/use-network-status';
import type { Lang } from '@/i18n/types';
import { loadUserSettings, saveUserSettings } from '@/store/storage';
import {
  DEFAULT_LEARNING_STATE,
  DEFAULT_SETTINGS,
  type ConnectionMode,
  type ExamAttempt,
  type Profile,
  type UserSettings,
} from '@/store/types';
import { getPalette, type JolTheme } from '@/theme/colors';

type AppSettingsContextValue = UserSettings & {
  isHydrated: boolean;
  dict: ReturnType<typeof getDict>;
  colors: ReturnType<typeof getPalette>;
  setLang: (lang: Lang) => void;
  selectLanguage: (lang: Lang) => void;
  setTheme: (theme: JolTheme) => void;
  setConnectionMode: (mode: ConnectionMode) => void;
  networkState: JolNetworkState;
  effectiveNetwork: JolNetworkState;
  isForcedOffline: boolean;
  toggleTheme: () => void;
  updateProfile: (patch: Partial<Profile>) => void;
  finishOnboarding: () => void;
  resetOnboarding: () => void;
  recordLearningAnswer: (questionId: string, selectedOptionId: string, correct: boolean) => void;
  setLastQuestion: (questionId: string | null) => void;
  recordExamAttempt: (attempt: ExamAttempt) => void;
  resetLearning: () => void;
  resetAll: () => void;
};

const AppSettingsContext = createContext<AppSettingsContextValue | null>(null);

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [isHydrated, setIsHydrated] = useState(false);
  const networkState = useNetworkStatus();

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
    const effectiveNetwork: JolNetworkState = settings.connectionMode === 'offline' ? 'offline' : networkState;

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
      setConnectionMode: (connectionMode) => {
        patchSettings((current) => ({ ...current, connectionMode }));
      },
      networkState,
      effectiveNetwork,
      isForcedOffline: settings.connectionMode === 'offline',
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
      recordLearningAnswer: (questionId, selectedOptionId, correct) => {
        patchSettings((current) => {
          const previous = current.learning.questionProgress[questionId];
          const wrongQuestionIds = correct
            ? current.learning.wrongQuestionIds.filter((id) => id !== questionId)
            : Array.from(new Set([...current.learning.wrongQuestionIds, questionId]));

          return {
            ...current,
            learning: {
              ...current.learning,
              questionProgress: {
                ...current.learning.questionProgress,
                [questionId]: {
                  selectedOptionId,
                  correct,
                  attempts: (previous?.attempts ?? 0) + 1,
                  updatedAt: Date.now(),
                },
              },
              lastQuestionId: questionId,
              totalAnswers: current.learning.totalAnswers + 1,
              correctAnswers: current.learning.correctAnswers + (correct ? 1 : 0),
              wrongQuestionIds,
            },
          };
        });
      },
      setLastQuestion: (questionId) => {
        patchSettings((current) => ({
          ...current,
          learning: {
            ...current.learning,
            lastQuestionId: questionId,
          },
        }));
      },
      recordExamAttempt: (attempt) => {
        patchSettings((current) => ({
          ...current,
          learning: {
            ...current.learning,
            examHistory: [attempt, ...current.learning.examHistory].slice(0, 20),
            wrongQuestionIds: Array.from(
              new Set([...current.learning.wrongQuestionIds, ...attempt.wrongQuestionIds]),
            ),
          },
        }));
      },
      resetLearning: () => {
        patchSettings((current) => ({
          ...current,
          learning: {
            ...DEFAULT_LEARNING_STATE,
            questionProgress: {},
            wrongQuestionIds: [],
            examHistory: [],
          },
        }));
      },
      resetAll: () => {
        patchSettings(() => ({
          ...DEFAULT_SETTINGS,
          profile: { ...DEFAULT_SETTINGS.profile },
          learning: {
            ...DEFAULT_LEARNING_STATE,
            questionProgress: {},
            wrongQuestionIds: [],
            examHistory: [],
          },
        }));
      },
    };
  }, [isHydrated, networkState, patchSettings, settings]);

  return <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>;
}

export function useAppSettings() {
  const value = useContext(AppSettingsContext);
  if (!value) {
    throw new Error('useAppSettings must be used within AppSettingsProvider');
  }
  return value;
}
