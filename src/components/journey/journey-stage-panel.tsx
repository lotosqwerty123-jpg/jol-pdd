import {
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
  
  import {
    ThemedText,
} from '@/components/themed-text';
  
  import type {
    JourneyCopy,
} from '@/components/journey/journey-copy';
  
  import type {
    JolDict,
} from '@/i18n/dictionaries';
  
  import type {
    Lang,
} from '@/i18n/types';
  
  import type {
    JolTheme,
    getPalette,
} from '@/theme/colors';
  
  type Colors =
    ReturnType<typeof getPalette>;
  
  type JourneyStage =
    | 'language'
    | 'theme'
    | 'name'
    | 'category'
    | 'date'
    | 'goal';
  
  type Props = {
    stage: JourneyStage;
    colors: Colors;
    dict: JolDict;
    copy: JourneyCopy;
    lang: Lang;
    theme: JolTheme;
  
    languagePicked: boolean;
  
    name: string;
    category: string;
  
    examDate: string;
    examDateUnknown: boolean;
  
    dailyMinutes: number;
  
    onLanguage:
      (lang: Lang) => void;
  
    onTheme:
      (theme: JolTheme) => void;
  
    onName:
      (value: string) => void;
  
    onCategory:
      (value: string) => void;
  
    onDate:
      (value: string) => void;
  
    onToggleUnknownDate:
      () => void;
  
    onMinutes:
      (value: number) => void;
  };
  
  export function JourneyStagePanel({
    stage,
    colors,
    dict,
    copy,
    lang,
    theme,
    languagePicked,
    name,
    category,
    examDate,
    examDateUnknown,
    dailyMinutes,
    onLanguage,
    onTheme,
    onName,
    onCategory,
    onDate,
    onToggleUnknownDate,
    onMinutes,
  }: Props) {
    function choice(
      label: string,
      selected: boolean,
      onPress: () => void,
    ) {
      return (
        <Pressable
          onPress={onPress}
  
          style={({ pressed }) => [
            styles.choiceCard,
  
            {
              backgroundColor:
                selected
                  ? colors.accentSoft
                  : colors.surface,
  
              borderColor:
                selected
                  ? colors.accent
                  : colors.border,
  
              opacity:
                pressed
                  ? 0.82
                  : 1,
            },
          ]}>
  
          <ThemedText
            type="subtitle"
            style={{
              color:
                selected
                  ? colors.accentSoftText
                  : colors.text,
            }}>
  
            {label}
          </ThemedText>
        </Pressable>
      );
    }
  
    function themeCard(
      value: JolTheme,
      title: string,
      subtitle: string,
    ) {
      const selected =
        theme === value;
  
      return (
        <Pressable
          onPress={() =>
            onTheme(value)
          }
  
          style={({ pressed }) => [
            styles.themeCard,
  
            {
              backgroundColor:
                selected
                  ? colors.accentSoft
                  : colors.surface,
  
              borderColor:
                selected
                  ? colors.accent
                  : colors.border,
  
              opacity:
                pressed
                  ? 0.84
                  : 1,
            },
          ]}>
  
          <View
            style={[
              styles.themePreview,
  
              {
                backgroundColor:
                  value === 'dark'
                    ? '#111317'
                    : '#F3F4F1',
              },
            ]}>
  
            <View
              style={[
                styles.previewRoad,
  
                {
                  backgroundColor:
                    value === 'dark'
                      ? '#C8FF4D'
                      : '#2E7D32',
                },
              ]}
            />
  
            <View
              style={[
                styles.previewMarker,
  
                {
                  backgroundColor:
                    value === 'dark'
                      ? '#F5C84C'
                      : '#B8860B',
                },
              ]}
            />
          </View>
  
          <View
            style={styles.flex}>
  
            <ThemedText
              type="subtitle"
              style={{
                color:
                  selected
                    ? colors.accentSoftText
                    : colors.text,
              }}>
  
              {title}
            </ThemedText>
  
            <ThemedText
              type="small"
              style={{
                color:
                  selected
                    ? colors.accentSoftText
                    : colors.textSecondary,
              }}>
  
              {subtitle}
            </ThemedText>
          </View>
  
          <View
            style={[
              styles.radio,
  
              {
                borderColor:
                  selected
                    ? colors.accent
                    : colors.borderStrong,
              },
            ]}>
  
            {selected ? (
              <View
                style={[
                  styles.radioInner,
  
                  {
                    backgroundColor:
                      colors.accent,
                  },
                ]}
              />
            ) : null}
          </View>
        </Pressable>
      );
    }
  
    if (stage === 'language') {
      return (
        <>
          <View style={styles.header}>
  
            <ThemedText type="title">
              {dict.language.title}
            </ThemedText>
  
            <ThemedText
              type="small"
              themeColor="textSecondary">
  
              {dict.language.subtitle}
            </ThemedText>
          </View>
  
          <View style={styles.stack}>
  
            {dict.language.options.map(
              (option) => {
                const selected =
                  languagePicked &&
                  lang === option.id;
  
                return (
                  <Pressable
                    key={option.id}
  
                    onPress={() =>
                      onLanguage(
                        option.id,
                      )
                    }
  
                    style={({ pressed }) => [
                      styles.languageCard,
  
                      {
                        backgroundColor:
                          selected
                            ? colors.accentSoft
                            : colors.surface,
  
                        borderColor:
                          selected
                            ? colors.accent
                            : colors.border,
  
                        opacity:
                          pressed
                            ? 0.84
                            : 1,
                      },
                    ]}>
  
                    <View style={styles.flex}>
  
                      <ThemedText
                        type="subtitle"
                        style={
                          selected
                            ? {
                                color:
                                  colors.accentSoftText,
                              }
                            : undefined
                        }>
  
                        {option.title}
                      </ThemedText>
  
                      <ThemedText
                        type="small"
                        themeColor="textSecondary">
  
                        {option.subtitle}
                      </ThemedText>
                    </View>
  
                    <View
                      style={[
                        styles.radio,
  
                        {
                          borderColor:
                            selected
                              ? colors.accent
                              : colors.borderStrong,
                        },
                      ]}>
  
                      {selected ? (
                        <View
                          style={[
                            styles.radioInner,
  
                            {
                              backgroundColor:
                                colors.accent,
                            },
                          ]}
                        />
                      ) : null}
                    </View>
                  </Pressable>
                );
              },
            )}
          </View>
        </>
      );
    }
  
    if (stage === 'theme') {
      return (
        <>
          <View style={styles.header}>
  
            <ThemedText type="title">
              {copy.theme.title}
            </ThemedText>
  
            <ThemedText
              type="small"
              themeColor="textSecondary">
  
              {copy.theme.subtitle}
            </ThemedText>
          </View>
  
          <View style={styles.stack}>
  
            {themeCard(
              'dark',
              copy.theme.dark,
              copy.theme.darkSub,
            )}
  
            {themeCard(
              'light',
              copy.theme.light,
              copy.theme.lightSub,
            )}
          </View>
        </>
      );
    }
  
    if (stage === 'name') {
      return (
        <>
          <View style={styles.header}>
  
            <ThemedText type="title">
              {copy.name.title}
            </ThemedText>
  
            <ThemedText
              type="small"
              themeColor="textSecondary">
  
              {copy.name.subtitle}
            </ThemedText>
          </View>
  
          <TextInput
            value={name}
            onChangeText={onName}
  
            placeholder={
              copy.name.placeholder
            }
  
            placeholderTextColor={
              colors.textTertiary
            }
  
            selectionColor={
              colors.accent
            }
  
            autoCapitalize="words"
            returnKeyType="done"
  
            style={[
              styles.input,
  
              {
                color:
                  colors.text,
  
                backgroundColor:
                  colors.surface,
  
                borderColor:
                  name.trim()
                    ? colors.accent
                    : colors.border,
              },
            ]}
          />
        </>
      );
    }
  
    if (stage === 'category') {
      return (
        <>
          <View style={styles.header}>
  
            <ThemedText type="title">
              {copy.category.title}
            </ThemedText>
  
            <ThemedText
              type="small"
              themeColor="textSecondary">
  
              {copy.category.subtitle}
            </ThemedText>
          </View>
  
          <View style={styles.choiceRow}>
            {['A', 'A1', 'B', 'B1', 'C', 'C1', 'D', 'D1', 'BE', 'CE', 'C1E', 'DE', 'D1E'].map((value) => (
              <Pressable
                key={value}
                onPress={() => onCategory(value)}
                style={({ pressed }) => [
                  styles.categoryChip,
                  {
                    backgroundColor: category === value ? colors.accentSoft : colors.surface,
                    borderColor: category === value ? colors.accent : colors.border,
                    opacity: pressed ? 0.82 : 1,
                  },
                ]}>
                <ThemedText
                  type="smallBold"
                  style={{ color: category === value ? colors.accentSoftText : colors.text }}>
                  {value}
                </ThemedText>
              </Pressable>
            ))}
          </View>
  
          <View
            style={[
              styles.note,
  
              {
                backgroundColor:
                  colors.accentSoft,
  
                borderColor:
                  colors.border,
              },
            ]}>
  
            <ThemedText
              type="small"
              style={{
                color:
                  colors.accentSoftText,
              }}>
  
              {copy.category.note}
            </ThemedText>
          </View>
        </>
      );
    }
  
    if (stage === 'date') {
      return (
        <>
          <View style={styles.header}>
  
            <ThemedText type="title">
              {copy.date.title}
            </ThemedText>
  
            <ThemedText
              type="small"
              themeColor="textSecondary">
  
              {copy.date.subtitle}
            </ThemedText>
          </View>
  
          <TextInput
            value={examDate}
            onChangeText={onDate}
  
            placeholder={
              copy.date.placeholder
            }
  
            placeholderTextColor={
              colors.textTertiary
            }
  
            selectionColor={
              colors.accent
            }
  
            keyboardType=
              "numbers-and-punctuation"
  
            editable={
              !examDateUnknown
            }
  
            style={[
              styles.input,
  
              {
                color:
                  colors.text,
  
                backgroundColor:
                  examDateUnknown
                    ? colors.surface2
                    : colors.surface,
  
                borderColor:
                  examDate.trim()
                    ? colors.accent
                    : colors.border,
  
                opacity:
                  examDateUnknown
                    ? 0.52
                    : 1,
              },
            ]}
          />
  
          <Pressable
            onPress={
              onToggleUnknownDate
            }
  
            style={({ pressed }) => [
              styles.unknownCard,
  
              {
                backgroundColor:
                  examDateUnknown
                    ? colors.accentSoft
                    : colors.surface,
  
                borderColor:
                  examDateUnknown
                    ? colors.accent
                    : colors.border,
  
                opacity:
                  pressed
                    ? 0.84
                    : 1,
              },
            ]}>
  
            <View
              style={[
                styles.checkBox,
  
                {
                  borderColor:
                    examDateUnknown
                      ? colors.accent
                      : colors.borderStrong,
  
                  backgroundColor:
                    examDateUnknown
                      ? colors.accent
                      : 'transparent',
                },
              ]}>
  
              {examDateUnknown ? (
                <ThemedText
                  type="smallBold"
                  style={{
                    color:
                      colors.accentForeground,
                  }}>
  
                  ✓
                </ThemedText>
              ) : null}
            </View>
  
            <View style={styles.flex}>
  
              <ThemedText
                type="smallBold"
                style={{
                  color:
                    examDateUnknown
                      ? colors.accentSoftText
                      : colors.text,
                }}>
  
                {copy.date.unknown}
              </ThemedText>
  
              {examDateUnknown ? (
                <ThemedText
                  type="small"
                  style={{
                    color:
                      colors.accentSoftText,
                  }}>
  
                  {
                    copy.date
                      .unknownSelected
                  }
                </ThemedText>
              ) : null}
            </View>
          </Pressable>
        </>
      );
    }
  
    return (
      <>
        <View style={styles.header}>
  
          <ThemedText type="title">
            {copy.goal.title}
          </ThemedText>
  
          <ThemedText
            type="small"
            themeColor="textSecondary">
  
            {copy.goal.subtitle}
          </ThemedText>
        </View>
  
        <View style={styles.minutesGrid}>
  
          {[5, 10, 15, 20, 30].map(
            (minutes) => {
              const selected =
                dailyMinutes ===
                minutes;
  
              return (
                <Pressable
                  key={minutes}
  
                  onPress={() =>
                    onMinutes(
                      minutes,
                    )
                  }
  
                  style={({ pressed }) => [
                    styles.minuteCard,
  
                    {
                      backgroundColor:
                        selected
                          ? colors.accentSoft
                          : colors.surface,
  
                      borderColor:
                        selected
                          ? colors.accent
                          : colors.border,
  
                      opacity:
                        pressed
                          ? 0.84
                          : 1,
                    },
                  ]}>
  
                  <ThemedText
                    type="title"
                    style={{
                      color:
                        selected
                          ? colors.accentSoftText
                          : colors.text,
                    }}>
  
                    {minutes}
                  </ThemedText>
  
                  <ThemedText
                    type="small"
                    style={{
                      color:
                        selected
                          ? colors.accentSoftText
                          : colors.textSecondary,
                    }}>
  
                    {copy.goal.minutes}
                  </ThemedText>
                </Pressable>
              );
            },
          )}
        </View>
      </>
    );
  }
  
  const styles =
    StyleSheet.create({
      header: {
        gap: 7,
        marginBottom: 18,
      },
  
      stack: {
        gap: 10,
      },
  
      flex: {
        flex: 1,
        gap: 3,
      },
  
      languageCard: {
        minHeight: 69,
  
        borderWidth: 1,
        borderRadius: 21,
  
        paddingHorizontal: 17,
        paddingVertical: 12,
  
        flexDirection: 'row',
  
        alignItems: 'center',
  
        gap: 14,
      },
  
      radio: {
        width: 21,
        height: 21,
  
        borderRadius: 11,
        borderWidth: 2,
  
        alignItems: 'center',
  
        justifyContent:
          'center',
      },
  
      radioInner: {
        width: 9,
        height: 9,
  
        borderRadius: 5,
      },
  
      themeCard: {
        minHeight: 90,
  
        borderWidth: 1,
        borderRadius: 22,
  
        padding: 14,
  
        flexDirection: 'row',
  
        alignItems: 'center',
  
        gap: 14,
      },
  
      themePreview: {
        width: 68,
        height: 54,
  
        borderRadius: 15,
  
        overflow: 'hidden',
  
        position: 'relative',
      },
  
      previewRoad: {
        position: 'absolute',
  
        width: 51,
        height: 2,
  
        left: 9,
        top: 29,
  
        borderRadius: 999,
  
        transform: [
          {
            rotate: '-14deg',
          },
        ],
      },
  
      previewMarker: {
        position: 'absolute',
  
        right: 12,
        top: 14,
  
        width: 11,
        height: 11,
  
        borderRadius: 6,
      },
  
      input: {
        minHeight: 60,
  
        borderWidth: 1,
        borderRadius: 19,
  
        paddingHorizontal: 17,
  
        fontSize: 17,
        fontWeight: '600',
      },
  
      choiceRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
      },

      categoryChip: {
        minWidth: 54,
        minHeight: 42,
        borderWidth: 1,
        borderRadius: 14,
        paddingHorizontal: 11,
        alignItems: 'center',
        justifyContent: 'center',
      },
  
      choiceCard: {
        flex: 1,
  
        minHeight: 70,
  
        borderWidth: 1,
        borderRadius: 20,
  
        alignItems: 'center',
  
        justifyContent:
          'center',
      },
  
      note: {
        marginTop: 12,
  
        borderWidth: 1,
        borderRadius: 17,
  
        padding: 13,
      },
  
      unknownCard: {
        marginTop: 12,
  
        minHeight: 70,
  
        borderWidth: 1,
        borderRadius: 19,
  
        paddingHorizontal: 15,
        paddingVertical: 12,
  
        flexDirection: 'row',
  
        alignItems: 'center',
  
        gap: 12,
      },
  
      checkBox: {
        width: 24,
        height: 24,
  
        borderRadius: 7,
        borderWidth: 1.5,
  
        alignItems: 'center',
  
        justifyContent:
          'center',
      },
  
      minutesGrid: {
        flexDirection: 'row',
  
        flexWrap: 'wrap',
  
        gap: 10,
      },
  
      minuteCard: {
        width: '30.5%',
  
        minHeight: 88,
  
        borderWidth: 1,
        borderRadius: 20,
  
        paddingHorizontal: 8,
  
        alignItems: 'center',
  
        justifyContent:
          'center',
      },
    });