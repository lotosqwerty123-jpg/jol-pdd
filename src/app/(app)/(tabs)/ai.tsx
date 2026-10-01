import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { NetworkStatusPill } from '@/components/network-status-pill';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { answerOfflineRuleQuestion } from '@/features/rules/offline-guide';
import { getRuleSection } from '@/features/rules/rule-catalog';
import { getProductCopy } from '@/i18n/product-copy';
import { useTheme } from '@/hooks/use-theme';
import { useAppSettings } from '@/store/app-settings';

export default function AiTutorRoute() {
  const { lang, effectiveNetwork } = useAppSettings();
  const colors = useTheme();
  const copy = getProductCopy(lang).ai;
  const [query, setQuery] = useState('');
  const [askedQuery, setAskedQuery] = useState('');

  const answer = useMemo(() => answerOfflineRuleQuestion(askedQuery, lang), [askedQuery, lang]);
  const related = useMemo(
    () => answer.suggestedSectionIds
      .filter((id) => id !== answer.sectionId)
      .map((id) => getRuleSection(id, lang))
      .filter((section): section is NonNullable<typeof section> => Boolean(section)),
    [answer, lang],
  );


  function ask(value = query) {
    const next = value.trim();
    if (!next) return;
    setQuery(next);
    setAskedQuery(next);
    Keyboard.dismiss();
  }

  const networkHint = effectiveNetwork === 'online' ? copy.networkOnlineHint : copy.networkOfflineHint;


  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <ThemedText type="smallBold" style={{ color: colors.accent }}>{copy.eyebrow}</ThemedText>
            <NetworkStatusPill />
          </View>
          <ThemedText type="title">{copy.title}</ThemedText>
          <ThemedText themeColor="textSecondary">{copy.subtitle}</ThemedText>
        </View>

        <View style={[styles.scope, { backgroundColor: colors.surface2, borderColor: colors.border }]}>
          <Ionicons name="library-outline" size={19} color={colors.accent} />
          <View style={styles.flex}>
            <ThemedText type="smallBold">{copy.offlineScope}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">{networkHint}</ThemedText>
          </View>
        </View>

        <View style={[styles.inputWrap, { backgroundColor: colors.surface, borderColor: colors.border }]}> 
          <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.textTertiary} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={() => ask()}
            returnKeyType="send"
            placeholder={copy.placeholder}
            placeholderTextColor={colors.textTertiary}
            selectionColor={colors.accent}
            style={[styles.input, { color: colors.text }]}
          />
          <Pressable
            onPress={() => ask()}
            style={({ pressed }) => [styles.send, { backgroundColor: colors.accent, opacity: pressed ? 0.8 : 1 }]}>
            <Ionicons name="arrow-up" size={18} color={colors.accentForeground} />
          </Pressable>
        </View>

        <View style={styles.quickRow}>
          {copy.quick.map((item) => (
            <Pressable
              key={item}
              onPress={() => ask(item)}
              style={({ pressed }) => [styles.quick, { backgroundColor: colors.surface2, opacity: pressed ? 0.82 : 1 }]}>
              <ThemedText type="small">{item}</ThemedText>
            </Pressable>
          ))}
        </View>

        {askedQuery ? (
          <View style={[styles.answerCard, { backgroundColor: colors.surface }]}> 
            <View style={styles.answerHead}>
              <View style={[styles.answerIcon, { backgroundColor: colors.warningSoft }]}>
                <Ionicons
                  name={answer.kind === 'multi' ? 'git-branch-outline' : 'navigate-outline'}
                  size={18}
                  color={colors.warningSoftText}
                />
              </View>
              <View style={styles.flex}>
                <ThemedText type="small" themeColor="textTertiary">{copy.question}</ThemedText>
                <ThemedText type="smallBold">{askedQuery}</ThemedText>
              </View>
            </View>

            <View style={[styles.answerBody, { backgroundColor: answer.kind === 'multi' ? colors.warningSoft : colors.surface2 }]}> 
              <ThemedText type="subtitle">{answer.title}</ThemedText>
              <ThemedText themeColor="textSecondary">{answer.text}</ThemedText>
            </View>

            {answer.sectionId ? (
              <Pressable
                onPress={() => router.push({ pathname: '/rule-detail' as any, params: { id: answer.sectionId } })}
                style={({ pressed }) => [styles.ruleButton, { borderColor: colors.accent, opacity: pressed ? 0.82 : 1 }]}>
                <Ionicons name="book-outline" size={18} color={colors.accent} />
                <ThemedText type="smallBold" style={{ color: colors.accent }}>{copy.openRule}</ThemedText>
              </Pressable>
            ) : null}
          </View>
        ) : null}

        {askedQuery && related.length > 0 ? (
          <View style={styles.related}>
            <ThemedText type="smallBold">{copy.related}</ThemedText>
            {related.map((section) => (
              <Pressable
                key={section.id}
                onPress={() => router.push({ pathname: '/rule-detail' as any, params: { id: section.id } })}
                style={({ pressed }) => [styles.relatedRow, { borderColor: colors.border, opacity: pressed ? 0.82 : 1 }]}>
                <ThemedText type="smallBold" style={styles.flex}>{section.title}</ThemedText>
                <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
              </Pressable>
            ))}
          </View>
        ) : null}

        <Pressable
          onPress={() => router.push('/rules' as any)}
          style={({ pressed }) => [styles.allRules, { borderColor: colors.accent, opacity: pressed ? 0.82 : 1 }]}>
          <Ionicons name="book-outline" size={18} color={colors.accent} />
          <ThemedText type="smallBold" style={{ color: colors.accent }}>{copy.allRules}</ThemedText>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 110, gap: 14 },
  header: { gap: 7, paddingTop: 4 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  scope: { minHeight: 60, borderWidth: 1, borderRadius: 19, paddingHorizontal: 13, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 9 },
  inputWrap: { minHeight: 60, borderWidth: 1, borderRadius: 20, paddingLeft: 14, paddingRight: 7, flexDirection: 'row', alignItems: 'center', gap: 9 },
  input: { flex: 1, fontSize: 16, paddingVertical: 0 },
  send: { width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  quickRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  quick: { borderRadius: 999, paddingHorizontal: 11, paddingVertical: 8 },
  answerCard: { borderRadius: 25, padding: 15, gap: 12 },
  answerHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  answerIcon: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  answerBody: { borderRadius: 18, padding: 14, gap: 5 },
  ruleButton: { minHeight: 50, borderWidth: 1, borderRadius: 999, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  related: { gap: 8 },
  relatedRow: { minHeight: 50, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  allRules: { minHeight: 52, borderWidth: 1, borderRadius: 999, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  flex: { flex: 1, gap: 2 },
});
