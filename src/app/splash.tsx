import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppSettings } from '@/store/app-settings';

export default function SplashRoute() {
  const { dict } = useAppSettings();
  const colors = useTheme();

  return (
    <Screen>
      <View style={styles.content}>
        <View style={[styles.logo, { backgroundColor: colors.accent }]}>
          <ThemedText type="subtitle" style={{ color: colors.accentForeground }}>
            JOL
          </ThemedText>
        </View>
        <ThemedText type="small" themeColor="textSecondary">
          {dict.splash.tagline}
        </ThemedText>
        <AppButton
          label={dict.common.continue}
          onPress={() => {
            router.replace('/language');
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.four,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
