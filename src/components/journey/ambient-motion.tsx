import { useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '@/hooks/use-theme';
import { useAppSettings } from '@/store/app-settings';

type Props = {
  travel?: Animated.Value;
  isTravelling: boolean;
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type Direction = 'ltr' | 'rtl';
type AmbientKind = 'cloud' | 'orb' | 'mist';
type AmbientTone = 'neutral' | 'accent' | 'warning';

type AmbientConfig = {
  kind: AmbientKind;
  tone: AmbientTone;
  width: number;
  height: number;
  topRatio: number;
  direction: Direction;
  duration: number;
  phase: number;
  darkOpacity: number;
  lightOpacity: number;
  drift: number;
  depth: number;
  rotation?: number;
};

// В Patch 9 фон специально разделён на три семейства:
// облака, отдельные частицы-круги и отдельные полосы тумана.
// Они больше не выглядят как один повторяющийся «кружки + прямоугольник».
const LAYERS: AmbientConfig[] = [
  { kind: 'cloud', tone: 'neutral', width: 306, height: 124, topRatio: 0.09, direction: 'rtl', duration: 20500, phase: 0.31, darkOpacity: 0.13, lightOpacity: 0.34, drift: 10, depth: 1.18 },
  { kind: 'orb', tone: 'accent', width: 46, height: 46, topRatio: 0.17, direction: 'ltr', duration: 17300, phase: 0.67, darkOpacity: 0.055, lightOpacity: 0.14, drift: -14, depth: 1.34 },
  { kind: 'mist', tone: 'neutral', width: 214, height: 22, topRatio: 0.25, direction: 'rtl', duration: 28200, phase: 0.11, darkOpacity: 0.045, lightOpacity: 0.14, drift: 8, depth: 0.58, rotation: -4 },
  { kind: 'cloud', tone: 'neutral', width: 242, height: 100, topRatio: 0.34, direction: 'ltr', duration: 24900, phase: 0.79, darkOpacity: 0.105, lightOpacity: 0.29, drift: -8, depth: 0.82 },
  { kind: 'orb', tone: 'warning', width: 30, height: 30, topRatio: 0.43, direction: 'rtl', duration: 15400, phase: 0.24, darkOpacity: 0.045, lightOpacity: 0.105, drift: 16, depth: 1.52 },
  { kind: 'mist', tone: 'accent', width: 156, height: 17, topRatio: 0.51, direction: 'ltr', duration: 22300, phase: 0.48, darkOpacity: 0.032, lightOpacity: 0.105, drift: -7, depth: 0.76, rotation: 5 },
  { kind: 'cloud', tone: 'neutral', width: 276, height: 112, topRatio: 0.61, direction: 'rtl', duration: 29400, phase: 0.53, darkOpacity: 0.095, lightOpacity: 0.27, drift: 11, depth: 0.96 },
  { kind: 'orb', tone: 'neutral', width: 58, height: 58, topRatio: 0.70, direction: 'ltr', duration: 19800, phase: 0.05, darkOpacity: 0.04, lightOpacity: 0.12, drift: -12, depth: 1.22 },
  { kind: 'mist', tone: 'neutral', width: 262, height: 25, topRatio: 0.79, direction: 'rtl', duration: 32700, phase: 0.39, darkOpacity: 0.038, lightOpacity: 0.125, drift: 6, depth: 0.52, rotation: -2 },
  { kind: 'cloud', tone: 'neutral', width: 188, height: 84, topRatio: 0.88, direction: 'ltr', duration: 23600, phase: 0.71, darkOpacity: 0.085, lightOpacity: 0.25, drift: -9, depth: 1.08 },
  { kind: 'orb', tone: 'accent', width: 24, height: 24, topRatio: 0.93, direction: 'rtl', duration: 14100, phase: 0.18, darkOpacity: 0.05, lightOpacity: 0.13, drift: 10, depth: 1.46 },
];

function AmbientLayer({
  config,
  value,
  boost,
  color,
  opacity,
}: {
  config: AmbientConfig;
  value: Animated.Value;
  boost: Animated.Value;
  color: string;
  opacity: number;
}) {
  const hidden = config.width + 110;
  const top = Math.max(18, SCREEN_HEIGHT * config.topRatio - config.height / 2);

  const baseX = value.interpolate({
    inputRange: [0, 1],
    outputRange:
      config.direction === 'rtl'
        ? [SCREEN_WIDTH + hidden, -hidden]
        : [-hidden, SCREEN_WIDTH + hidden],
  });

  const parallax = 34 + config.depth * 58;
  const boostX = boost.interpolate({
    inputRange: [0, 1],
    outputRange:
      config.direction === 'rtl'
        ? [0, -parallax]
        : [0, parallax * 0.9],
  });

  const baseY = value.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, config.drift, 0],
  });
  const boostY = boost.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -3 - config.depth * 4],
  });
  const scale = boost.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1 + config.depth * 0.022],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.layer,
        {
          width: config.width,
          height: config.height,
          top,
          opacity,
          transform: [
            { translateX: Animated.add(baseX, boostX) },
            { translateY: Animated.add(baseY, boostY) },
            { rotate: `${config.rotation ?? 0}deg` },
            { scale },
          ],
        },
      ]}>
      {config.kind === 'cloud' ? (
        <Svg width={config.width} height={config.height} viewBox="0 0 300 120">
          <Path
            d="M20 85 C29 64 49 56 70 61 C76 34 100 20 126 28 C141 11 174 12 190 36 C214 27 244 39 247 63 C269 65 282 76 280 91 C273 105 248 109 221 105 C189 111 157 106 136 108 C102 111 67 109 42 104 C25 101 14 94 20 85 Z"
            fill={color}
          />
        </Svg>
      ) : null}

      {config.kind === 'orb' ? (
        <View
          style={[
            styles.orb,
            {
              width: config.width,
              height: config.height,
              borderRadius: config.width / 2,
              backgroundColor: color,
            },
          ]}
        />
      ) : null}

      {config.kind === 'mist' ? (
        <View
          style={[
            styles.mist,
            {
              width: config.width,
              height: config.height,
              borderRadius: config.height / 2,
              backgroundColor: color,
            },
          ]}
        />
      ) : null}
    </Animated.View>
  );
}

export function AmbientMotion({ isTravelling }: Props) {
  const colors = useTheme();
  const { theme } = useAppSettings();

  const values = useMemo(
    () => LAYERS.map((config) => new Animated.Value(config.phase)),
    [],
  );
  const boost = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const stops = values.map((value, index) => {
      const config = LAYERS[index];
      let cancelled = false;

      const run = (fromCurrent = true) => {
        if (cancelled) return;
        const begin = (current: number) => {
          if (cancelled) return;
          const remaining = Math.max(0.04, 1 - current);
          Animated.timing(value, {
            toValue: 1,
            duration: Math.round(config.duration * remaining),
            useNativeDriver: true,
          }).start(({ finished }) => {
            if (!finished || cancelled) return;
            value.setValue(0);
            run(false);
          });
        };

        if (fromCurrent) value.stopAnimation(begin);
        else begin(0);
      };

      run(true);
      return () => {
        cancelled = true;
        value.stopAnimation();
      };
    });

    return () => stops.forEach((stop) => stop());
  }, [values]);

  useEffect(() => {
    Animated.timing(boost, {
      toValue: isTravelling ? 1 : 0,
      duration: isTravelling ? 240 : 760,
      useNativeDriver: true,
    }).start();
  }, [boost, isTravelling]);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {LAYERS.map((config, index) => {
        const color =
          config.tone === 'accent'
            ? colors.accent
            : config.tone === 'warning'
              ? colors.warning
              : colors.borderStrong;
        const opacity = theme === 'light' ? config.lightOpacity : config.darkOpacity;

        return (
          <AmbientLayer
            key={`${config.kind}-${config.direction}-${config.topRatio}-${index}`}
            config={config}
            value={values[index]}
            boost={boost}
            color={color}
            opacity={opacity}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  layer: { position: 'absolute', left: 0 },
  orb: { position: 'absolute', left: 0, top: 0 },
  mist: { position: 'absolute', left: 0, top: 0 },
});
