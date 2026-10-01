import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { getProductCopy } from '@/i18n/product-copy';
import { useAppSettings } from '@/store/app-settings';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  style?: ViewStyle;
  iconOnly?: boolean;
};

export function NetworkStatusPill({ style, iconOnly = false }: Props) {
  const { lang, effectiveNetwork } = useAppSettings();
  const colors = useTheme();
  const copy = getProductCopy(lang).network;

  const online = effectiveNetwork === 'online';
  const checking = effectiveNetwork === 'checking';
  const label = online ? copy.online : checking ? copy.checking : copy.offline;
  const icon = online ? 'cloud-done-outline' : checking ? 'sync-outline' : 'cloud-offline-outline';
  const color = online ? colors.accent : checking ? colors.textTertiary : colors.warning;
  const backgroundColor = online ? colors.accentSoft : checking ? colors.surface2 : colors.warningSoft;

  return (
    <View
      accessibilityLabel={label}
      style={[
        iconOnly ? styles.iconOnly : styles.pill,
        { backgroundColor },
        style,
      ]}>
      <Ionicons name={icon} size={iconOnly ? 15 : 16} color={color} />
      {!iconOnly ? (
        <ThemedText type="smallBold" numberOfLines={1} style={{ color }}>
          {label}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    minHeight: 32,
    maxWidth: 126,
    borderRadius: 999,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  iconOnly: {
    width: 28,
    height: 28,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
