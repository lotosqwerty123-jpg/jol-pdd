import { Stack } from 'expo-router';

import { getFlowCopy } from '@/i18n/flow-copy';
import { useAppSettings } from '@/store/app-settings';

export default function AppLayout() {
  const { colors, dict, lang } = useAppSettings();
  const flowCopy = getFlowCopy(lang);

  return (
    <Stack
      screenOptions={{
        animation: 'fade_from_bottom',
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
      <Stack.Screen name="rules" options={{ title: flowCopy.stack.rules }} />
      <Stack.Screen name="rule-detail" options={{ title: flowCopy.stack.rule }} />
      <Stack.Screen name="strict-exam" options={{ headerShown: false }} />
    </Stack>
  );
}
