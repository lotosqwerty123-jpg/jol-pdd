import { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '@/hooks/use-theme';
import { useAppSettings } from '@/store/app-settings';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export function AppBackdrop() {
  const colors = useTheme();
  const { theme } = useAppSettings();
  const routeDrift = useRef(new Animated.Value(0)).current;
  const mistDrift = useRef(new Animated.Value(0)).current;
  const particleDrift = useRef(new Animated.Value(0)).current;
  const glowPulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const route = Animated.loop(
      Animated.sequence([
        Animated.timing(routeDrift, { toValue: 1, duration: 11500, useNativeDriver: true }),
        Animated.timing(routeDrift, { toValue: 0, duration: 11500, useNativeDriver: true }),
      ]),
    );
    const mist = Animated.loop(
      Animated.sequence([
        Animated.timing(mistDrift, { toValue: 1, duration: 16400, useNativeDriver: true }),
        Animated.timing(mistDrift, { toValue: 0, duration: 16400, useNativeDriver: true }),
      ]),
    );
    const particles = Animated.loop(
      Animated.sequence([
        Animated.timing(particleDrift, { toValue: 1, duration: 9200, useNativeDriver: true }),
        Animated.timing(particleDrift, { toValue: 0, duration: 9200, useNativeDriver: true }),
      ]),
    );
    const glow = Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, { toValue: 1, duration: 6800, useNativeDriver: true }),
        Animated.timing(glowPulse, { toValue: 0, duration: 6800, useNativeDriver: true }),
      ]),
    );

    route.start();
    mist.start();
    particles.start();
    glow.start();

    return () => {
      route.stop();
      mist.stop();
      particles.stop();
      glow.stop();
    };
  }, [glowPulse, mistDrift, particleDrift, routeDrift]);

  const routeX = routeDrift.interpolate({ inputRange: [0, 1], outputRange: [-13, 15] });
  const routeY = routeDrift.interpolate({ inputRange: [0, 1], outputRange: [3, -10] });
  const mistX = mistDrift.interpolate({ inputRange: [0, 1], outputRange: [-18, 24] });
  const mistXReverse = mistDrift.interpolate({ inputRange: [0, 1], outputRange: [14, -20] });
  const mistScale = mistDrift.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1.06] });
  const particleY = particleDrift.interpolate({ inputRange: [0, 1], outputRange: [7, -9] });
  const particleYReverse = particleDrift.interpolate({ inputRange: [0, 1], outputRange: [-5, 8] });
  const particleX = particleDrift.interpolate({ inputRange: [0, 1], outputRange: [-4, 7] });
  const glowScale = glowPulse.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1.08] });
  const dark = theme === 'dark';
  const sideGlowOpacity = glowPulse.interpolate({ inputRange: [0, 1], outputRange: dark ? [0.012, 0.026] : [0.008, 0.018] });

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Animated.View
        style={[
          styles.glow,
          styles.glowTop,
          {
            backgroundColor: colors.accent,
            opacity: dark ? 0.068 : 0.045,
            transform: [{ scale: glowScale }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.glow,
          styles.glowBottom,
          {
            backgroundColor: colors.warning,
            opacity: dark ? 0.04 : 0.028,
            transform: [{ scale: glowScale }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.glow,
          styles.glowSide,
          {
            backgroundColor: colors.borderStrong,
            opacity: sideGlowOpacity,
            transform: [{ scale: glowScale }],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.roadLayer,
          {
            opacity: dark ? 0.2 : 0.12,
            transform: [{ translateX: routeX }, { translateY: routeY }],
          },
        ]}>
        <Svg width={SCREEN_WIDTH + 86} height={SCREEN_HEIGHT} viewBox={`0 0 ${SCREEN_WIDTH + 86} ${SCREEN_HEIGHT}`}>
          <Path
            d={`M -50 ${SCREEN_HEIGHT * 0.22} C ${SCREEN_WIDTH * 0.2} ${SCREEN_HEIGHT * 0.12}, ${SCREEN_WIDTH * 0.64} ${SCREEN_HEIGHT * 0.41}, ${SCREEN_WIDTH + 95} ${SCREEN_HEIGHT * 0.26}`}
            stroke={colors.borderStrong}
            strokeWidth="1.3"
            strokeDasharray="8 18"
            fill="none"
          />
          <Path
            d={`M -85 ${SCREEN_HEIGHT * 0.72} C ${SCREEN_WIDTH * 0.24} ${SCREEN_HEIGHT * 0.57}, ${SCREEN_WIDTH * 0.62} ${SCREEN_HEIGHT * 0.87}, ${SCREEN_WIDTH + 105} ${SCREEN_HEIGHT * 0.65}`}
            stroke={colors.accent}
            strokeWidth="1"
            strokeDasharray="4 22"
            fill="none"
          />
          <Path
            d={`M ${SCREEN_WIDTH * 0.08} ${SCREEN_HEIGHT * 0.93} C ${SCREEN_WIDTH * 0.3} ${SCREEN_HEIGHT * 0.82}, ${SCREEN_WIDTH * 0.58} ${SCREEN_HEIGHT * 0.97}, ${SCREEN_WIDTH * 0.9} ${SCREEN_HEIGHT * 0.84}`}
            stroke={colors.borderStrong}
            strokeWidth="0.8"
            strokeDasharray="2 24"
            fill="none"
          />
        </Svg>
      </Animated.View>

      <Animated.View
        style={[
          styles.mist,
          styles.mistOne,
          {
            backgroundColor: colors.borderStrong,
            opacity: dark ? 0.1 : 0.07,
            transform: [{ translateX: mistX }, { scaleX: mistScale }, { rotate: '-7deg' }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.mist,
          styles.mistTwo,
          {
            backgroundColor: colors.accent,
            opacity: dark ? 0.052 : 0.036,
            transform: [{ translateX: mistXReverse }, { scaleX: mistScale }, { rotate: '4deg' }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.mist,
          styles.mistThree,
          {
            backgroundColor: colors.warning,
            opacity: dark ? 0.025 : 0.018,
            transform: [{ translateX: mistX }, { scaleX: mistScale }, { rotate: '-3deg' }],
          },
        ]}
      />

      <Animated.View style={[styles.dot, styles.dotOne, { backgroundColor: colors.accent, opacity: dark ? 0.24 : 0.16, transform: [{ translateY: particleY }, { translateX: particleX }] }]} />
      <Animated.View style={[styles.dot, styles.dotTwo, { backgroundColor: colors.borderStrong, opacity: dark ? 0.36 : 0.22, transform: [{ translateY: particleYReverse }] }]} />
      <Animated.View style={[styles.dot, styles.dotThree, { backgroundColor: colors.warning, opacity: dark ? 0.18 : 0.12, transform: [{ translateY: particleY }, { translateX: particleX }] }]} />
      <Animated.View style={[styles.dot, styles.dotFour, { backgroundColor: colors.accent, opacity: dark ? 0.12 : 0.09, transform: [{ translateY: particleYReverse }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  roadLayer: { position: 'absolute', top: 0, right: -43, bottom: 0, left: -43 },
  glow: { position: 'absolute', borderRadius: 999 },
  glowTop: { width: 290, height: 290, right: -142, top: -98 },
  glowBottom: { width: 245, height: 245, left: -125, bottom: 10 },
  glowSide: { width: 160, height: 160, right: -98, top: '52%' },
  mist: { position: 'absolute', borderRadius: 999 },
  mistOne: { width: 190, height: 14, right: -34, top: '34%' },
  mistTwo: { width: 150, height: 9, left: -28, top: '60%' },
  mistThree: { width: 112, height: 7, right: '18%', top: '78%' },
  dot: { position: 'absolute', borderRadius: 999 },
  dotOne: { width: 7, height: 7, right: '15%', top: '18%' },
  dotTwo: { width: 4, height: 4, left: '12%', top: '47%' },
  dotThree: { width: 5, height: 5, right: '23%', bottom: '17%' },
  dotFour: { width: 3, height: 3, left: '24%', top: '27%' },
});
