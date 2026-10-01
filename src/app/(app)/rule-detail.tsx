import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { RuleSourceSheet } from '@/components/rules/rule-source-sheet';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { getRuleSection } from '@/features/rules/rule-catalog';
import { getProductCopy } from '@/i18n/product-copy';
import { useTheme } from '@/hooks/use-theme';
import { useAppSettings } from '@/store/app-settings';

export default function RuleDetailRoute() {
  const params = useLocalSearchParams<{ id?: string }>();
  const { lang } = useAppSettings();
  const copy = getProductCopy(lang).rules;
  const colors = useTheme();
  const section = getRuleSection(params.id, lang);

  if (!section) {
    return <Screen><View style={styles.empty}><ThemedText type="title">{copy.notFound}</ThemedText><Pressable onPress={() => router.back()}><ThemedText style={{ color: colors.accent }}>{copy.back}</ThemedText></Pressable></View></Screen>;
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Pressable onPress={() => router.back()} style={styles.back}><Ionicons name="chevron-back" size={20} color={colors.text} /><ThemedText type="smallBold">{copy.back}</ThemedText></Pressable>
        <View style={styles.header}>
          <ThemedText type="smallBold" style={{ color: colors.accent }}>{copy.section} {section.number}</ThemedText>
          <ThemedText type="title">{section.title}</ThemedText>
          <ThemedText themeColor="textSecondary">{section.summary}</ThemedText>
        </View>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <ThemedText type="subtitle">{copy.main}</ThemedText>
          {section.highlights.map((item) => <View key={item} style={styles.bulletRow}><View style={[styles.dot, { backgroundColor: colors.accent }]} /><ThemedText style={styles.bulletText}>{item}</ThemedText></View>)}
        </View>
        <RuleSourceSheet sourceLabel={section.sourceLabel} sourceUrl={section.sourceUrl} sectionTitle={section.title} />
        <ThemedText type="small" themeColor="textTertiary">{copy.note}</ThemedText>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 44, gap: 16 },
  back: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start' },
  header: { gap: 7 },
  card: { borderWidth: 1, borderRadius: 24, padding: 17, gap: 13 },
  bulletRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  dot: { width: 7, height: 7, borderRadius: 4, marginTop: 8 },
  bulletText: { flex: 1 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
});
