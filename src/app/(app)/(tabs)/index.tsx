import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { HomeMetricChip } from '@/components/home/home-metric-chip';
import { getHomeCopy } from '@/components/home/home-copy';
import { HomeRouteScene } from '@/components/home/home-route-scene';
import { AmbientMotion } from '@/components/journey/ambient-motion';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import {
  getAnsweredUniqueCount,
  getReadinessPercent,
} from '@/features/learning/learning-utils';
import { QUESTION_BANK } from '@/features/questions/question-bank';
import { useTheme } from '@/hooks/use-theme';
import { getProductCopy } from '@/i18n/product-copy';
import { useAppSettings } from '@/store/app-settings';

export default function HomeRoute() {
  const { lang, profile, learning } = useAppSettings();
  const colors = useTheme();

  const entrance = useRef(new Animated.Value(0)).current;
  const homeTravel = useRef(new Animated.Value(1)).current;

  const name = profile.name.trim();
  const dailyMinutes = profile.dailyMinutes ?? 15;
  const copy = getHomeCopy(lang);
  const productCopy = getProductCopy(lang).home;

  const answeredUnique = getAnsweredUniqueCount(learning);
  const readiness = getReadinessPercent(learning, QUESTION_BANK.length);
  const latestExam = learning.examHistory[0];

  let currentStage = 1;
  if (readiness >= 25) currentStage = 2;
  if (learning.wrongQuestionIds.length > 0) currentStage = 3;
  if (learning.examHistory.length > 0) currentStage = 4;
  if (latestExam?.passed) currentStage = 5;

  const formattedExamDate =
    profile.examDateUnknown || !profile.examDate ? copy.noDate : profile.examDate;

  const routeStatus =
    answeredUnique === 0
      ? productCopy.waiting
      : latestExam?.passed
        ? productCopy.passed
        : productCopy.readiness(readiness);

  const currentDescription =
    currentStage === 1
      ? productCopy.currentStart
      : currentStage === 2
        ? productCopy.currentProgress(answeredUnique, QUESTION_BANK.length)
        : currentStage === 3
          ? productCopy.currentMistakes(learning.wrongQuestionIds.length)
          : currentStage === 4
            ? productCopy.currentExam(latestExam?.score ?? 0, latestExam?.total ?? 20)
            : productCopy.currentReady;

  useEffect(() => {
    Animated.timing(entrance, {
      toValue: 1,
      duration: 620,
      useNativeDriver: true,
    }).start();
  }, [entrance]);

  const translateY = entrance.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 0],
  });

  return (
    <Screen ambience={false}>
      <AmbientMotion travel={homeTravel} isTravelling={false} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: entrance,
              transform: [{ translateY }],
            },
          ]}>
          <View style={styles.header}>
            <View style={styles.eyebrowRow}>
              <View style={[styles.eyebrowDot, { backgroundColor: colors.accent }]} />
              <ThemedText type="smallBold" style={{ color: colors.accent }}>
                {copy.eyebrow}
              </ThemedText>
            </View>
            <ThemedText type="title">{copy.greeting(name)}</ThemedText>
          </View>

          <View style={[styles.hero, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.heroTop}>
              <View style={styles.flex}>
                <ThemedText type="small" themeColor="textSecondary">
                  {copy.routeTitle}
                </ThemedText>
                <ThemedText type="subtitle">{routeStatus}</ThemedText>
              </View>

              <View
                style={[
                  styles.liveBadge,
                  { backgroundColor: colors.warningSoft, borderColor: colors.warning },
                ]}>
                <View style={[styles.liveDot, { backgroundColor: colors.warning }]} />
                <ThemedText type="smallBold" style={{ color: colors.warningSoftText }}>
                  {productCopy.live}
                </ThemedText>
              </View>
            </View>

            <HomeRouteScene currentIndex={currentStage} labels={copy.stages} />

            <View
              style={[
                styles.currentPoint,
                { backgroundColor: colors.surface2, borderColor: colors.border },
              ]}>
              <View style={styles.currentTop}>
                <View style={[styles.currentDot, { backgroundColor: colors.warning }]} />
                <ThemedText type="smallBold" style={{ color: colors.warning }}>
                  {copy.currentPoint}
                </ThemedText>
              </View>

              <ThemedText type="subtitle">{copy.stages[currentStage]}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {currentDescription}
              </ThemedText>
            </View>

            <Pressable
              onPress={() => router.push('/learn')}
              style={({ pressed }) => [
                styles.primaryButton,
                { backgroundColor: colors.accent, opacity: pressed ? 0.84 : 1 },
              ]}>
              <ThemedText type="smallBold" style={{ color: colors.accentForeground }}>
                {copy.continueRoute} →
              </ThemedText>
            </Pressable>
          </View>

          <View style={styles.metrics}>
            <HomeMetricChip label={copy.category} value={profile.category ?? 'B'} />
            <HomeMetricChip label={copy.exam} value={formattedExamDate} />
            <HomeMetricChip label={copy.dailyGoal} value={`${dailyMinutes} ${copy.minutesShort}`} />
          </View>

          <View
            style={[
              styles.todayCard,
              { backgroundColor: colors.surface2, borderColor: colors.border },
            ]}>
            <View style={styles.todayHeader}>
              <View style={styles.flex}>
                <ThemedText type="smallBold" style={{ color: colors.accent }}>
                  {copy.today}
                </ThemedText>
                <ThemedText type="subtitle">
                  {answeredUnique === 0 ? productCopy.started : productCopy.mastered(answeredUnique, QUESTION_BANK.length)}
                </ThemedText>
              </View>

              <View
                style={[
                  styles.minutesBadge,
                  { backgroundColor: colors.accentSoft },
                ]}>
                <ThemedText type="smallBold" style={{ color: colors.accentSoftText }}>
                  {dailyMinutes} {copy.minutesShort}
                </ThemedText>
              </View>
            </View>

            <ThemedText type="small" themeColor="textSecondary">
              {productCopy.offlineHint}
            </ThemedText>
          </View>

          <View style={styles.secondaryRow}>
            <Pressable
              onPress={() => router.push('/learn')}
              style={({ pressed }) => [
                styles.secondaryCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  opacity: pressed ? 0.86 : 1,
                },
              ]}>
              <ThemedText type="small" themeColor="textTertiary">
                {copy.readiness}
              </ThemedText>
              <ThemedText type="subtitle">{readiness}%</ThemedText>
              <View style={[styles.readinessLine, { backgroundColor: colors.border }]}>
                <View
                  style={[
                    styles.readinessProgress,
                    {
                      backgroundColor: colors.accent,
                      width: `${Math.max(3, readiness)}%`,
                    },
                  ]}
                />
              </View>
            </Pressable>

            <Pressable
              onPress={() => router.push('/exam')}
              style={({ pressed }) => [
                styles.secondaryCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  opacity: pressed ? 0.84 : 1,
                },
              ]}>
              <ThemedText type="small" themeColor="textTertiary">
                {copy.mockExam}
              </ThemedText>
              <ThemedText type="smallBold">
                {latestExam ? productCopy.last(latestExam.score, latestExam.total) : copy.mockExamText}
              </ThemedText>
              <ThemedText type="smallBold" style={{ marginTop: 8, color: colors.accent }}>
                {copy.openExam} →
              </ThemedText>
            </Pressable>
          </View>
        </Animated.View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 112,
  },
  content: {
    gap: 14,
  },
  header: {
    gap: 6,
    paddingTop: 7,
    paddingBottom: 3,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  eyebrowDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  hero: {
    borderWidth: 1,
    borderRadius: 27,
    padding: 17,
    gap: 12,
    overflow: 'hidden',
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flex: {
    flex: 1,
    gap: 3,
  },
  liveBadge: {
    minHeight: 30,
    borderRadius: 999,
    borderWidth: 0,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  currentPoint: {
    borderWidth: 0,
    borderRadius: 19,
    padding: 14,
    gap: 4,
  },
  currentTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  currentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  metrics: {
    flexDirection: 'row',
    gap: 7,
  },
  todayCard: {
    borderWidth: 0,
    borderRadius: 21,
    padding: 15,
    gap: 10,
  },
  todayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  minutesBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  secondaryRow: {
    flexDirection: 'row',
    gap: 9,
  },
  secondaryCard: {
    flex: 1,
    minHeight: 108,
    borderWidth: 0,
    borderRadius: 20,
    padding: 13,
    gap: 4,
  },
  readinessLine: {
    height: 3,
    marginTop: 12,
    borderRadius: 999,
    overflow: 'hidden',
  },
  readinessProgress: {
    height: '100%',
    borderRadius: 999,
  },
});
