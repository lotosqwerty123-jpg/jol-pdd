import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { getProductCopy } from '@/i18n/product-copy';
import { useTheme } from '@/hooks/use-theme';
import { useAppSettings } from '@/store/app-settings';

type Props = {
  sourceLabel: string;
  sourceUrl: string;
  sectionTitle: string;
};

export function RuleSourceSheet({ sourceLabel, sourceUrl, sectionTitle }: Props) {
  const { lang, effectiveNetwork } = useAppSettings();
  const copy = getProductCopy(lang).rules;
  const colors = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [opening, setOpening] = useState(false);
  const online = effectiveNetwork === 'online';

  async function openSource() {
    if (opening || !online) return;
    setOpening(true);
    try {
      await Linking.openURL(sourceUrl);
    } finally {
      setOpening(false);
    }
  }

  return (
    <View style={[styles.shell, { backgroundColor: colors.surface2, borderColor: colors.border }]}> 
      <Pressable onPress={() => setExpanded((current) => !current)} style={({ pressed }) => [styles.summaryRow, { opacity: pressed ? 0.82 : 1 }]}> 
        <View style={[styles.iconWrap, { backgroundColor: online ? colors.accentSoft : colors.warningSoft }]}> 
          <Ionicons
            name={online ? 'shield-checkmark-outline' : 'cloud-offline-outline'}
            size={18}
            color={online ? colors.accentSoftText : colors.warningSoftText}
          />
        </View>
        <View style={styles.flex}>
          <ThemedText type="smallBold">{copy.source}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>{sourceLabel}</ThemedText>
        </View>
        <View style={[styles.networkDot, { backgroundColor: online ? colors.accent : effectiveNetwork === 'offline' ? colors.warning : colors.textTertiary }]} />
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textTertiary} />
      </Pressable>

      {expanded ? (
        <View style={[styles.expanded, { borderTopColor: colors.border }]}> 
          <ThemedText type="small" themeColor="textSecondary">{copy.sourceDescription(sectionTitle)}</ThemedText>

          {online ? (
            <Pressable
              onPress={() => void openSource()}
              style={({ pressed }) => [styles.openButton, { backgroundColor: colors.accent, opacity: pressed || opening ? 0.78 : 1 }]}> 
              <Ionicons name="open-outline" size={18} color={colors.accentForeground} />
              <ThemedText type="smallBold" style={{ color: colors.accentForeground }}>{opening ? copy.checking : copy.openSource}</ThemedText>
            </Pressable>
          ) : (
            <View style={[styles.offlineHint, { backgroundColor: colors.warningSoft }]}> 
              <Ionicons name="wifi-outline" size={18} color={colors.warningSoftText} />
              <ThemedText type="small" style={[styles.flex, { color: colors.warningSoftText }]}>{copy.noInternetBody}</ThemedText>
            </View>
          )}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: { borderWidth: 1, borderRadius: 20, overflow: 'hidden' },
  summaryRow: { minHeight: 64, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconWrap: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  networkDot: { width: 7, height: 7, borderRadius: 4 },
  flex: { flex: 1, gap: 2 },
  expanded: { borderTopWidth: 1, padding: 13, gap: 12 },
  openButton: { minHeight: 48, borderRadius: 999, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  offlineHint: { minHeight: 48, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 8 },
});
