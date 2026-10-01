import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { getRuleSections } from '@/features/rules/rule-catalog';
import { getProductCopy } from '@/i18n/product-copy';
import { useTheme } from '@/hooks/use-theme';
import { useAppSettings } from '@/store/app-settings';

export default function RulesRoute() {
  const { lang } = useAppSettings();
  const copy = getProductCopy(lang).rules;
  const colors = useTheme();
  const sections = getRuleSections(lang);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <ThemedText type="smallBold" style={{ color: colors.accent }}>{copy.eyebrow}</ThemedText>
          <ThemedText type="title">{copy.title}</ThemedText>
          <ThemedText themeColor="textSecondary">{copy.subtitle}</ThemedText>
        </View>

        {sections.map((section) => (
          <Pressable
            key={section.id}
            onPress={() => router.push({ pathname: '/rule-detail' as any, params: { id: section.id } })}
            style={({ pressed }) => [styles.card, { backgroundColor: colors.surface, opacity: pressed ? 0.84 : 1 }]}>
            <View style={[styles.number, { backgroundColor: colors.accentSoft }]}> 
              <ThemedText type="smallBold" style={{ color: colors.accentSoftText }}>{String(section.number).padStart(2, '0')}</ThemedText>
            </View>
            <View style={styles.cardText}>
              <ThemedText type="smallBold">{section.title}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>{section.summary}</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={19} color={colors.textTertiary} />
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 44, gap: 10 },
  header: { gap: 6, paddingBottom: 8 },
  card: { minHeight: 82, borderRadius: 20, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 11 },
  number: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  cardText: { flex: 1, gap: 3 },
});
