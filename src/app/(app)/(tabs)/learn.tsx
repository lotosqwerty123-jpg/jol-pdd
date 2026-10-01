import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { QuestionCard } from '@/components/learning/question-card';
import { NetworkStatusPill } from '@/components/network-status-pill';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { getNextLearningIndex, getReadinessPercent } from '@/features/learning/learning-utils';
import { getLearningQuestions, getLocalizedQuestion } from '@/features/questions/question-bank';
import { useTheme } from '@/hooks/use-theme';
import { getFlowCopy } from '@/i18n/flow-copy';
import { useAppSettings } from '@/store/app-settings';

export default function LearnRoute() {
  const { lang, profile, learning, recordLearningAnswer, setLastQuestion } = useAppSettings();
  const colors = useTheme();
  const copy = getFlowCopy(lang).learning;

  const questions = useMemo(() => getLearningQuestions(profile.category), [profile.category]);
  const [index, setIndex] = useState(() => getNextLearningIndex(questions, learning));
  const initialProgress = questions[index] ? learning.questionProgress[questions[index].id] : undefined;
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(initialProgress?.selectedOptionId ?? null);
  const [revealed, setRevealed] = useState(Boolean(initialProgress));

  const sourceQuestion = questions[index] ?? questions[0];
  const question = sourceQuestion ? getLocalizedQuestion(sourceQuestion, lang) : null;
  const readiness = getReadinessPercent(learning, questions.length);

  if (!question) {
    return (
      <Screen>
        <View style={styles.empty}>
          <ThemedText type="title">{copy.title}</ThemedText>
          <ThemedText themeColor="textSecondary">{copy.empty}</ThemedText>
        </View>
      </Screen>
    );
  }

  const activeQuestion = question;
  const isCorrect = selectedOptionId === activeQuestion.correctOptionId;

  function checkAnswer() {
    if (!selectedOptionId || revealed) return;
    recordLearningAnswer(activeQuestion.id, selectedOptionId, isCorrect);
    setLastQuestion(activeQuestion.id);
    setRevealed(true);
  }

  function goTo(nextIndex: number) {
    if (nextIndex < 0 || nextIndex >= questions.length) return;
    const nextSource = questions[nextIndex];
    const progress = learning.questionProgress[nextSource.id];
    setIndex(nextIndex);
    setSelectedOptionId(progress?.selectedOptionId ?? null);
    setRevealed(Boolean(progress));
  }

  function nextQuestion() {
    goTo((index + 1) % questions.length);
  }

  function previousQuestion() {
    goTo(index - 1);
  }

  function openExplain() {
    if (!selectedOptionId) return;
    router.push({
      pathname: '/explain',
      params: { questionId: activeQuestion.id, selectedOptionId },
    });
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerText}>
              <ThemedText type="smallBold" style={{ color: colors.accent }}>{copy.eyebrow}</ThemedText>
              <ThemedText type="title">{copy.question(index + 1, questions.length)}</ThemedText>
            </View>
            <NetworkStatusPill />
          </View>

          <View style={[styles.progressTrack, { backgroundColor: colors.border }]}> 
            <View style={[styles.progressFill, { backgroundColor: colors.accent, width: `${Math.max(4, ((index + 1) / questions.length) * 100)}%` }]} />
          </View>

          <View style={styles.statsRow}>
            <ThemedText type="small" themeColor="textSecondary">{copy.readiness(readiness)}</ThemedText>
            <ThemedText type="small" themeColor="textTertiary">{copy.category(profile.category ?? 'B')}</ThemedText>
          </View>

          <Pressable
            onPress={() => router.push('/rules' as any)}
            style={({ pressed }) => [styles.rulesShortcut, { backgroundColor: colors.surface2, opacity: pressed ? 0.84 : 1 }]}>
            <Ionicons name="book-outline" size={18} color={colors.accent} />
            <View style={styles.flex}>
              <ThemedText type="smallBold">{copy.allRules}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">{copy.rulesMeta}</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
          </Pressable>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}> 
          <QuestionCard
            question={activeQuestion}
            lang={lang}
            selectedOptionId={selectedOptionId}
            revealResult={revealed}
            disabled={revealed}
            onSelect={setSelectedOptionId}
          />

          {revealed ? (
            <View style={[styles.resultBox, { backgroundColor: isCorrect ? colors.accentSoft : colors.dangerSoft }]}> 
              <View style={styles.resultTitleRow}>
                <Ionicons name={isCorrect ? 'checkmark-circle' : 'close-circle'} size={22} color={isCorrect ? colors.accent : colors.danger} />
                <ThemedText type="smallBold" style={{ color: isCorrect ? colors.accentSoftText : colors.dangerSoftText }}>
                  {isCorrect ? copy.correct : copy.error}
                </ThemedText>
              </View>
              <ThemedText type="small" themeColor="textSecondary">{isCorrect ? copy.correctHint : copy.errorHint}</ThemedText>
            </View>
          ) : (
            <View style={[styles.practiceNote, { backgroundColor: colors.surface2 }]}> 
              <Ionicons name="school-outline" size={17} color={colors.textSecondary} />
              <ThemedText type="small" themeColor="textSecondary" style={styles.flex}>{copy.practice}</ThemedText>
            </View>
          )}
        </View>

        <View style={styles.actions}>
          {!revealed ? (
            <AppButton label={copy.check} disabled={!selectedOptionId} onPress={checkAnswer} style={!selectedOptionId ? { opacity: 0.45 } : undefined} />
          ) : (
            <>
              <Pressable
                onPress={openExplain}
                style={({ pressed }) => [styles.explainButton, { backgroundColor: colors.warningSoft, opacity: pressed ? 0.86 : 1 }]}>
                <Ionicons name="sparkles-outline" size={18} color={colors.warningSoftText} />
                <ThemedText type="smallBold" style={{ color: colors.warningSoftText }}>{copy.why}</ThemedText>
              </Pressable>
              <View style={styles.navRow}>
                <Pressable
                  disabled={index === 0}
                  onPress={previousQuestion}
                  style={({ pressed }) => [styles.navSecondary, { backgroundColor: colors.surface2, opacity: index === 0 ? 0.35 : pressed ? 0.78 : 1 }]}>
                  <ThemedText type="smallBold">{copy.previous}</ThemedText>
                </Pressable>
                <Pressable
                  onPress={nextQuestion}
                  style={({ pressed }) => [styles.navPrimary, { backgroundColor: colors.accent, opacity: pressed ? 0.84 : 1 }]}>
                  <ThemedText type="smallBold" style={{ color: colors.accentForeground }}>{copy.next}</ThemedText>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 110, gap: 15 },
  header: { gap: 11, paddingTop: 4 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  headerText: { flex: 1, gap: 2 },
  progressTrack: { height: 4, borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 999 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  rulesShortcut: { minHeight: 62, borderRadius: 18, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', gap: 10 },
  flex: { flex: 1 },
  card: { borderWidth: 1, borderRadius: 24, padding: 17, gap: 16 },
  practiceNote: { minHeight: 46, borderRadius: 15, paddingHorizontal: 12, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 8 },
  resultBox: { borderRadius: 16, padding: 13, gap: 5 },
  resultTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  actions: { gap: 9 },
  explainButton: { minHeight: 50, borderRadius: 999, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  navRow: { flexDirection: 'row', gap: 9 },
  navSecondary: { flex: 0.92, minHeight: 50, borderRadius: 999, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
  navPrimary: { flex: 1.35, minHeight: 50, borderRadius: 999, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
  empty: { flex: 1, justifyContent: 'center', gap: 8 },
});
