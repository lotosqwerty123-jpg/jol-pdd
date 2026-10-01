import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { StrictCameraPreview } from '@/components/exam/strict-camera-preview';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { getProductCopy } from '@/i18n/product-copy';
import { useTheme } from '@/hooks/use-theme';
import { useAppSettings } from '@/store/app-settings';

export default function StrictExamRoute() {
  const { lang } = useAppSettings();
  const colors = useTheme();
  const copy = getProductCopy(lang).strict;
  const [cameraReady, setCameraReady] = useState(false);
  const onReadyChange = useCallback((value: boolean) => setCameraReady(value), []);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.back,
            { backgroundColor: colors.surface2, opacity: pressed ? 0.72 : 1 },
          ]}>
          <Ionicons name="chevron-back" size={19} color={colors.text} />
          <ThemedText type="smallBold">{copy.back}</ThemedText>
        </Pressable>

        <View style={styles.header}>
          <View style={styles.eyebrowRow}>
            <View style={[styles.eyebrowDot, { backgroundColor: colors.warning }]} />
            <ThemedText type="smallBold" style={{ color: colors.warning }}>
              {copy.eyebrow}
            </ThemedText>
          </View>
          <ThemedText type="title">{copy.title}</ThemedText>
          <ThemedText themeColor="textSecondary">{copy.body}</ThemedText>
        </View>

        <View style={styles.protocolRow}>
          <ProtocolChip icon="help-outline" value="20" />
          <ProtocolChip icon="time-outline" value="25:00" />
          <ProtocolChip icon="checkmark-circle-outline" value="18+" />
        </View>

        <StrictCameraPreview copy={copy} onReadyChange={onReadyChange} />

        <View style={[styles.info, { backgroundColor: colors.surface2 }]}> 
          <View style={[styles.shield, { backgroundColor: colors.accentSoft }]}>
            <Ionicons name="shield-checkmark-outline" size={19} color={colors.accentSoftText} />
          </View>
          <ThemedText type="small" themeColor="textSecondary" style={styles.flex}>
            {copy.privacy}
          </ThemedText>
        </View>

        <AppButton
          label={copy.start}
          disabled={!cameraReady}
          onPress={() => router.replace({ pathname: '/mock-exam', params: { mode: 'strict' } })}
          style={!cameraReady ? { opacity: 0.45 } : undefined}
        />
      </ScrollView>
    </Screen>
  );
}

function ProtocolChip({ icon, value }: { icon: keyof typeof Ionicons.glyphMap; value: string }) {
  const colors = useTheme();
  return (
    <View style={[styles.protocolChip, { backgroundColor: colors.surface2 }]}> 
      <Ionicons name={icon} size={16} color={colors.warning} />
      <ThemedText type="smallBold">{value}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 44, gap: 16 },
  back: { minHeight: 38, borderRadius: 13, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start' },
  header: { gap: 7 },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  eyebrowDot: { width: 6, height: 6, borderRadius: 3 },
  protocolRow: { flexDirection: 'row', gap: 8 },
  protocolChip: { flex: 1, minHeight: 42, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  info: { borderRadius: 20, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 10 },
  shield: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  flex: { flex: 1, gap: 2 },
});
