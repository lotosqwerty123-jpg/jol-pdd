import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { router } from 'expo-router';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppSettings } from '@/store/app-settings';

export default function OnboardingRoute() {
  const { dict, profile, updateProfile, finishOnboarding } = useAppSettings();
  const colors = useTheme();
  const [name, setName] = useState(profile.name);

  return (
    <Screen>
      <View style={styles.content}>
        <ThemedText type="title">{dict.onboarding.name.title}</ThemedText>
        <ThemedText themeColor="textSecondary">{dict.onboarding.name.subtitle}</ThemedText>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={dict.onboarding.name.placeholder}
          placeholderTextColor={colors.textTertiary}
          style={[
            styles.input,
            {
              color: colors.text,
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        />
        <ThemedText type="small" themeColor="textTertiary">
          {dict.onboarding.hint}
        </ThemedText>
        <AppButton
          label={dict.onboarding.ctaFinish}
          onPress={() => {
            updateProfile({ name: name.trim() });
            finishOnboarding();
            router.replace('/');
          }}
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
  input: {
    borderWidth: 1,
    borderRadius: 16,
    minHeight: 52,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
  },
});
