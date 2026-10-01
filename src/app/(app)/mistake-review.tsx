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

export default function MistakeReviewRoute() {
  const { attemptId } = useLocalSearchParams<{ attemptId?: string }>();
  const { lang, learning } = useAppSettings();
  const colors = useTheme();
  const copy = getFlowCopy(lang).mistakes;

  const attempt = learning.examHistory.find((item) => item.id === attemptId);
  const ids = attempt?.wrongQuestionIds ?? learning.wrongQuestionIds;

  const items = ids
    .map((id) => {
      const source = getQuestionById(id);
      if (!source) {
        return null;
      }

      const question = getLocalizedQuestion(source, lang);
      const selectedOptionId =
        attempt?.answers[id] ?? learning.questionProgress[id]?.selectedOptionId ?? null;

      return {
        question,
        selectedOptionId,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <ThemedText type="smallBold" style={{ color: colors.warning }}>
            {copy.eyebrow}
          </ThemedText>
          <ThemedText type="title">{copy.title}</ThemedText>
          <ThemedText themeColor="textSecondary">
            {items.length
              ? copy.count(items.length)
              : copy.none}
          </ThemedText>
        </View>

        {items.length ? (
          items.map(({ question, selectedOptionId }, index) => {
            const selected = question.options.find((option) => option.id === selectedOptionId);
            const correct = question.options.find(
              (option) => option.id === question.correctOptionId,
            );

            return (
              <View
                key={question.id}
                style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <View style={styles.cardTop}>
                  <View style={[styles.numberBadge, { backgroundColor: colors.dangerSoft }]}>
                    <ThemedText type="smallBold" style={{ color: colors.dangerSoftText }}>
                      {index + 1}
                    </ThemedText>
                  </View>
                  <ThemedText type="small" themeColor="textTertiary">
                    {question.ruleRef}
                  </ThemedText>
                </View>

                <ThemedText type="subtitle">{question.prompt}</ThemedText>

                <View style={[styles.answerRow, { backgroundColor: colors.dangerSoft }]}>
                  <Ionicons name="close-circle" size={20} color={colors.danger} />
                  <View style={styles.answerText}>
                    <ThemedText type="smallBold" style={{ color: colors.dangerSoftText }}>
                      {copy.yourAnswer}
                    </ThemedText>
                    <ThemedText type="small">{selected?.text ?? copy.noAnswer}</ThemedText>
                  </View>
                </View>

                <View style={[styles.answerRow, { backgroundColor: colors.accentSoft }]}>
                  <Ionicons name="checkmark-circle" size={20} color={colors.accent} />
                  <View style={styles.answerText}>
                    <ThemedText type="smallBold" style={{ color: colors.accentSoftText }}>
                      {copy.correct}
                    </ThemedText>
                    <ThemedText type="small">{correct?.text ?? '—'}</ThemedText>
                  </View>
                </View>

                <View style={[styles.explanation, { backgroundColor: colors.warningSoft }]}>
                  <ThemedText type="smallBold" style={{ color: colors.warningSoftText }}>
                    {copy.why}
                  </ThemedText>
                  <ThemedText type="small">{question.explanation}</ThemedText>
                </View>
              </View>
            );
          })
        ) : (
          <View style={[styles.emptyCard, { backgroundColor: colors.accentSoft, borderColor: colors.accent }]}>
            <Ionicons name="checkmark-circle-outline" size={34} color={colors.accent} />
            <ThemedText type="subtitle">{copy.emptyTitle}</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.centerText}>
              {copy.emptyBody}
            </ThemedText>
          </View>
        )}

        <AppButton label={copy.backLearning} onPress={() => router.replace('/learn')} />
        <AppButton
          label={copy.mock}
          variant="secondary"
          onPress={() => router.replace('/mock-exam')}
        />
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
    paddingBottom: 3,
  },
  card: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    gap: 12,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  numberBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerRow: {
    borderRadius: 17,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
  },
  answerText: {
    flex: 1,
    gap: 2,
  },
  explanation: {
    borderRadius: 17,
    padding: 12,
    gap: 4,
  },
  emptyCard: {
    minHeight: 220,
    borderWidth: 1,
    borderRadius: 26,
    padding: 22,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  centerText: {
    textAlign: 'center',
  },
});
