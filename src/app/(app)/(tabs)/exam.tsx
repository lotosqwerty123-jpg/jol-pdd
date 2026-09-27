import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { Spacing } from '@/constants/theme';
import { useAppSettings } from '@/store/app-settings';

export default function ExamHubRoute() {
  const { dict } = useAppSettings();

  return (
    <Screen>
      <View style={styles.content}>
        <ThemedText type="title">{dict.examHub.title}</ThemedText>
        <ThemedText themeColor="textSecondary">{dict.examHub.subtitle}</ThemedText>
        <AppButton label={dict.examHub.mockTitle} onPress={() => router.push('/mock-exam')} />
        <AppButton
          label={dict.examHub.resultTitle}
          variant="secondary"
          onPress={() => router.push('/exam-result')}
        />
        <AppButton
          label={dict.examHub.mistakesTitle}
          variant="secondary"
          onPress={() => router.push('/mistake-review')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.two,
  },
});
