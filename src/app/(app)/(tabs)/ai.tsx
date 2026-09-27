import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useAppSettings } from '@/store/app-settings';

export default function AiTutorRoute() {
  const { dict } = useAppSettings();

  return (
    <Screen>
      <View style={styles.content}>
        <ThemedText type="title">{dict.aiTutor.title}</ThemedText>
        <ThemedText themeColor="textSecondary">{dict.aiTutor.placeholder}</ThemedText>
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
