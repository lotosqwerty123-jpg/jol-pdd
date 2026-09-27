import { Pressable, StyleSheet, type PressableProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type AppButtonProps = PressableProps & {
  label: string;
  variant?: 'primary' | 'secondary';
};

export function AppButton({ label, variant = 'primary', style, ...rest }: AppButtonProps) {
  const colors = useTheme();
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      style={(state) => [
        styles.button,
        {
          backgroundColor: isPrimary ? colors.accent : colors.surface2,
          opacity: state.pressed ? 0.88 : 1,
        },
        typeof style === 'function' ? style(state) : style,
      ]}
      {...rest}>
      <ThemedText
        type="smallBold"
        style={{ color: isPrimary ? colors.accentForeground : colors.text }}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
});
