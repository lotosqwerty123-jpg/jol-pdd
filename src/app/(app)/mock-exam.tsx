import Ionicons from '@expo/vector-icons/Ionicons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { BackHandler, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { StrictCameraPreview } from '@/components/exam/strict-camera-preview';
import { QuestionCard } from '@/components/learning/question-card';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { JolDialog } from '@/components/ui/jol-dialog';
import { getLocalizedQuestion, getMockExamQuestions } from '@/features/questions/question-bank';
import { useTheme } from '@/hooks/use-theme';
import { getProductCopy } from '@/i18n/product-copy';
import { useAppSettings } from '@/store/app-settings';
import type { ExamAttempt } from '@/store/types';

const EXAM_SECONDS = 25 * 60;
const PASS_SCORE = 18;
const STRICT_AUTO_ADVANCE_MS = 320;

export default function MockExamRoute() {
  const params = useLocalSearchParams<{ mode?: string }>();
  const mode: 'mock' | 'strict' = params.mode === 'strict' ? 'strict' : 'mock';
  const { lang, recordExamAttempt } = useAppSettings();
  const copy = getProductCopy(lang);
  const colors = useTheme();
  const questionsRef = useRef(getMockExamQuestions(20));
  const questions = questionsRef.current;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const answersRef = useRef<Record<string, string>>({});
  const [remaining, setRemaining] = useState(EXAM_SECONDS);
  const [exitDialogVisible, setExitDialogVisible] = useState(false);
  const finishedRef = useRef(false);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sourceQuestion = questions[index];
  const question = sourceQuestion ? getLocalizedQuestion(sourceQuestion, lang) : null;
  const selectedOptionId = question ? answers[question.id] ?? null : null;

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      confirmExit();
      return true;
    });
    return () => sub.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    const timer = setInterval(() => setRemaining((current) => Math.max(0, current - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (remaining === 0) finishExam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  if (!question) {
    return (
      <Screen>
        <View style={styles.empty}>
          <ThemedText type="title">{copy.exam.practiceTitle}</ThemedText>
          <ThemedText themeColor="textSecondary">{copy.exam.noQuestions}</ThemedText>
        </View>
      </Screen>
    );
  }

  const activeQuestion = question;
  const answeredCount = Object.keys(answers).length;

  function selectAnswer(optionId: string) {
    if (answersRef.current[activeQuestion.id] || finishedRef.current) return;

    const nextAnswers = { ...answersRef.current, [activeQuestion.id]: optionId };
    answersRef.current = nextAnswers;
    setAnswers(nextAnswers);

    if (mode !== 'strict') return;

    transitionTimerRef.current = setTimeout(() => {
      transitionTimerRef.current = null;
      if (index >= questions.length - 1) {
        finishExam();
      } else {
        setIndex((current) => current + 1);
      }
    }, STRICT_AUTO_ADVANCE_MS);
  }

  function nextQuestion() {
    if (!answersRef.current[activeQuestion.id]) return;
    if (index >= questions.length - 1) {
      finishExam();
      return;
    }
    setIndex((current) => current + 1);
  }

  function confirmExit() {
    if (finishedRef.current) return;
    setExitDialogVisible(true);
  }

  function finishExam() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }

    const finalAnswers = answersRef.current;
    let score = 0;
    const wrongQuestionIds: string[] = [];

    for (const item of questions) {
      if (finalAnswers[item.id] === item.correctOptionId) score += 1;
      else wrongQuestionIds.push(item.id);
    }

    const attempt: ExamAttempt = {
      id: `exam-${Date.now()}`,
      mode,
      createdAt: Date.now(),
      score,
      total: questions.length,
      passed: score >= PASS_SCORE,
      answers: finalAnswers,
      wrongQuestionIds,
    };

    recordExamAttempt(attempt);
    router.replace({ pathname: '/exam-result', params: { attemptId: attempt.id } });
  }

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const timerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const hasAnswer = Boolean(selectedOptionId);
  const strict = mode === 'strict';

  return (
    <Screen>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.topBar}>
          <View style={styles.modeBlock}>
            <Pressable
              accessibilityRole="button"
              onPress={confirmExit}
              style={({ pressed }) => [
                styles.exitButton,
                {
                  backgroundColor: strict ? colors.warningSoft : colors.surface2,
                  opacity: pressed ? 0.72 : 1,
                },
              ]}>
              <Ionicons
                name="chevron-back"
                size={19}
                color={strict ? colors.warningSoftText : colors.text}
              />
            </Pressable>
            <View style={styles.flex}>
              <ThemedText type="smallBold" style={{ color: strict ? colors.warning : colors.accent }}>
                {strict ? copy.exam.strictLabel : copy.exam.normalLabel}
              </ThemedText>
              <ThemedText type="subtitle">{index + 1} / {questions.length}</ThemedText>
            </View>
          </View>

          <View style={[styles.timer, { backgroundColor: remaining <= 300 ? colors.dangerSoft : colors.surface2 }]}> 
            <Ionicons name="time-outline" size={18} color={remaining <= 300 ? colors.danger : colors.textSecondary} />
            <ThemedText type="smallBold" style={{ color: remaining <= 300 ? colors.dangerSoftText : colors.text }}>{timerText}</ThemedText>
          </View>
        </View>

        <View style={[styles.progressTrack, { backgroundColor: colors.border }]}> 
          <View style={[styles.progressFill, { backgroundColor: strict ? colors.warning : colors.accent, width: `${((index + 1) / questions.length) * 100}%` }]} />
        </View>

        <View style={styles.metaRow}>
          <ThemedText type="small" themeColor="textSecondary">{copy.exam.answered(answeredCount, questions.length)}</ThemedText>
          {!strict ? <ThemedText type="small" themeColor="textTertiary">{copy.exam.lockedAnswer}</ThemedText> : null}
        </View>

        {strict ? (
          <StrictCameraPreview
            copy={copy.strict}
            compact
            enforceFace
            onViolationLimit={finishExam}
          />
        ) : null}

        <View style={[styles.card, { backgroundColor: colors.surface }]}> 
          <QuestionCard
            question={activeQuestion}
            lang={lang}
            selectedOptionId={selectedOptionId}
            disabled={hasAnswer}
            onSelect={selectAnswer}
          />
          {!strict && hasAnswer ? (
            <View style={[styles.locked, { backgroundColor: colors.surface2 }]}> 
              <Ionicons name="lock-closed-outline" size={17} color={colors.textSecondary} />
              <ThemedText type="small" themeColor="textSecondary">{copy.exam.lockedAnswer}</ThemedText>
            </View>
          ) : null}
        </View>

        {strict ? (
          <View style={[styles.strictFlow, { backgroundColor: colors.warningSoft }]}>
            <Ionicons name="lock-closed-outline" size={17} color={colors.warningSoftText} />
            <ThemedText type="small" style={[styles.flex, { color: colors.warningSoftText }]}>
              {copy.exam.forwardOnly}
            </ThemedText>
          </View>
        ) : (
          <AppButton
            label={index < questions.length - 1 ? copy.exam.next : copy.exam.finish}
            disabled={!hasAnswer}
            onPress={nextQuestion}
            style={!hasAnswer ? { opacity: 0.45 } : undefined}
          />
        )}
      </ScrollView>

      <JolDialog
        visible={exitDialogVisible}
        title={copy.exam.exitTitle}
        body={copy.exam.exitBody}
        cancelLabel={copy.exam.exitCancel}
        confirmLabel={copy.exam.exitConfirm}
        tone="warning"
        confirmTone="danger"
        onCancel={() => setExitDialogVisible(false)}
        onConfirm={() => {
          setExitDialogVisible(false);
          finishExam();
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 44, gap: 13 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingTop: 4 },
  modeBlock: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 9 },
  flex: { flex: 1 },
  exitButton: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  timer: { minHeight: 38, borderRadius: 999, paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center', gap: 6 },
  progressTrack: { height: 4, borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 999 },
  metaRow: { gap: 2 },
  card: { borderRadius: 24, padding: 17, gap: 14 },
  locked: { minHeight: 43, borderRadius: 15, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 8 },
  strictFlow: { minHeight: 48, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 8 },
  empty: { flex: 1, justifyContent: 'center', gap: 10 },
});
