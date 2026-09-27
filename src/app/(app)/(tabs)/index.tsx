import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useAppSettings } from '@/store/app-settings';

export default function HomeRoute() {
  const { dict, profile } = useAppSettings();
  const name = profile.name.trim();

  return (
    <Screen>
      <View style={styles.content}>
        <ThemedText type="title">
          {dict.home.greeting}
          {name ? `, ${name}` : ''}
        </ThemedText>
        <ThemedText themeColor="textSecondary">{dict.home.destination}</ThemedText>
        <ThemedText type="small" themeColor="textTertiary">
          {dict.home.placeholder}
        </ThemedText>
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
