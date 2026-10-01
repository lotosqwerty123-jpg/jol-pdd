import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppBackdrop } from '@/components/app-backdrop';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function Screen({ children, ambience = true }: { children: ReactNode; ambience?: boolean }) {
  const colors = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      {ambience ? <AppBackdrop /> : null}
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  inner: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
});
