import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { NetworkStatusPill } from '@/components/network-status-pill';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { JolDialog } from '@/components/ui/jol-dialog';
import { QUESTION_BANK } from '@/features/questions/question-bank';
import { getReadinessPercent } from '@/features/learning/learning-utils';
import { DRIVING_CATEGORIES } from '@/features/rules/rule-catalog';
import { getProductCopy } from '@/i18n/product-copy';
import { useTheme } from '@/hooks/use-theme';
import { useAppSettings } from '@/store/app-settings';
import type { JolTheme } from '@/theme/colors';

const GOALS = [10, 15, 20, 30];
type DialogKind = 'reset' | 'replay' | 'noInternet' | null;

export default function ProfileRoute() {
  const {
    profile,
    learning,
    lang,
    theme,
    setLang,
    setTheme,
    updateProfile,
    resetLearning,
    resetAll,
    dict,
    networkState,
    effectiveNetwork,
    isForcedOffline,
    setConnectionMode,
  } = useAppSettings();
  const colors = useTheme();
  const product = getProductCopy(lang);
  const copy = product.profile;
  const networkCopy = product.network;
  const [dialog, setDialog] = useState<DialogKind>(null);

  const readiness = getReadinessPercent(learning, QUESTION_BANK.length);
  const best = learning.examHistory.reduce((max, item) => Math.max(max, item.score), 0);
  const initials = profile.name.trim() ? profile.name.trim().slice(0, 2).toUpperCase() : 'J';
  const dateLocale = lang === 'ru' ? 'ru-RU' : lang === 'ky' ? 'ky-KG' : 'en-US';
  const onlineAvailable = networkState === 'online';
  const onlineActive = effectiveNetwork === 'online';
  const connectionHint = isForcedOffline
    ? networkCopy.forcedOfflineHint
    : onlineAvailable
      ? networkCopy.onlineHint
      : networkCopy.autoOfflineHint;

  function activateOnline() {
    if (!onlineAvailable) {
      setDialog('noInternet');
      return;
    }
    setConnectionMode('online');
  }

  function runDialogAction() {
    if (dialog === 'reset') {
      resetLearning();
      setDialog(null);
      return;
    }
    if (dialog === 'replay') {
      setDialog(null);
      resetAll();
      router.replace('/splash');
      return;
    }
    setDialog(null);
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <ThemedText type="smallBold" style={{ color: colors.accent }}>{copy.eyebrow}</ThemedText>
          <ThemedText type="title">{copy.title}</ThemedText>
          <ThemedText themeColor="textSecondary">{copy.subtitle}</ThemedText>
        </View>

        <View style={[styles.hero, { backgroundColor: colors.surface, borderColor: colors.border }]}> 
          <View style={styles.avatarWrap}>
            <View style={[styles.avatar, { backgroundColor: colors.accentSoft }]}> 
              <ThemedText style={[styles.initials, { color: colors.accentSoftText }]}>{initials}</ThemedText>
            </View>
            <NetworkStatusPill iconOnly style={styles.avatarStatus} />
          </View>
          <View style={styles.flex}>
            <ThemedText type="subtitle">{profile.name || copy.defaultName}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {copy.category} {profile.category ?? 'B'} · {profile.examDateUnknown || !profile.examDate ? copy.noDate : profile.examDate}
            </ThemedText>
          </View>
          <View style={[styles.readinessBadge, { backgroundColor: colors.accentSoft }]}> 
            <ThemedText type="smallBold" style={{ color: colors.accentSoftText }}>{readiness}%</ThemedText>
          </View>
        </View>

        <View style={styles.metrics}>
          <Metric label={copy.attempts} value={`${learning.examHistory.length}`} />
          <Metric label={copy.best} value={best ? `${best}/20` : '—'} />
          <Metric label={copy.mistakes} value={`${learning.wrongQuestionIds.length}`} />
        </View>

        <Section title={networkCopy.title}>
          <View style={styles.connectionTop}>
            <NetworkStatusPill />
            <ThemedText type="small" themeColor="textSecondary" style={styles.flex}>{connectionHint}</ThemedText>
          </View>

          <View style={styles.connectionModes}>
            <ConnectionChoice
              icon="cloud-offline-outline"
              label={networkCopy.offlineMode}
              selected={!onlineActive}
              tone="warning"
              onPress={() => setConnectionMode('offline')}
            />
            <ConnectionChoice
              icon="cloud-done-outline"
              label={networkCopy.onlineMode}
              selected={onlineActive}
              tone="accent"
              onPress={activateOnline}
            />
          </View>

          <ThemedText type="small" themeColor="textTertiary">{networkCopy.offlineHint}</ThemedText>
        </Section>

        <Section title={copy.personal}>
          <FieldLabel text={copy.name} />
          <TextInput
            value={profile.name}
            onChangeText={(name) => updateProfile({ name })}
            placeholder={copy.name}
            placeholderTextColor={colors.textTertiary}
            selectionColor={colors.accent}
            style={[styles.input, { color: colors.text, backgroundColor: colors.surface2, borderColor: colors.border }]}
          />

          <FieldLabel text={copy.category} />
          <View style={styles.chips}>
            {DRIVING_CATEGORIES.map((value) => (
              <ChoiceChip key={value} label={value} selected={profile.category === value} onPress={() => updateProfile({ category: value })} />
            ))}
          </View>

          <FieldLabel text={copy.examDate} />
          <TextInput
            value={profile.examDate ?? ''}
            onChangeText={(examDate) => updateProfile({ examDate, examDateUnknown: !examDate.trim() })}
            placeholder="15.10.2026"
            placeholderTextColor={colors.textTertiary}
            selectionColor={colors.accent}
            style={[styles.input, { color: colors.text, backgroundColor: colors.surface2, borderColor: colors.border }]}
          />

          <FieldLabel text={copy.pace} />
          <View style={styles.chips}>
            {GOALS.map((minutes) => (
              <ChoiceChip key={minutes} label={`${minutes} ${copy.minDay}`} selected={(profile.dailyMinutes ?? 15) === minutes} onPress={() => updateProfile({ dailyMinutes: minutes })} />
            ))}
          </View>
        </Section>

        <Section title={copy.language}>
          <View style={styles.chips}>
            {dict.language.options.map((option) => (
              <ChoiceChip key={option.id} label={option.title} selected={lang === option.id} onPress={() => setLang(option.id)} />
            ))}
          </View>
        </Section>

        <Section title={copy.appearance}>
          <View style={styles.chips}>
            {(['dark', 'light'] as JolTheme[]).map((value) => (
              <ChoiceChip key={value} label={value === 'dark' ? copy.dark : copy.light} selected={theme === value} onPress={() => setTheme(value)} />
            ))}
          </View>
        </Section>

        <Section title={copy.history}>
          {learning.examHistory.length ? learning.examHistory.slice(0, 4).map((attempt) => (
            <Pressable
              key={attempt.id}
              onPress={() => router.push({ pathname: '/exam-result', params: { attemptId: attempt.id } })}
              style={({ pressed }) => [styles.historyRow, { borderBottomColor: colors.border, opacity: pressed ? 0.75 : 1 }]}> 
              <View style={[styles.historyIcon, { backgroundColor: attempt.passed ? colors.accentSoft : colors.dangerSoft }]}> 
                <Ionicons name={attempt.mode === 'strict' ? 'videocam-outline' : 'clipboard-outline'} size={17} color={attempt.passed ? colors.accent : colors.danger} />
              </View>
              <View style={styles.flex}>
                <ThemedText type="smallBold">{attempt.mode === 'strict' ? product.exam.strictLabel : product.exam.normalLabel} · {attempt.score}/{attempt.total}</ThemedText>
                <ThemedText type="small" themeColor="textTertiary">{new Date(attempt.createdAt).toLocaleDateString(dateLocale)}</ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
            </Pressable>
          )) : <ThemedText themeColor="textSecondary">{copy.noHistory}</ThemedText>}
        </Section>

        <View style={styles.resetActions}>
          <AppButton label={copy.resetProgress} variant="warning" onPress={() => setDialog('reset')} />
          <AppButton label={copy.replay} variant="danger" onPress={() => setDialog('replay')} />
        </View>
      </ScrollView>

      <JolDialog
        visible={dialog === 'reset'}
        title={copy.resetTitle}
        body={copy.resetBody}
        cancelLabel={copy.resetCancel}
        confirmLabel={copy.resetConfirm}
        tone="warning"
        confirmTone="warning"
        onCancel={() => setDialog(null)}
        onConfirm={runDialogAction}
      />
      <JolDialog
        visible={dialog === 'replay'}
        title={copy.replayTitle}
        body={copy.replayBody}
        cancelLabel={copy.resetCancel}
        confirmLabel={copy.replayConfirm}
        tone="danger"
        confirmTone="danger"
        onCancel={() => setDialog(null)}
        onConfirm={runDialogAction}
      />
      <JolDialog
        visible={dialog === 'noInternet'}
        title={networkCopy.noInternetTitle}
        body={networkCopy.noInternetBody}
        confirmLabel={networkCopy.dismiss}
        tone="info"
        confirmTone="accent"
        onConfirm={runDialogAction}
      />
    </Screen>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const colors = useTheme();
  return <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}><ThemedText type="smallBold" style={{ color: colors.accent }}>{title.toUpperCase()}</ThemedText>{children}</View>;
}

function FieldLabel({ text }: { text: string }) {
  return <ThemedText type="small" themeColor="textSecondary">{text}</ThemedText>;
}

function Metric({ label, value }: { label: string; value: string }) {
  const colors = useTheme();
  return <View style={[styles.metric, { backgroundColor: colors.surface2 }]}><ThemedText type="subtitle">{value}</ThemedText><ThemedText type="small" themeColor="textTertiary">{label}</ThemedText></View>;
}

function ChoiceChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  const colors = useTheme();
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.chip, { backgroundColor: selected ? colors.accentSoft : pressed ? colors.surfacePressed : colors.surface2, borderColor: selected ? colors.accent : colors.border }]}>
      <ThemedText type="smallBold" style={{ color: selected ? colors.accentSoftText : colors.text }}>{label}</ThemedText>
    </Pressable>
  );
}

function ConnectionChoice({
  icon,
  label,
  selected,
  tone,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  selected: boolean;
  tone: 'accent' | 'warning';
  onPress: () => void;
}) {
  const colors = useTheme();
  const active = tone === 'accent' ? colors.accent : colors.warning;
  const soft = tone === 'accent' ? colors.accentSoft : colors.warningSoft;
  const softText = tone === 'accent' ? colors.accentSoftText : colors.warningSoftText;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.connectionChoice,
        {
          backgroundColor: selected ? soft : colors.surface2,
          borderColor: selected ? active : colors.border,
          opacity: pressed ? 0.8 : 1,
        },
      ]}>
      <Ionicons name={icon} size={18} color={selected ? softText : colors.textSecondary} />
      <ThemedText type="smallBold" style={{ color: selected ? softText : colors.text }}>{label}</ThemedText>
      {selected ? <View style={[styles.activeDot, { backgroundColor: active }]} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 116, gap: 14 },
  header: { gap: 5, paddingTop: 4 },
  hero: { borderWidth: 1, borderRadius: 24, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarWrap: { position: 'relative' },
  avatar: { width: 58, height: 58, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  avatarStatus: { position: 'absolute', right: -7, top: -7, borderWidth: 2, borderColor: 'transparent' },
  initials: { fontSize: 22, lineHeight: 26, fontWeight: '800' },
  readinessBadge: { minWidth: 54, minHeight: 36, borderRadius: 999, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 9 },
  metrics: { flexDirection: 'row', gap: 8 },
  metric: { flex: 1, minHeight: 72, borderRadius: 18, padding: 11, justifyContent: 'center', gap: 1 },
  section: { borderWidth: 1, borderRadius: 22, padding: 15, gap: 10 },
  connectionTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  connectionModes: { flexDirection: 'row', gap: 9 },
  connectionChoice: { flex: 1, minHeight: 50, borderWidth: 1, borderRadius: 17, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  activeDot: { width: 6, height: 6, borderRadius: 999 },
  input: { minHeight: 50, borderWidth: 1, borderRadius: 16, paddingHorizontal: 13, fontSize: 16 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  historyRow: { minHeight: 58, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  historyIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  resetActions: { gap: 10, paddingTop: 2 },
  flex: { flex: 1, gap: 2 },
});
