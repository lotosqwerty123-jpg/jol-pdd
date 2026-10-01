import { Pressable, StyleSheet, type PressableProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type AppButtonProps = PressableProps & {
  label: string;
  variant?: 'primary' | 'secondary' | 'warning' | 'danger';
};

export function AppButton({ label, variant = 'primary', style, ...rest }: AppButtonProps) {
  const colors = useTheme();

  const palette =
    variant === 'primary'
      ? { backgroundColor: colors.accent, color: colors.accentForeground }
      : variant === 'warning'
        ? { backgroundColor: colors.warning, color: colors.warningForeground }
        : variant === 'danger'
          ? { backgroundColor: colors.danger, color: colors.dangerForeground }
          : { backgroundColor: colors.surface2, color: colors.text };

  return (
    <Pressable
      accessibilityRole="button"
      style={(state) => [
        styles.button,
        {
          backgroundColor: palette.backgroundColor,
          opacity: state.pressed ? 0.84 : rest.disabled ? 0.46 : 1,
        },
        typeof style === 'function' ? style(state) : style,
      ]}
      {...rest}>
      <ThemedText type="smallBold" style={[styles.label, { color: palette.color }]}>
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
  label: {
    textAlign: 'center',
    flexShrink: 1,
  },
});
