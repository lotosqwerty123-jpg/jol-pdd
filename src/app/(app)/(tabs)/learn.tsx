import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { Spacing } from '@/constants/theme';
import { useAppSettings } from '@/store/app-settings';

export default function LearnRoute() {
  const { dict } = useAppSettings();

  return (
    <Screen>
      <View style={styles.content}>
        <ThemedText type="title">{dict.question.title}</ThemedText>
        <ThemedText themeColor="textSecondary">{dict.question.placeholder}</ThemedText>
        <AppButton
          label={dict.question.openExplain}
          variant="secondary"
          onPress={() => router.push('/explain')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.three,
  },
});
