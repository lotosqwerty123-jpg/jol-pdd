import { Stack } from 'expo-router';

import { useAppSettings } from '@/store/app-settings';

export default function AppLayout() {
  const { colors, dict } = useAppSettings();

  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.text,
        headerStyle: { backgroundColor: colors.bg },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.bg },
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="explain" options={{ title: dict.explain.header }} />
      <Stack.Screen name="mock-exam" options={{ title: dict.mockExam.title }} />
      <Stack.Screen name="exam-result" options={{ title: dict.examResult.title }} />
      <Stack.Screen name="mistake-review" options={{ title: dict.mistakeReview.title }} />
    </Stack>
  );
}
