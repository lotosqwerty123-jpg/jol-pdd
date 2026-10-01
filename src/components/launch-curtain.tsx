import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useAppSettings } from '@/store/app-settings';

export function LaunchCurtain({ onDone }: { onDone: () => void }) {
  const colors = useTheme();
  const { lang } = useAppSettings();
  const subtitle = lang === 'ky' ? 'ЖЭЭ · КЫРГЫЗСТАН' : lang === 'en' ? 'ROAD RULES · KYRGYZSTAN' : 'ПДД · КЫРГЫЗСТАН';

  const curtainOpacity = useRef(new Animated.Value(1)).current;
  const markOpacity = useRef(new Animated.Value(0)).current;
  const markScale = useRef(new Animated.Value(0.88)).current;
  const markY = useRef(new Animated.Value(10)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const routeProgress = useRef(new Animated.Value(0)).current;
  const dotProgress = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const ambient = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const ambientLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(ambient, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(ambient, { toValue: 0, duration: 900, useNativeDriver: true }),
      ]),
    );
    ambientLoop.start();

    const sequence = Animated.sequence([
      Animated.parallel([
        Animated.timing(markOpacity, { toValue: 1, duration: 220, useNativeDriver: true }),
        Animated.spring(markScale, { toValue: 1, friction: 8, tension: 90, useNativeDriver: true }),
        Animated.timing(markY, { toValue: 0, duration: 340, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(subtitleOpacity, { toValue: 1, duration: 210, useNativeDriver: true }),
        Animated.timing(routeProgress, { toValue: 1, duration: 390, useNativeDriver: true }),
        Animated.timing(dotProgress, { toValue: 1, duration: 520, useNativeDriver: true }),
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1, duration: 260, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 0, duration: 260, useNativeDriver: true }),
        ]),
      ]),
      Animated.delay(130),
      Animated.timing(curtainOpacity, { toValue: 0, duration: 310, useNativeDriver: true }),
    ]);

    sequence.start(({ finished }) => {
      ambientLoop.stop();
      if (finished) onDone();
    });

    return () => {
      sequence.stop();
      ambientLoop.stop();
    };
  }, [ambient, curtainOpacity, dotProgress, markOpacity, markScale, markY, onDone, pulse, routeProgress, subtitleOpacity]);

  const lineScale = routeProgress.interpolate({ inputRange: [0, 1], outputRange: [0.01, 1] });
  const dotX = dotProgress.interpolate({ inputRange: [0, 1], outputRange: [-64, 64] });
  const pulseScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.6, 2.25] });
  const pulseOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.55, 0] });
  const ambientX = ambient.interpolate({ inputRange: [0, 1], outputRange: [-9, 12] });
  const ambientY = ambient.interpolate({ inputRange: [0, 1], outputRange: [5, -6] });

  return (
    <Animated.View pointerEvents="auto" style={[styles.overlay, { backgroundColor: colors.bg, opacity: curtainOpacity }]}> 
      <Animated.View
        style={[
          styles.glow,
          styles.glowMain,
          { backgroundColor: colors.accent, opacity: 0.08, transform: [{ translateX: ambientX }, { translateY: ambientY }] },
        ]}
      />
      <Animated.View
        style={[
          styles.glow,
          styles.glowWarm,
          { backgroundColor: colors.warning, opacity: 0.035, transform: [{ translateX: ambientX }] },
        ]}
      />

      <Animated.View style={[styles.mark, { opacity: markOpacity, transform: [{ scale: markScale }, { translateY: markY }] }]}> 
        <View style={styles.logoRow}>
          <View style={[styles.logoDash, { backgroundColor: colors.accent }]} />
          <ThemedText style={[styles.logo, { color: colors.text }]}>JOL</ThemedText>
          <View style={[styles.logoDot, { backgroundColor: colors.accent }]} />
        </View>
        <Animated.View style={{ opacity: subtitleOpacity }}>
          <ThemedText type="smallBold" style={[styles.sub, { color: colors.accent }]}>{subtitle}</ThemedText>
        </Animated.View>
      </Animated.View>

      <View style={styles.routeWrap}>
        <Animated.View style={[styles.routeLine, { backgroundColor: colors.borderStrong, transform: [{ scaleX: lineScale }] }]} />
        <Animated.View style={[styles.routeDash, styles.routeDashOne, { backgroundColor: colors.borderStrong, opacity: subtitleOpacity }]} />
        <Animated.View style={[styles.routeDash, styles.routeDashTwo, { backgroundColor: colors.borderStrong, opacity: subtitleOpacity }]} />
        <Animated.View style={[styles.pulse, { borderColor: colors.accent, opacity: pulseOpacity, transform: [{ translateX: dotX }, { scale: pulseScale }] }]} />
        <Animated.View style={[styles.routeDot, { backgroundColor: colors.accent, transform: [{ translateX: dotX }] }]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 999, alignItems: 'center', justifyContent: 'center', gap: 30, overflow: 'hidden' },
  mark: { alignItems: 'center' },
  glow: { position: 'absolute', borderRadius: 999 },
  glowMain: { width: 340, height: 340, right: -120, top: '18%' },
  glowWarm: { width: 270, height: 270, left: -120, bottom: '12%' },
  logoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 11 },
  logoDash: { width: 24, height: 3, borderRadius: 999 },
  logoDot: { width: 8, height: 8, borderRadius: 999 },
  logo: { fontSize: 52, lineHeight: 58, fontWeight: '900', letterSpacing: 7.5, textAlign: 'center' },
  sub: { marginTop: 6, letterSpacing: 2.1, textAlign: 'center' },
  routeWrap: { width: 154, height: 24, alignItems: 'center', justifyContent: 'center' },
  routeLine: { width: 136, height: 2, borderRadius: 999 },
  routeDash: { position: 'absolute', width: 12, height: 2, borderRadius: 999 },
  routeDashOne: { left: 24 },
  routeDashTwo: { right: 24 },
  routeDot: { position: 'absolute', width: 10, height: 10, borderRadius: 5 },
  pulse: { position: 'absolute', width: 14, height: 14, borderRadius: 999, borderWidth: 1.5 },
});
