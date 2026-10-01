import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import type { LocalizedQuestion } from '@/features/questions/question-bank';
import { useTheme } from '@/hooks/use-theme';
import { getFlowCopy } from '@/i18n/flow-copy';
import type { Lang } from '@/i18n/types';

type Props = {
  question: LocalizedQuestion;
  lang: Lang;
  selectedOptionId: string | null;
  revealResult?: boolean;
  disabled?: boolean;
  onSelect: (optionId: string) => void;
};

export function QuestionCard({
  question,
  lang,
  selectedOptionId,
  revealResult = false,
  disabled = false,
  onSelect,
}: Props) {
  const colors = useTheme();
  const copy = getFlowCopy(lang);

  return (
    <View style={styles.root}>
      <View style={styles.metaRow}>
        <View style={[styles.topicBadge, { backgroundColor: colors.surface2 }]}> 
          <ThemedText type="smallBold" themeColor="textSecondary">
            {copy.topic[question.topic]}
          </ThemedText>
        </View>
        <ThemedText type="small" themeColor="textTertiary">
          {question.ruleRef}
        </ThemedText>
      </View>

      <ThemedText style={styles.prompt}>{question.prompt}</ThemedText>

      <View style={styles.options}>
        {question.options.map((option, index) => {
          const selected = selectedOptionId === option.id;
          const isCorrect = option.id === question.correctOptionId;
          const showCorrect = revealResult && isCorrect;
          const showWrong = revealResult && selected && !isCorrect;

          let borderColor: string = colors.border;
          let backgroundColor: string = colors.surface;
          let markerBackground: string = colors.surface2;
          let markerColor: string = colors.textSecondary;

          if (selected && !revealResult) {
            borderColor = colors.accent;
            backgroundColor = colors.accentSoft;
            markerBackground = colors.accent;
            markerColor = colors.accentForeground;
          }
          if (showCorrect) {
            borderColor = colors.accent;
            backgroundColor = colors.accentSoft;
            markerBackground = colors.accent;
            markerColor = colors.accentForeground;
          }
          if (showWrong) {
            borderColor = colors.danger;
            backgroundColor = colors.dangerSoft;
            markerBackground = colors.danger;
            markerColor = colors.dangerForeground;
          }

          return (
            <Pressable
              key={option.id}
              disabled={disabled}
              onPress={() => onSelect(option.id)}
              style={({ pressed }) => [
                styles.option,
                { borderColor, backgroundColor, opacity: pressed && !disabled ? 0.88 : 1 },
              ]}>
              <View style={[styles.optionMarker, { backgroundColor: markerBackground }]}> 
                {revealResult && (showCorrect || showWrong) ? (
                  <Ionicons name={showCorrect ? 'checkmark' : 'close'} size={17} color={markerColor} />
                ) : (
                  <ThemedText type="smallBold" style={{ color: markerColor }}>
                    {String.fromCharCode(65 + index)}
                  </ThemedText>
                )}
              </View>
              <ThemedText style={styles.optionText}>{option.text}</ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: 17 },
  metaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  topicBadge: { minHeight: 29, borderRadius: 999, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' },
  prompt: { fontSize: 22, lineHeight: 30, fontWeight: '700', letterSpacing: -0.25 },
  options: { gap: 9 },
  option: { minHeight: 62, borderRadius: 18, borderWidth: 1, paddingHorizontal: 13, paddingVertical: 11, flexDirection: 'row', alignItems: 'center', gap: 11 },
  optionMarker: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  optionText: { flex: 1, lineHeight: 22 },
});
