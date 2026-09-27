import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { AppSettingsProvider, useAppSettings } from '@/store/app-settings';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AppSettingsProvider>
      <RootNavigator />
    </AppSettingsProvider>
  );
}

function RootNavigator() {
  const { isHydrated, hasSelectedLanguage, onboardingCompleted, theme, colors } = useAppSettings();

  useEffect(() => {
    if (isHydrated) {
      void SplashScreen.hideAsync();
    }
  }, [isHydrated]);

  if (!isHydrated) {
    return null;
  }

  const navigationTheme = theme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider
      value={{
        ...navigationTheme,
        colors: {
          ...navigationTheme.colors,
          background: colors.bg,
          card: colors.surface,
          text: colors.text,
          border: colors.border,
          primary: colors.accent,
        },
      }}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
        <Stack.Protected guard={!hasSelectedLanguage && !onboardingCompleted}>
          <Stack.Screen name="splash" />
        </Stack.Protected>

        <Stack.Protected guard={!onboardingCompleted}>
          <Stack.Screen name="language" />
          <Stack.Screen name="onboarding" />
        </Stack.Protected>

        <Stack.Protected guard={onboardingCompleted}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}
