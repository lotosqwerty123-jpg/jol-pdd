import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppSettings } from '@/store/app-settings';

export default function LanguageRoute() {
  const { dict, lang, selectLanguage } = useAppSettings();
  const colors = useTheme();

  return (
    <Screen>
      <View style={styles.content}>
        <ThemedText type="title">{dict.language.title}</ThemedText>

        <ThemedText themeColor="textSecondary">
          {dict.language.subtitle}
        </ThemedText>

        <View style={styles.list}>
          {dict.language.options.map((option) => {
            const selected = option.id === lang;

            return (
              <Pressable
                key={option.id}
                onPress={() => {
                  selectLanguage(option.id);
                }}
                style={({ pressed }) => [
                  styles.option,
                  {
                    backgroundColor: pressed
                      ? colors.surfacePressed
                      : colors.surface,
                    borderColor: selected ? colors.accent : colors.border,
                  },
                ]}>
                <ThemedText type="smallBold">{option.title}</ThemedText>

                <ThemedText type="small" themeColor="textSecondary">
                  {option.subtitle}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>

        <AppButton
          label={`${dict.common.next} →`}
          onPress={() => router.push('/onboarding')}
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
  list: {
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  option: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    gap: Spacing.one,
  },
});