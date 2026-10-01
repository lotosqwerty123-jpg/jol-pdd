import {
  router,
  useLocalSearchParams,
} from 'expo-router';
import { useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/app-button';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppSettings } from '@/store/app-settings';
import type { JolTheme } from '@/theme/colors';

type Step =
  | 'theme'
  | 'name'
  | 'category'
  | 'examDate'
  | 'dailyMinutes';

const STEPS: Step[] = [
  'theme',
  'name',
  'category',
  'examDate',
  'dailyMinutes',
];

export default function OnboardingRoute() {
  const params = useLocalSearchParams<{
    start?: string;
  }>();

  const {
    lang,
    theme,
    profile,
    setTheme,
    updateProfile,
    finishOnboarding,
  } = useAppSettings();

  const colors = useTheme();

  const [stepIndex, setStepIndex] = useState(() => {
    if (params.start === 'name') {
      return 1;
    }

    if (params.start === 'category') {
      return 2;
    }

    return 0;
  });
  const [name, setName] = useState(profile.name);
  const [category, setCategory] = useState(
    profile.category ?? 'B',
  );
  const [examDate, setExamDate] = useState(
    profile.examDate ?? '',
  );
  const [examDateUnknown, setExamDateUnknown] = useState(
    profile.examDateUnknown,
  );
  const [dailyMinutes, setDailyMinutes] = useState(
    profile.dailyMinutes ?? 15,
  );

  const contentAnimation = useRef(
    new Animated.Value(1),
  ).current;

  const pulse = useRef(new Animated.Value(0)).current;

  const step = STEPS[stepIndex];

  const copy = {
    ru: {
      route: 'ТВОЙ МАРШРУТ',
      stepNames: [
        'ТЕМА',
        'ИМЯ',
        'КАТЕГОРИЯ',
        'ДАТА',
        'ЦЕЛЬ',
      ],

      themeTitle: 'Как выглядит твой маршрут?',
      themeSubtitle:
        'Выбери оформление. Его всегда можно изменить позже.',
      darkTheme: 'Тёмная',
      darkThemeSubtitle: 'Сосредоточенность и контраст',
      lightTheme: 'Светлая',
      lightThemeSubtitle: 'Чистота и больше света',

      nameTitle: 'Как к тебе обращаться?',
      nameSubtitle:
        'JOL будет использовать имя во время подготовки.',
      namePlaceholder: 'Твоё имя',

      categoryTitle: 'К какой категории идём?',
      categorySubtitle:
        'Выбери категорию водительских прав.',
      categoryNote:
        'Основной сценарий текущего MVP — категория B.',

      dateTitle: 'Когда экзамен?',
      dateSubtitle:
        'Дата поможет построить темп подготовки. Если её пока нет — это нормально.',
      datePlaceholder: 'Например: 15.10.2026',
      unknownDate: 'Пока не знаю дату',
      unknownDateSelected:
        'Маршрут будет строиться без конечной даты',

      paceTitle: 'Твой ежедневный темп',
      paceSubtitle:
        'Выбери реалистичную цель. Её можно изменить позже.',
      minutes: 'минут в день',

      back: 'Назад',
      next: 'Далее',
      finish: 'Построить маршрут',
    },

    ky: {
      route: 'СЕНИН МАРШРУТУҢ',
      stepNames: [
        'ТЕМА',
        'АТЫ',
        'КАТЕГОРИЯ',
        'КҮН',
        'МАКСАТ',
      ],

      themeTitle: 'Маршрутуң кандай көрүнөт?',
      themeSubtitle:
        'Көрүнүштү танда. Аны кийин өзгөртүүгө болот.',
      darkTheme: 'Караңгы',
      darkThemeSubtitle: 'Контрасттуу караңгы интерфейс',
      lightTheme: 'Жарык',
      lightThemeSubtitle: 'Таза жарык интерфейс',

      nameTitle: 'Сизди кантип атайлы?',
      nameSubtitle:
        'JOL даярдануу учурунда атыңызды колдонот.',
      namePlaceholder: 'Атыңыз',

      categoryTitle: 'Кайсы категорияга баратабыз?',
      categorySubtitle:
        'Айдоочулук күбөлүктүн категориясын тандаңыз.',
      categoryNote:
        'Учурдагы MVP үчүн негизги сценарий — B категориясы.',

      dateTitle: 'Экзамен качан?',
      dateSubtitle:
        'Күнү даярдык темпин түзүүгө жардам берет. Азырынча билбесеңиз болот.',
      datePlaceholder: 'Мисалы: 15.10.2026',
      unknownDate: 'Азырынча билбейм',
      unknownDateSelected:
        'Маршрут акыркы күнсүз түзүлөт',

      paceTitle: 'Күнүмдүк темпиңиз',
      paceSubtitle:
        'Ыңгайлуу күнүмдүк максатты тандаңыз.',
      minutes: 'мүнөт күнүнө',

      back: 'Артка',
      next: 'Кийинки',
      finish: 'Маршрутту түзүү',
    },

    en: {
      route: 'YOUR ROUTE',
      stepNames: [
        'THEME',
        'NAME',
        'CATEGORY',
        'DATE',
        'GOAL',
      ],

      themeTitle: 'What should your route look like?',
      themeSubtitle:
        'Choose your appearance. You can change it later.',
      darkTheme: 'Dark',
      darkThemeSubtitle: 'Focused, high-contrast interface',
      lightTheme: 'Light',
      lightThemeSubtitle: 'Clean interface with more light',

      nameTitle: 'What should we call you?',
      nameSubtitle:
        'JOL will use your name throughout preparation.',
      namePlaceholder: 'Your name',

      categoryTitle: 'Which category are we heading toward?',
      categorySubtitle:
        'Choose your driving licence category.',
      categoryNote:
        'The current MVP focuses primarily on category B.',

      dateTitle: 'When is your exam?',
      dateSubtitle:
        "The date helps shape your study pace. It's okay if you don't know it yet.",
      datePlaceholder: 'For example: 15.10.2026',
      unknownDate: "I don't know yet",
      unknownDateSelected:
        'Your route will continue without a fixed exam date',

      paceTitle: 'Your daily pace',
      paceSubtitle:
        'Choose a realistic daily goal. You can change it later.',
      minutes: 'minutes per day',

      back: 'Back',
      next: 'Next',
      finish: 'Build my route',
    },
  }[lang];

  const runTransition = (
    nextIndex: number,
    direction: 'forward' | 'back',
  ) => {
    Animated.timing(contentAnimation, {
      toValue: 0,
      duration: 150,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      setStepIndex(nextIndex);

      contentAnimation.setValue(0);

      Animated.timing(contentAnimation, {
        toValue: 1,
        duration: 280,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    });
  };

  const handleExamDateChange = (value: string) => {
    setExamDate(value);

    if (value.trim()) {
      setExamDateUnknown(false);
    }
  };

  const toggleUnknownDate = () => {
    setExamDateUnknown((current) => {
      const next = !current;

      if (next) {
        setExamDate('');
      }

      return next;
    });
  };

  const canContinue = () => {
    if (step === 'name') {
      return Boolean(name.trim());
    }

    if (step === 'examDate') {
      return Boolean(examDate.trim()) || examDateUnknown;
    }

    return true;
  };

  const goNext = () => {
    if (!canContinue()) {
      return;
    }

    if (step === 'name') {
      updateProfile({
        name: name.trim(),
      });
    }

    if (step === 'category') {
      updateProfile({
        category,
      });
    }

    if (step === 'examDate') {
      updateProfile({
        examDate: examDateUnknown
          ? null
          : examDate.trim(),
        examDateUnknown,
      });
    }

    if (step === 'dailyMinutes') {
      updateProfile({
        dailyMinutes,
      });

      finishOnboarding();
      router.replace('/');
      return;
    }

    runTransition(stepIndex + 1, 'forward');
  };

  const goBack = () => {
    if (stepIndex === 0) {
      router.back();
      return;
    }

    runTransition(stepIndex - 1, 'back');
  };

  const translateX = contentAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [34, 0],
  });

  const routeProgress =
    STEPS.length > 1
      ? stepIndex / (STEPS.length - 1)
      : 0;

  const routeWidth = `${routeProgress * 100}%` as `${number}%`;

  const renderChoice = (
    label: string,
    selected: boolean,
    onPress: () => void,
  ) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.choice,
        {
          backgroundColor: selected
            ? colors.accentSoft
            : colors.surface,
          borderColor: selected
            ? colors.accent
            : colors.border,
          opacity: pressed ? 0.86 : 1,
        },
      ]}>
      <ThemedText
        type="smallBold"
        style={{
          color: selected
            ? colors.accentSoftText
            : colors.text,
        }}>
        {label}
      </ThemedText>
    </Pressable>
  );

  const renderThemeChoice = (
    value: JolTheme,
    title: string,
    subtitle: string,
  ) => {
    const selected = theme === value;

    return (
      <Pressable
        onPress={() => setTheme(value)}
        style={({ pressed }) => [
          styles.themeCard,
          {
            backgroundColor: selected
              ? colors.accentSoft
              : colors.surface,
            borderColor: selected
              ? colors.accent
              : colors.border,
            opacity: pressed ? 0.86 : 1,
          },
        ]}>
        <View
          style={[
            styles.themePreview,
            value === 'dark'
              ? styles.darkPreview
              : styles.lightPreview,
          ]}>
          <View
            style={[
              styles.previewRoad,
              {
                backgroundColor:
                  value === 'dark'
                    ? '#B8FF38'
                    : '#477A00',
              },
            ]}
          />

          <View
            style={[
              styles.previewMarker,
              {
                backgroundColor:
                  value === 'dark'
                    ? '#B8FF38'
                    : '#477A00',
              },
            ]}
          />
        </View>

        <View style={styles.themeText}>
          <ThemedText
            type="smallBold"
            style={{
              color: selected
                ? colors.accentSoftText
                : colors.text,
            }}>
            {title}
          </ThemedText>

          <ThemedText
            type="small"
            style={{
              color: selected
                ? colors.accentSoftText
                : colors.textSecondary,
            }}>
            {subtitle}
          </ThemedText>
        </View>

        <View
          style={[
            styles.selectionDot,
            {
              borderColor: selected
                ? colors.accent
                : colors.border,
              backgroundColor: selected
                ? colors.accent
                : 'transparent',
            },
          ]}
        />
      </Pressable>
    );
  };

  return (
    <Screen>
      <View style={styles.routeHeader}>
        <View style={styles.routeTitleRow}>
          <ThemedText
            type="smallBold"
            style={{
              color: colors.accent,
            }}>
            {copy.route}
          </ThemedText>

          <ThemedText
            type="small"
            themeColor="textTertiary">
            {stepIndex + 1}/{STEPS.length}
          </ThemedText>
        </View>

        <View style={styles.route}>
          <View
            style={[
              styles.routeBase,
              {
                backgroundColor: colors.borderStrong,
              },
            ]}
          />

          <View
            style={[
              styles.routeActive,
              {
                width: routeWidth,
                backgroundColor: colors.accent,
              },
            ]}
          />

          {STEPS.map((routeStep, index) => {
            const completed = index < stepIndex;
            const current = index === stepIndex;
            const left =
              `${(index / (STEPS.length - 1)) * 100}%` as `${number}%`;

            return (
              <View
                key={routeStep}
                style={[
                  styles.routeNodeWrap,
                  {
                    left,
                  },
                ]}>
                {current && (
                  <View
                    style={[
                      styles.routePulse,
                      {
                        backgroundColor: colors.accentSoft,
                        borderColor: colors.accent,
                      },
                    ]}
                  />
                )}

                <View
                  style={[
                    styles.routeNode,
                    {
                      backgroundColor:
                        completed || current
                          ? colors.accent
                          : colors.bg,
                      borderColor:
                        completed || current
                          ? colors.accent
                          : colors.borderStrong,
                    },
                  ]}
                />

                <ThemedText
                  type="small"
                  style={[
                    styles.routeLabel,
                    {
                      color: current
                        ? colors.accent
                        : colors.textTertiary,
                    },
                  ]}>
                  {copy.stepNames[index]}
                </ThemedText>
              </View>
            );
          })}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.animatedContent,
            {
              opacity: contentAnimation,
              transform: [{ translateX }],
            },
          ]}>
          {step === 'theme' && (
            <View style={styles.section}>
              <ThemedText type="title">
                {copy.themeTitle}
              </ThemedText>

              <ThemedText themeColor="textSecondary">
                {copy.themeSubtitle}
              </ThemedText>

              <View style={styles.themeList}>
                {renderThemeChoice(
                  'dark',
                  copy.darkTheme,
                  copy.darkThemeSubtitle,
                )}

                {renderThemeChoice(
                  'light',
                  copy.lightTheme,
                  copy.lightThemeSubtitle,
                )}
              </View>
            </View>
          )}

          {step === 'name' && (
            <View style={styles.section}>
              <ThemedText type="title">
                {copy.nameTitle}
              </ThemedText>

              <ThemedText themeColor="textSecondary">
                {copy.nameSubtitle}
              </ThemedText>

              <TextInput
                value={name}
                onChangeText={setName}
                placeholder={copy.namePlaceholder}
                placeholderTextColor={colors.textTertiary}
                autoCapitalize="words"
                style={[
                  styles.input,
                  {
                    color: colors.text,
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              />
            </View>
          )}

          {step === 'category' && (
            <View style={styles.section}>
              <ThemedText type="title">
                {copy.categoryTitle}
              </ThemedText>

              <ThemedText themeColor="textSecondary">
                {copy.categorySubtitle}
              </ThemedText>

              <View style={styles.choiceRow}>
                {renderChoice(
                  'B',
                  category === 'B',
                  () => setCategory('B'),
                )}

                {renderChoice(
                  'A',
                  category === 'A',
                  () => setCategory('A'),
                )}

                {renderChoice(
                  'C',
                  category === 'C',
                  () => setCategory('C'),
                )}
              </View>

              <View
                style={[
                  styles.note,
                  {
                    backgroundColor: colors.accentSoft,
                    borderColor: colors.border,
                  },
                ]}>
                <ThemedText
                  type="small"
                  style={{
                    color: colors.accentSoftText,
                  }}>
                  {copy.categoryNote}
                </ThemedText>
              </View>
            </View>
          )}

          {step === 'examDate' && (
            <View style={styles.section}>
              <ThemedText type="title">
                {copy.dateTitle}
              </ThemedText>

              <ThemedText themeColor="textSecondary">
                {copy.dateSubtitle}
              </ThemedText>

              <TextInput
                value={examDate}
                onChangeText={handleExamDateChange}
                placeholder={copy.datePlaceholder}
                placeholderTextColor={colors.textTertiary}
                keyboardType="numbers-and-punctuation"
                editable={!examDateUnknown}
                style={[
                  styles.input,
                  {
                    color: colors.text,
                    backgroundColor: examDateUnknown
                      ? colors.surface2
                      : colors.surface,
                    borderColor: examDate.trim()
                      ? colors.accent
                      : colors.border,
                    opacity: examDateUnknown
                      ? 0.5
                      : 1,
                  },
                ]}
              />

              <Pressable
                onPress={toggleUnknownDate}
                style={({ pressed }) => [
                  styles.unknownDateCard,
                  {
                    backgroundColor: examDateUnknown
                      ? colors.accentSoft
                      : colors.surface,
                    borderColor: examDateUnknown
                      ? colors.accent
                      : colors.border,
                    opacity: pressed ? 0.86 : 1,
                  },
                ]}>
                <View
                  style={[
                    styles.checkBox,
                    {
                      borderColor: examDateUnknown
                        ? colors.accent
                        : colors.border,
                      backgroundColor: examDateUnknown
                        ? colors.accent
                        : 'transparent',
                    },
                  ]}>
                  {examDateUnknown && (
                    <ThemedText
                      type="smallBold"
                      style={{
                        color: colors.bg,
                      }}>
                      ✓
                    </ThemedText>
                  )}
                </View>

                <View style={styles.unknownDateText}>
                  <ThemedText
                    type="smallBold"
                    style={{
                      color: examDateUnknown
                        ? colors.accentSoftText
                        : colors.text,
                    }}>
                    {copy.unknownDate}
                  </ThemedText>

                  {examDateUnknown && (
                    <ThemedText
                      type="small"
                      style={{
                        color: colors.accentSoftText,
                      }}>
                      {copy.unknownDateSelected}
                    </ThemedText>
                  )}
                </View>
              </Pressable>
            </View>
          )}

          {step === 'dailyMinutes' && (
            <View style={styles.section}>
              <ThemedText type="title">
                {copy.paceTitle}
              </ThemedText>

              <ThemedText themeColor="textSecondary">
                {copy.paceSubtitle}
              </ThemedText>

              <View style={styles.minutesGrid}>
                {[5, 10, 15, 20, 30].map(
                  (minutes) => {
                    const selected =
                      dailyMinutes === minutes;

                    return (
                      <Pressable
                        key={minutes}
                        onPress={() =>
                          setDailyMinutes(minutes)
                        }
                        style={({ pressed }) => [
                          styles.minuteCard,
                          {
                            backgroundColor: selected
                              ? colors.accentSoft
                              : colors.surface,
                            borderColor: selected
                              ? colors.accent
                              : colors.border,
                            opacity: pressed
                              ? 0.86
                              : 1,
                          },
                        ]}>
                        <ThemedText
                          type="title"
                          style={{
                            color: selected
                              ? colors.accentSoftText
                              : colors.text,
                          }}>
                          {minutes}
                        </ThemedText>

                        <ThemedText
                          type="small"
                          style={{
                            color: selected
                              ? colors.accentSoftText
                              : colors.textSecondary,
                          }}>
                          {copy.minutes}
                        </ThemedText>
                      </Pressable>
                    );
                  },
                )}
              </View>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      <View style={styles.actions}>
        <AppButton
          variant="secondary"
          label={copy.back}
          onPress={goBack}
          style={styles.actionButton}
        />

        <AppButton
          label={
            stepIndex === STEPS.length - 1
              ? copy.finish
              : copy.next
          }
          onPress={goNext}
          disabled={!canContinue()}
          style={[
            styles.actionButton,
            !canContinue()
              ? styles.disabled
              : undefined,
          ]}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  routeHeader: {
    paddingTop: Spacing.two,
    gap: Spacing.three,
  },

  routeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  route: {
    height: 66,
    position: 'relative',
    marginHorizontal: 10,
  },

  routeBase: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 9,
    height: 2,
    borderRadius: 999,
  },

  routeActive: {
    position: 'absolute',
    left: 0,
    top: 9,
    height: 3,
    borderRadius: 999,
  },

  routeNodeWrap: {
    position: 'absolute',
    top: 0,
    width: 20,
    marginLeft: -10,
    alignItems: 'center',
  },

  routeNode: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 3,
  },

  routePulse: {
    position: 'absolute',
    top: -5,
    width: 30,
    height: 30,
    borderRadius: 999,
    borderWidth: 1,
    opacity: 0.6,
  },

  routeLabel: {
    position: 'absolute',
    top: 29,
    width: 72,
    textAlign: 'center',
    fontSize: 11,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: Spacing.three,
  },

  animatedContent: {
    width: '100%',
  },

  section: {
    gap: Spacing.three,
  },

  themeList: {
    gap: Spacing.two,
    marginTop: Spacing.one,
  },

  themeCard: {
    minHeight: 108,
    borderWidth: 1,
    borderRadius: 22,
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },

  themePreview: {
    width: 70,
    height: 70,
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  darkPreview: {
    backgroundColor: '#111315',
  },

  lightPreview: {
    backgroundColor: '#F2F4EF',
  },

  previewRoad: {
    height: 4,
    width: '100%',
    borderRadius: 999,
  },

  previewMarker: {
    position: 'absolute',
    width: 13,
    height: 13,
    borderRadius: 999,
    left: 38,
    top: 29,
  },

  themeText: {
    flex: 1,
    gap: Spacing.one,
  },

  selectionDot: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 2,
  },

  input: {
    borderWidth: 1,
    borderRadius: 18,
    minHeight: 58,
    paddingHorizontal: Spacing.three,
    fontSize: 17,
  },

  choiceRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },

  choice: {
    flex: 1,
    minHeight: 64,
    borderWidth: 1,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  note: {
    borderWidth: 1,
    borderRadius: 18,
    padding: Spacing.three,
  },

  unknownDateCard: {
    minHeight: 72,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },

  checkBox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  unknownDateText: {
    flex: 1,
    gap: 2,
  },

  minutesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },

  minuteCard: {
    width: '48%',
    minHeight: 102,
    borderWidth: 1,
    borderRadius: 20,
    padding: Spacing.three,
    justifyContent: 'space-between',
  },

  actions: {
    flexDirection: 'row',
    gap: Spacing.two,
    paddingTop: Spacing.two,
  },

  actionButton: {
    flex: 1,
  },

  disabled: {
    opacity: 0.45,
  },
});