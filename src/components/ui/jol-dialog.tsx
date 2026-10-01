import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef } from 'react';
import { Animated, Modal, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type DialogTone = 'warning' | 'danger' | 'info';
type ConfirmTone = 'danger' | 'warning' | 'accent';

type Props = {
  visible: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel?: string;
  tone?: DialogTone;
  confirmTone?: ConfirmTone;
  onConfirm: () => void;
  onCancel?: () => void;
};

export function JolDialog({
  visible,
  title,
  body,
  confirmLabel,
  cancelLabel,
  tone = 'warning',
  confirmTone = 'accent',
  onConfirm,
  onCancel,
}: Props) {
  const colors = useTheme();
  const scale = useRef(new Animated.Value(0.94)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;
    scale.setValue(0.94);
    opacity.setValue(0);
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, friction: 8, tension: 95, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 170, useNativeDriver: true }),
    ]).start();
  }, [opacity, scale, visible]);

  const toneColor = tone === 'danger' ? colors.danger : tone === 'info' ? colors.accent : colors.warning;
  const toneSoft = tone === 'danger' ? colors.dangerSoft : tone === 'info' ? colors.accentSoft : colors.warningSoft;
  const toneSoftText = tone === 'danger' ? colors.dangerSoftText : tone === 'info' ? colors.accentSoftText : colors.warningSoftText;
  const icon = tone === 'danger' ? 'trash-outline' : tone === 'info' ? 'cloud-outline' : 'warning-outline';

  const confirmBackground = confirmTone === 'danger' ? colors.danger : confirmTone === 'warning' ? colors.warning : colors.accent;
  const confirmForeground = confirmTone === 'danger' ? colors.dangerForeground : confirmTone === 'warning' ? colors.warningForeground : colors.accentForeground;

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel ?? onConfirm}>
      <View style={styles.root}>
        <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: colors.overlay }]} onPress={onCancel ?? onConfirm} />
        <Animated.View
          style={[
            styles.card,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              opacity,
              transform: [{ scale }],
            },
          ]}>
          <View style={styles.headingRow}>
            <View style={[styles.iconWrap, { backgroundColor: toneSoft, borderColor: toneColor }]}> 
              <Ionicons name={icon} size={22} color={toneSoftText} />
            </View>
            <View style={styles.flex}>
              <ThemedText type="subtitle" style={{ color: tone === 'info' ? colors.text : toneSoftText }}>
                {title}
              </ThemedText>
            </View>
          </View>

          <ThemedText themeColor="textSecondary">{body}</ThemedText>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.actions}>
            {cancelLabel && onCancel ? (
              <Pressable
                accessibilityRole="button"
                onPress={onCancel}
                style={({ pressed }) => [
                  styles.button,
                  styles.secondary,
                  { backgroundColor: colors.warningSoft, opacity: pressed ? 0.78 : 1 },
                ]}>
                <ThemedText type="smallBold" style={{ color: colors.warningSoftText }}>
                  {cancelLabel}
                </ThemedText>
              </Pressable>
            ) : null}

            <Pressable
              accessibilityRole="button"
              onPress={onConfirm}
              style={({ pressed }) => [
                styles.button,
                styles.primary,
                { backgroundColor: confirmBackground, opacity: pressed ? 0.82 : 1 },
              ]}>
              <ThemedText type="smallBold" style={{ color: confirmForeground }}>
                {confirmLabel}
              </ThemedText>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  card: {
    borderWidth: 1,
    borderRadius: 28,
    padding: 18,
    gap: 14,
    shadowColor: '#000000',
    shadowOpacity: 0.28,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 14 },
    elevation: 18,
  },
  headingRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconWrap: { width: 46, height: 46, borderRadius: 15, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  divider: { height: 1 },
  actions: { flexDirection: 'row', gap: 9 },
  button: { minHeight: 48, borderRadius: 999, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
  secondary: { flex: 0.9 },
  primary: { flex: 1.15 },
  flex: { flex: 1 },
});
