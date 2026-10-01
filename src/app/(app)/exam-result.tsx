import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { getProductCopy } from '@/i18n/product-copy';
import { useTheme } from '@/hooks/use-theme';
import { useAppSettings } from '@/store/app-settings';

export default function ExamResultRoute() {
  const { attemptId } = useLocalSearchParams<{ attemptId?: string }>();
  const { learning, lang } = useAppSettings();
  const colors = useTheme();
  const copy = getProductCopy(lang).exam;

  const attempt = learning.examHistory.find((item) => item.id === attemptId) ?? learning.examHistory[0];

  if (!attempt) {
    return (
      <Screen>
        <View style={styles.empty}>
          <ThemedText type="title">{copy.resultTitle}</ThemedText>
          <ThemedText themeColor="textSecondary">{copy.noHistory}</ThemedText>
          <AppButton label={copy.practiceButton} onPress={() => router.replace('/mock-exam')} />
        </View>
      </Screen>
    );
  }

  const percent = Math.round((attempt.score / attempt.total) * 100);
  const strict = attempt.mode === 'strict';

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <ThemedText type="smallBold" style={{ color: strict ? colors.warning : colors.accent }}>
            {strict ? copy.strictLabel : copy.normalLabel}
          </ThemedText>
          <ThemedText type="title">{copy.resultTitle}</ThemedText>
        </View>

        <View style={[styles.hero, { backgroundColor: attempt.passed ? colors.accentSoft : colors.dangerSoft, borderColor: attempt.passed ? colors.accent : colors.danger }]}>
          <View style={[styles.resultIcon, { backgroundColor: attempt.passed ? colors.accent : colors.danger }]}>
            <Ionicons name={attempt.passed ? 'checkmark' : 'close'} size={34} color={attempt.passed ? colors.accentForeground : colors.dangerForeground} />
          </View>

          <ThemedText type="smallBold" style={{ color: attempt.passed ? colors.accentSoftText : colors.dangerSoftText }}>
            {attempt.passed ? copy.resultPassed : copy.resultFailed}
          </ThemedText>
          <ThemedText style={styles.score}>{attempt.score}/{attempt.total}</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.centerText}>
            {attempt.passed ? copy.savedHint : copy.passHint}
          </ThemedText>
        </View>

        <View style={styles.metricRow}>
          <Metric label="%" value={`${percent}%`} />
          <Metric label={copy.mistakes} value={`${attempt.wrongQuestionIds.length}`} />
          <Metric label="18/20" value="18/20" />
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.infoRow}>
            <Ionicons name="save-outline" size={20} color={colors.accent} />
            <View style={styles.infoText}>
              <ThemedText type="smallBold">{copy.saved}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">{copy.savedHint}</ThemedText>
            </View>
          </View>
        </View>

        {attempt.wrongQuestionIds.length ? (
          <AppButton label={copy.review(attempt.wrongQuestionIds.length)} onPress={() => router.push({ pathname: '/mistake-review', params: { attemptId: attempt.id } })} />
        ) : null}

        <AppButton
          label={copy.retry}
          variant="secondary"
          onPress={() => strict ? router.replace('/strict-exam' as any) : router.replace('/mock-exam')}
        />
        <AppButton label={copy.home} variant="secondary" onPress={() => router.replace('/')} />
      </ScrollView>
    </Screen>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  const colors = useTheme();
  return (
    <View style={[styles.metric, { backgroundColor: colors.surface2, borderColor: colors.border }]}>
      <ThemedText type="small" themeColor="textTertiary" numberOfLines={1}>{label}</ThemedText>
      <ThemedText type="subtitle">{value}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 48, gap: 14 },
  header: { gap: 5, paddingTop: 4 },
  hero: { borderWidth: 1, borderRadius: 28, padding: 22, alignItems: 'center', gap: 8 },
  resultIcon: { width: 66, height: 66, borderRadius: 33, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  score: { fontSize: 48, lineHeight: 54, fontWeight: '800', letterSpacing: -2 },
  centerText: { textAlign: 'center' },
  metricRow: { flexDirection: 'row', gap: 8 },
  metric: { flex: 1, minHeight: 80, borderWidth: 1, borderRadius: 19, padding: 12, justifyContent: 'center', gap: 2 },
  infoCard: { borderWidth: 1, borderRadius: 20, padding: 15 },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  infoText: { flex: 1, gap: 3 },
  empty: { flex: 1, justifyContent: 'center', gap: 10 },
});
