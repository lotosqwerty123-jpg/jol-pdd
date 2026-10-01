import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  BackHandler,
  Easing,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AmbientMotion } from '@/components/journey/ambient-motion';
import { getJourneyCopy } from '@/components/journey/journey-copy';
import { JourneyStagePanel } from '@/components/journey/journey-stage-panel';
import { RouteScene } from '@/components/journey/route-scene';
import { ThemedText } from '@/components/themed-text';
import { useAppSettings } from '@/store/app-settings';
import type { JolTheme } from '@/theme/colors';

type JourneyStage =
  | 'language'
  | 'theme'
  | 'name'
  | 'category'
  | 'date'
  | 'goal';

const STAGES: JourneyStage[] = [
  'language',
  'theme',
  'name',
  'category',
  'date',
  'goal',
];

export default function JourneyScreen() {
  const {
    colors,
    dict,
    lang,
    theme,
    profile,
    setLang,
    selectLanguage,
    setTheme,
    updateProfile,
    finishOnboarding,
  } = useAppSettings();

  /*
   * ВАЖНО ДЛЯ СТАБИЛЬНОСТИ:
   * - travel используется ТОЛЬКО JS-driven анимациями Journey/RouteScene;
   * - ambient имеет собственные native-driven values и больше не читает travel;
   * - один Animated.Value никогда не прыгает между native и JS driver.
   */
  const travel = useRef(new Animated.Value(0)).current;
  const boot = useRef(new Animated.Value(0)).current;
  const introExit = useRef(new Animated.Value(0)).current;
  const panelEnter = useRef(new Animated.Value(0)).current;
  const panelExit = useRef(new Animated.Value(0)).current;
  const themeWash = useRef(new Animated.Value(0)).current;
  const finishPulse = useRef(new Animated.Value(0)).current;

  const speedUpLocked = useRef(false);
  const arrivalHandled = useRef(false);
  const travelTarget = useRef(0);
  const arrivalAction = useRef<null | (() => void)>(null);

  const [themeWashColor, setThemeWashColor] = useState(colors.bg);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [introDone, setIntroDone] = useState(false);
  const [isTravelling, setIsTravelling] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [languagePicked, setLanguagePicked] = useState(false);

  const [name, setName] = useState(profile.name);
  const [category, setCategory] = useState(profile.category ?? 'B');
  const [examDate, setExamDate] = useState(profile.examDate ?? '');
  const [examDateUnknown, setExamDateUnknown] = useState(profile.examDateUnknown);
  const [dailyMinutes, setDailyMinutes] = useState(profile.dailyMinutes ?? 15);

  const stage = STAGES[stageIndex];
  const copy = getJourneyCopy(lang);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    Animated.timing(boot, {
      toValue: 1,
      duration: 620,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [boot]);

  const bootOpacity = boot.interpolate({
    inputRange: [0, 0.14, 1],
    outputRange: [0, 0.42, 1],
    extrapolate: 'clamp',
  });

  const bootTranslateY = boot.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 0],
    extrapolate: 'clamp',
  });

  const bootScale = boot.interpolate({
    inputRange: [0, 1],
    outputRange: [0.965, 1],
    extrapolate: 'clamp',
  });

  const introOpacity = introExit.interpolate({
    inputRange: [0, 0.34, 0.72, 1],
    outputRange: [1, 1, 0.26, 0],
    extrapolate: 'clamp',
  });

  const introScale = introExit.interpolate({
    inputRange: [0, 0.36, 1],
    outputRange: [1, 0.74, 0.16],
    extrapolate: 'clamp',
  });

  const introTranslateY = introExit.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -105],
    extrapolate: 'clamp',
  });

  const introTranslateX = introExit.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 78],
    extrapolate: 'clamp',
  });

  const taglineOpacity = introExit.interpolate({
    inputRange: [0, 0.18, 0.42],
    outputRange: [1, 0.46, 0],
    extrapolate: 'clamp',
  });

  const panelOpacity = Animated.multiply(
    panelEnter.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    panelExit.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
  );

  const panelTranslateX = Animated.add(
    panelEnter.interpolate({
      inputRange: [0, 1],
      outputRange: [48, 0],
    }),
    panelExit.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -68],
    }),
  );

  const panelTranslateY = panelEnter.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 0],
  });

  const finishGlowOpacity = finishPulse.interpolate({
    inputRange: [0, 0.24, 1],
    outputRange: [0, 0.16, 0],
  });

  const finishGlowScale = finishPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1.9],
  });

  function animatePanelIn() {
    panelExit.stopAnimation();
    panelEnter.stopAnimation();

    panelExit.setValue(0);
    panelEnter.setValue(0);

    Animated.timing(panelEnter, {
      toValue: 1,
      duration: 240,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }

  function beginJourney() {
    if (journeyStarted) return;

    // Footer исчезает сразу через условный render — второй "Продолжить" больше не остаётся.
    setJourneyStarted(true);
    setIntroDone(false);

    introExit.stopAnimation();
    panelEnter.stopAnimation();
    panelExit.stopAnimation();

    introExit.setValue(0);
    panelEnter.setValue(0);
    panelExit.setValue(0);

    Animated.parallel([
      Animated.timing(introExit, {
        toValue: 1,
        duration: 600,
        easing: Easing.bezier(0.18, 0.76, 0.18, 1),
        useNativeDriver: false,
      }),
      Animated.sequence([
        Animated.delay(230),
        Animated.timing(panelEnter, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
      ]),
    ]).start(({ finished }) => {
      if (!finished) return;

      setShowIntro(false);
      setIntroDone(true);
    });
  }

  function stageIsValid() {
    if (stage === 'language') return languagePicked;
    if (stage === 'name') return name.trim().length > 0;
    if (stage === 'date') return examDateUnknown || examDate.trim().length > 0;
    return true;
  }

  function persistStage() {
    if (stage === 'language') {
      selectLanguage(lang);
    }

    if (stage === 'name') {
      updateProfile({ name: name.trim() });
    }

    if (stage === 'category') {
      updateProfile({ category });
    }

    if (stage === 'date') {
      updateProfile({
        examDate: examDateUnknown ? null : examDate.trim() || null,
        examDateUnknown,
      });
    }

    if (stage === 'goal') {
      updateProfile({ dailyMinutes });
    }
  }

  function finalizeArrival() {
    if (arrivalHandled.current) return;

    arrivalHandled.current = true;
    speedUpLocked.current = false;
    setIsTravelling(false);

    const action = arrivalAction.current;
    arrivalAction.current = null;
    if (action) setTimeout(action, 90);
  }

  function moveTo(target: number, onArrival: () => void) {
    if (isTravelling) return;

    speedUpLocked.current = false;
    arrivalHandled.current = false;
    travelTarget.current = target;
    arrivalAction.current = onArrival;

    setIsTravelling(true);

    // Панель и дорога теперь независимы. Остановка travel больше не отменяет panelExit.
    Animated.timing(panelExit, {
      toValue: 1,
      duration: 170,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: false,
    }).start();

    Animated.timing(travel, {
      toValue: target,
      duration: 1180,
      easing: Easing.bezier(0.18, 0.7, 0.16, 1),
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        finalizeArrival();
      }
    });
  }

  function completeJourney() {
    finishPulse.stopAnimation();
    finishPulse.setValue(0);

    Animated.timing(finishPulse, {
      toValue: 1,
      duration: 480,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        finishOnboarding();
      }
    });
  }

  function continueJourney() {
    if (!stageIsValid() || isTravelling) return;

    persistStage();

    const finalStage = stageIndex === STAGES.length - 1;

    if (finalStage) {
      moveTo(6, completeJourney);
      return;
    }

    const nextIndex = stageIndex + 1;

    moveTo(nextIndex, () => {
      setStageIndex(nextIndex);
      animatePanelIn();
    });
  }

  function speedUpTravel() {
    if (!isTravelling || speedUpLocked.current || arrivalHandled.current) return;

    speedUpLocked.current = true;

    // Только первый tap сокращает текущую поездку. Последующие taps игнорируются.
    travel.stopAnimation(() => {
      Animated.timing(travel, {
        toValue: travelTarget.current,
        duration: 180,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          finalizeArrival();
        } else {
          speedUpLocked.current = false;
        }
      });
    });
  }

  function handleLanguage(nextLang: typeof lang) {
    setLang(nextLang);
    setLanguagePicked(true);
  }

  function handleTheme(nextTheme: JolTheme) {
    if (nextTheme === theme) return;

    setThemeWashColor(colors.bg);
    themeWash.stopAnimation();
    themeWash.setValue(1);

    setTheme(nextTheme);

    Animated.timing(themeWash, {
      toValue: 0,
      duration: 420,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }

  function handleDate(value: string) {
    setExamDate(value);

    if (value.trim()) {
      setExamDateUnknown(false);
    }
  }

  function toggleUnknownDate() {
    setExamDateUnknown((current) => {
      const next = !current;
      if (next) setExamDate('');
      return next;
    });
  }

  const nextEnabled = stageIsValid();
  const stageNumber = String(stageIndex + 1).padStart(2, '0');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <View style={styles.root}>
        <AmbientMotion travel={travel} isTravelling={isTravelling} />

        <Animated.View
          pointerEvents="none"
          style={[
            styles.finishGlow,
            {
              backgroundColor: colors.accent,
              opacity: finishGlowOpacity,
              transform: [{ scale: finishGlowScale }],
            },
          ]}
        />

        {showIntro ? (
          <Animated.View
            pointerEvents={journeyStarted ? 'none' : 'auto'}
            style={[
              styles.intro,
              {
                opacity: Animated.multiply(bootOpacity, introOpacity),
                transform: [
                  {
                    translateX: introTranslateX,
                  },
                  {
                    translateY: Animated.add(bootTranslateY, introTranslateY),
                  },
                  {
                    scale: Animated.multiply(bootScale, introScale),
                  },
                ],
              },
            ]}>
            <ThemedText style={styles.jol}>JOL</ThemedText>
            <ThemedText style={styles.pdd}>{copy.brandLabel}</ThemedText>

            <Animated.View style={{ opacity: taglineOpacity }}>
              <ThemedText
                type="small"
                themeColor="textSecondary"
                style={styles.tagline}>
                {dict.splash.tagline}
              </ThemedText>
            </Animated.View>
          </Animated.View>
        ) : null}

        {journeyStarted ? (
          <View pointerEvents="none" style={styles.routeWrap}>
            <RouteScene
              travel={travel}
              isTravelling={isTravelling}
              stageIndex={stageIndex}
            />
          </View>
        ) : null}

        {journeyStarted ? (
          <Animated.View
            pointerEvents={introDone && !isTravelling ? 'auto' : 'none'}
            style={[
              styles.panel,
              {
                opacity: panelOpacity,
                transform: [
                  { translateX: panelTranslateX },
                  { translateY: panelTranslateY },
                ],
              },
            ]}>
            <View style={styles.stageMeta}>
              <View style={[styles.stageDot, { backgroundColor: colors.warning }]} />

              <ThemedText type="smallBold" style={{ color: colors.textSecondary }}>
                {stageNumber}
                {' · '}
                {copy.stageNames[stageIndex]}
              </ThemedText>

              <View style={[styles.stageLine, { backgroundColor: colors.border }]} />
            </View>

            <JourneyStagePanel
              stage={stage}
              colors={colors}
              dict={dict}
              copy={copy}
              lang={lang}
              theme={theme}
              languagePicked={languagePicked}
              name={name}
              category={category}
              examDate={examDate}
              examDateUnknown={examDateUnknown}
              dailyMinutes={dailyMinutes}
              onLanguage={handleLanguage}
              onTheme={handleTheme}
              onName={setName}
              onCategory={setCategory}
              onDate={handleDate}
              onToggleUnknownDate={toggleUnknownDate}
              onMinutes={setDailyMinutes}
            />

            <Pressable
              disabled={!nextEnabled}
              onPress={continueJourney}
              style={({ pressed }) => [
                styles.nextButton,
                {
                  backgroundColor: nextEnabled ? colors.accent : colors.surface2,
                  opacity: pressed ? 0.84 : 1,
                },
              ]}>
              <ThemedText
                type="smallBold"
                style={{
                  color: nextEnabled ? colors.accentForeground : colors.textTertiary,
                }}>
                {stage === 'goal' ? copy.goal.finish : dict.common.next}
                {' →'}
              </ThemedText>
            </Pressable>
          </Animated.View>
        ) : null}

        {!journeyStarted ? (
          <Animated.View
            style={[
              styles.footer,
              {
                opacity: bootOpacity,
                transform: [{ translateY: bootTranslateY }],
              },
            ]}>
            <ThemedText type="small" themeColor="textTertiary" style={styles.hint}>
              {copy.introHint}
            </ThemedText>

            <Pressable
              onPress={beginJourney}
              style={({ pressed }) => [
                styles.continueButton,
                {
                  backgroundColor: colors.accent,
                  opacity: pressed ? 0.84 : 1,
                },
              ]}>
              <ThemedText type="smallBold" style={{ color: colors.accentForeground }}>
                {dict.common.continue} →
              </ThemedText>
            </Pressable>
          </Animated.View>
        ) : null}

        {isTravelling ? (
          <Pressable onPress={speedUpTravel} style={styles.travelSkip} />
        ) : null}

        <Animated.View
          pointerEvents="none"
          style={[
            styles.themeWash,
            {
              backgroundColor: themeWashColor,
              opacity: themeWash,
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  root: {
    flex: 1,
    overflow: 'hidden',
  },
  intro: {
    position: 'absolute',
    left: 24,
    right: 24,
    top: '27%',
    alignItems: 'center',
    zIndex: 3,
  },
  jol: {
    fontSize: 80,
    lineHeight: 82,
    fontWeight: '900',
    letterSpacing: -5.4,
  },
  pdd: {
    marginTop: -8,
    fontSize: 31,
    lineHeight: 37,
    fontWeight: '800',
    letterSpacing: 9,
  },
  tagline: {
    marginTop: 20,
    textAlign: 'center',
  },
  routeWrap: {
    position: 'absolute',
    right: -2,
    top: 103,
    width: 286,
    height: 176,
    zIndex: 2,
  },
  panel: {
    position: 'absolute',
    left: 24,
    right: 24,
    top: 302,
    zIndex: 4,
  },
  stageMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: 16,
  },
  stageDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  stageLine: {
    flex: 1,
    height: 1,
    opacity: 0.65,
  },
  nextButton: {
    marginTop: 18,
    minHeight: 52,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 18,
    alignItems: 'center',
    gap: 14,
  },
  hint: {
    textAlign: 'center',
  },
  continueButton: {
    width: '100%',
    minHeight: 56,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  travelSkip: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 30,
  },
  themeWash: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 50,
  },
  finishGlow: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    left: '50%',
    marginLeft: -120,
    top: 45,
    zIndex: 1,
  },
});
