import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { getLocalizedQuestion, getQuestionById } from '@/features/questions/question-bank';
import { useTheme } from '@/hooks/use-theme';
import { getFlowCopy } from '@/i18n/flow-copy';
import { useAppSettings } from '@/store/app-settings';

export default function ExplainRoute() {
  const { questionId, selectedOptionId } = useLocalSearchParams<{
    questionId?: string;
    selectedOptionId?: string;
  }>();
  const { lang } = useAppSettings();
  const colors = useTheme();
  const copy = getFlowCopy(lang).explain;

  const source = questionId ? getQuestionById(questionId) : undefined;
  const question = source ? getLocalizedQuestion(source, lang) : null;

  if (!question) {
    return (
      <Screen>
        <View style={styles.empty}>
          <ThemedText type="title">{copy.title}</ThemedText>
          <ThemedText themeColor="textSecondary">{copy.missing}</ThemedText>
          <AppButton label={copy.back} onPress={() => router.back()} />
        </View>
      </Screen>
    );
  }

  const selected = question.options.find((option) => option.id === selectedOptionId);
  const correct = question.options.find((option) => option.id === question.correctOptionId);
  const isCorrect = selectedOptionId === question.correctOptionId;

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.eyebrow}>
            <Ionicons name="sparkles-outline" size={18} color={colors.warning} />
            <ThemedText type="smallBold" style={{ color: colors.warning }}>
              {copy.eyebrow}
            </ThemedText>
          </View>
          <ThemedText type="title">{copy.title}</ThemedText>
        </View>

        <View style={[styles.questionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <ThemedText type="smallBold" themeColor="textTertiary">
            {copy.question}
          </ThemedText>
          <ThemedText type="subtitle">{question.prompt}</ThemedText>
        </View>

        <View
          style={[
            styles.answerCard,
            {
              backgroundColor: isCorrect ? colors.accentSoft : colors.dangerSoft,
              borderColor: isCorrect ? colors.accent : colors.danger,
            },
          ]}>
          <View style={styles.answerTitle}>
            <Ionicons
              name={isCorrect ? 'checkmark-circle' : 'close-circle'}
              size={22}
              color={isCorrect ? colors.accent : colors.danger}
            />
            <ThemedText
              type="smallBold"
              style={{ color: isCorrect ? colors.accentSoftText : colors.dangerSoftText }}>
              {isCorrect ? copy.correct : copy.wrong}
            </ThemedText>
          </View>
          <ThemedText>{selected?.text ?? copy.noAnswer}</ThemedText>
        </View>

        {!isCorrect ? (
          <View style={[styles.correctCard, { backgroundColor: colors.accentSoft, borderColor: colors.accent }]}>
            <ThemedText type="smallBold" style={{ color: colors.accentSoftText }}>
              {copy.rightAnswer}
            </ThemedText>
            <ThemedText>{correct?.text ?? '—'}</ThemedText>
          </View>
        ) : null}

        <View style={[styles.explanationCard, { backgroundColor: colors.warningSoft, borderColor: colors.warning }]}>
          <View style={styles.answerTitle}>
            <Ionicons name="bulb-outline" size={21} color={colors.warningSoftText} />
            <ThemedText type="smallBold" style={{ color: colors.warningSoftText }}>
              {copy.explanation}
            </ThemedText>
          </View>
          <ThemedText style={styles.explanationText}>{question.explanation}</ThemedText>
        </View>

        <View style={[styles.sourceCard, { backgroundColor: colors.surface2, borderColor: colors.border }]}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            {copy.source}
          </ThemedText>
          <ThemedText type="small">{question.ruleRef}</ThemedText>
          <ThemedText type="small" themeColor="textTertiary">
            {question.sourceTitle}
          </ThemedText>
          <View style={styles.offlineRow}>
            <Ionicons name="cloud-offline-outline" size={15} color={colors.textTertiary} />
            <ThemedText type="small" themeColor="textTertiary">
              {copy.offline}
            </ThemedText>
          </View>
        </View>

        <AppButton label={copy.backQuestion} onPress={() => router.back()} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 48,
    gap: 14,
  },
  header: {
    gap: 5,
    paddingTop: 4,
    paddingBottom: 4,
  },
  eyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  questionCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 18,
    gap: 7,
  },
  answerCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
    gap: 8,
  },
  correctCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
    gap: 6,
  },
  explanationCard: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 16,
    gap: 9,
  },
  explanationText: {
    lineHeight: 24,
  },
  sourceCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
    gap: 5,
  },
  answerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  offlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 5,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
  },
});
