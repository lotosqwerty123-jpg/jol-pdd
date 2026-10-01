import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { getProductCopy } from '@/i18n/product-copy';
import { useTheme } from '@/hooks/use-theme';
import { useAppSettings } from '@/store/app-settings';

export default function ExamHubRoute() {
  const { learning, lang } = useAppSettings();
  const colors = useTheme();
  const copy = getProductCopy(lang).exam;
  const latest = learning.examHistory[0];
  const best = learning.examHistory.reduce((max, item) => Math.max(max, item.score), 0);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <ThemedText type="smallBold" style={{ color: colors.accent }}>{copy.eyebrow}</ThemedText>
          <ThemedText type="title">{copy.title}</ThemedText>
          <ThemedText themeColor="textSecondary">{copy.subtitle}</ThemedText>
        </View>

        <ModeCard
          number="01"
          icon="clipboard-outline"
          title={copy.practiceTitle}
          body={copy.practiceBody}
          accent="accent"
          button={copy.practiceButton}
          onPress={() => router.push('/mock-exam')}
        />

        <ModeCard
          number="02"
          icon="videocam-outline"
          title={copy.strictTitle}
          body={copy.strictBody}
          accent="warning"
          badge={copy.beta}
          button={copy.strictButton}
          onPress={() => router.push('/strict-exam' as any)}
        />

        <View style={styles.statsRow}>
          <Stat value={`${learning.examHistory.length}`} label={copy.attemptsLabel} />
          <Stat value={best ? `${best}/20` : '—'} label={copy.bestLabel} />
          <Stat value={`${learning.wrongQuestionIds.length}`} label={copy.mistakesShort} />
        </View>

        {latest ? (
          <Pressable
            onPress={() => router.push({ pathname: '/exam-result', params: { attemptId: latest.id } })}
            style={({ pressed }) => [
              styles.historyCard,
              { backgroundColor: colors.surface2, opacity: pressed ? 0.88 : 1 },
            ]}>
            <View style={styles.historyTop}>
              <View style={styles.flex}>
                <ThemedText type="small" themeColor="textTertiary">{copy.latest}</ThemedText>
                <ThemedText type="subtitle">{latest.score}/{latest.total}</ThemedText>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: latest.passed ? colors.accentSoft : colors.dangerSoft }]}>
                <ThemedText type="smallBold" style={{ color: latest.passed ? colors.accentSoftText : colors.dangerSoftText }}>
                  {latest.passed ? copy.passed : copy.failed}
                </ThemedText>
              </View>
            </View>
            <ThemedText type="small" themeColor="textSecondary">{copy.historyHint}</ThemedText>
          </Pressable>
        ) : (
          <View style={[styles.historyCard, { backgroundColor: colors.surface2 }]}>
            <ThemedText type="small" themeColor="textTertiary">{copy.historyLabel}</ThemedText>
            <ThemedText themeColor="textSecondary">{copy.noHistory}</ThemedText>
          </View>
        )}

        <Pressable
          onPress={() => router.push('/mistake-review')}
          style={({ pressed }) => [
            styles.mistakesButton,
            { backgroundColor: colors.surface, opacity: pressed ? 0.88 : 1 },
          ]}>
          <Ionicons name="alert-circle-outline" size={20} color={colors.warning} />
          <View style={styles.flex}>
            <ThemedText type="smallBold">{copy.mistakes}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {learning.wrongQuestionIds.length ? copy.mistakesCount(learning.wrongQuestionIds.length) : copy.noMistakes}
            </ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

function ModeCard({ number, icon, title, body, button, badge, accent, onPress }: {
  number: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  body: string;
  button: string;
  badge?: string;
  accent: 'accent' | 'warning';
  onPress: () => void;
}) {
  const colors = useTheme();
  const color = accent === 'accent' ? colors.accent : colors.warning;
  const soft = accent === 'accent' ? colors.accentSoft : colors.warningSoft;

  return (
    <View style={[styles.modeCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={[styles.modeRail, { backgroundColor: color }]} />
      <View style={styles.modeTop}>
        <View style={[styles.modeIcon, { backgroundColor: soft }]}>
          <ThemedText type="smallBold" style={{ color }}>{number}</ThemedText>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <View style={styles.flex}>
          <View style={styles.titleRow}>
            <ThemedText type="subtitle">{title}</ThemedText>
            {badge ? <View style={[styles.beta, { borderColor: color }]}><ThemedText type="smallBold" style={{ color }}>{badge}</ThemedText></View> : null}
          </View>
          <ThemedText type="small" themeColor="textSecondary">{body}</ThemedText>
        </View>
      </View>
      <Pressable onPress={onPress} style={({ pressed }) => [styles.modeButton, { backgroundColor: color, opacity: pressed ? 0.82 : 1 }]}>
        <ThemedText type="smallBold" style={{ color: accent === 'accent' ? colors.accentForeground : colors.warningForeground }}>{button} →</ThemedText>
      </Pressable>
    </View>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  const colors = useTheme();
  return <View style={[styles.stat, { backgroundColor: colors.surface2 }]}><ThemedText type="subtitle">{value}</ThemedText><ThemedText type="small" themeColor="textTertiary" numberOfLines={1}>{label}</ThemedText></View>;
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 112, gap: 14 },
  header: { gap: 5, paddingTop: 4, paddingBottom: 2 },
  modeCard: { position: 'relative', borderWidth: 1, borderRadius: 26, padding: 16, gap: 14, overflow: 'hidden' },
  modeRail: { position: 'absolute', top: 14, bottom: 14, left: 0, width: 3, borderRadius: 999 },
  modeTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  modeIcon: { width: 58, height: 58, borderRadius: 18, alignItems: 'center', justifyContent: 'center', gap: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 },
  beta: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 7, paddingVertical: 2 },
  modeButton: { minHeight: 50, borderRadius: 999, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18 },
  statsRow: { flexDirection: 'row', gap: 8 },
  stat: { flex: 1, minHeight: 74, borderRadius: 18, padding: 11, justifyContent: 'center', gap: 1 },
  historyCard: { borderRadius: 21, padding: 15, gap: 7 },
  historyTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  statusBadge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  mistakesButton: { minHeight: 70, borderRadius: 20, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  flex: { flex: 1, gap: 2 },
});
