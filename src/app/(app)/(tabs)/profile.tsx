import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppSettings } from '@/store/app-settings';
import type { JolTheme } from '@/theme/colors';

export default function ProfileRoute() {
  const { dict, profile, lang, theme, setLang, setTheme, resetOnboarding } = useAppSettings();
  const colors = useTheme();

  return (
    <Screen>
      <View style={styles.content}>
        <ThemedText type="title">{dict.profile.title}</ThemedText>
        <ThemedText themeColor="textSecondary">
          {dict.profile.name}: {profile.name || '—'}
        </ThemedText>

        <ThemedText type="smallBold">{dict.profile.language}</ThemedText>
        <View style={styles.row}>
          {dict.language.options.map((option) => (
            <ChoiceChip
              key={option.id}
              label={option.title}
              selected={lang === option.id}
              onPress={() => setLang(option.id)}
            />
          ))}
        </View>

        <ThemedText type="smallBold">{dict.profile.theme}</ThemedText>
        <View style={styles.row}>
          {(['dark', 'light'] as JolTheme[]).map((value) => (
            <ChoiceChip
              key={value}
              label={value === 'dark' ? dict.profile.dark : dict.profile.light}
              selected={theme === value}
              onPress={() => setTheme(value)}
            />
          ))}
        </View>

        <AppButton
          label={dict.profile.resetOnboarding}
          variant="secondary"
          onPress={() => {
            resetOnboarding();
            router.replace('/splash');
          }}
        />
        <ThemedText type="small" themeColor="textTertiary" style={{ color: colors.textTertiary }}>
          {dict.common.comingSoon}
        </ThemedText>
      </View>
    </Screen>
  );
}

function ChoiceChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const colors = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: selected ? colors.accentSoft : pressed ? colors.surfacePressed : colors.surface2,
          borderColor: selected ? colors.accent : colors.border,
        },
      ]}>
      <ThemedText type="smallBold" style={{ color: selected ? colors.accentSoftText : colors.text }}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
});
