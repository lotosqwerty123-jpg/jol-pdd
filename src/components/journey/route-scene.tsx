import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { useTheme } from '@/hooks/use-theme';
import {
  ROUTE_CAMERA_X,
  ROUTE_MARKER_X,
  ROUTE_MARKER_Y,
  ROUTE_PATH,
  ROUTE_STOPS,
  ROUTE_TRAVEL_INPUT,
  ROUTE_VIEWPORT_HEIGHT,
  ROUTE_VIEWPORT_WIDTH,
  ROUTE_WORLD_HEIGHT,
  ROUTE_WORLD_WIDTH,
} from '@/components/journey/route-geometry';

type RouteSceneProps = {
  travel: Animated.Value;
  isTravelling: boolean;
  stageIndex: number;
};

export function RouteScene({
  travel,
  isTravelling,
  stageIndex,
}: RouteSceneProps) {
  const colors = useTheme();

  // Все значения внутри RouteScene остаются JS-driven.
  // Это специально: travel тоже JS-driven, поэтому смешивания драйверов нет.
  const reveal = useRef(new Animated.Value(0)).current;
  const arrivalPulse = useRef(new Animated.Value(0)).current;
  const sceneDrive = useRef(new Animated.Value(0)).current;
  const radarPulse = useRef(new Animated.Value(0)).current;
  const previousTravelling = useRef(false);
  const [showRadar, setShowRadar] = useState(true);

  useEffect(() => {
    Animated.timing(reveal, {
      toValue: 1,
      duration: 520,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [reveal]);

  useEffect(() => {
    if (isTravelling) {
      setShowRadar(false);
      arrivalPulse.stopAnimation();
      arrivalPulse.setValue(0);
    }

    if (previousTravelling.current && !isTravelling) {
      setShowRadar(false);
      arrivalPulse.stopAnimation();
      arrivalPulse.setValue(0);

      Animated.timing(arrivalPulse, {
        toValue: 1,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          setShowRadar(true);
        }
      });
    }

    previousTravelling.current = isTravelling;
  }, [arrivalPulse, isTravelling]);

  useEffect(() => {
    Animated.timing(sceneDrive, {
      toValue: isTravelling ? 1 : 0,
      duration: isTravelling ? 280 : 620,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [isTravelling, sceneDrive]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(radarPulse, { toValue: 1, duration: 920, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
        Animated.timing(radarPulse, { toValue: 0, duration: 920, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [radarPulse]);

  const markerX = travel.interpolate({
    inputRange: ROUTE_TRAVEL_INPUT,
    outputRange: ROUTE_MARKER_X,
    extrapolate: 'clamp',
  });

  const markerY = travel.interpolate({
    inputRange: ROUTE_TRAVEL_INPUT,
    outputRange: ROUTE_MARKER_Y,
    extrapolate: 'clamp',
  });

  const cameraX = travel.interpolate({
    inputRange: ROUTE_TRAVEL_INPUT,
    outputRange: ROUTE_CAMERA_X,
    extrapolate: 'clamp',
  });

  const sceneOpacity = reveal.interpolate({
    inputRange: [0, 0.12, 1],
    outputRange: [0, 0.25, 1],
    extrapolate: 'clamp',
  });

  const sceneTranslateX = reveal.interpolate({
    inputRange: [0, 1],
    outputRange: [28, 0],
    extrapolate: 'clamp',
  });

  const markerOpacity = reveal.interpolate({
    inputRange: [0, 0.34, 1],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  const arrivalOpacity = arrivalPulse.interpolate({
    inputRange: [0, 0.18, 1],
    outputRange: [0, 0.36, 0],
  });

  const arrivalScale = arrivalPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.62, 2.85],
  });

  const sceneScale = sceneDrive.interpolate({ inputRange: [0, 1], outputRange: [1, 1.028] });
  const sceneTranslateY = sceneDrive.interpolate({ inputRange: [0, 1], outputRange: [0, -5] });
  const sceneTravelX = sceneDrive.interpolate({ inputRange: [0, 1], outputRange: [0, -4] });
  const radarScale = radarPulse.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1.28] });
  const radarOpacity = radarPulse.interpolate({ inputRange: [0, 1], outputRange: [0.28, 0.08] });

  return (
    <View pointerEvents="none" style={styles.viewport}>
      <Animated.View
        style={[
          styles.world,
          {
            opacity: sceneOpacity,
            transform: [
              { translateX: Animated.add(Animated.add(cameraX, sceneTranslateX), sceneTravelX) },
              { translateY: sceneTranslateY },
              { scale: sceneScale },
            ],
          },
        ]}>
        <Svg
          width={ROUTE_WORLD_WIDTH}
          height={ROUTE_WORLD_HEIGHT}
          viewBox={`0 0 ${ROUTE_WORLD_WIDTH} ${ROUTE_WORLD_HEIGHT}`}>
          <Path
            d={ROUTE_PATH}
            fill="none"
            stroke={colors.borderStrong}
            strokeWidth={9}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.08}
          />

          <Path
            d={ROUTE_PATH}
            fill="none"
            stroke={colors.borderStrong}
            strokeWidth={1.35}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.69}
          />

          <Path
            d={ROUTE_PATH}
            fill="none"
            stroke={colors.accent}
            strokeWidth={2.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1 10"
          />

          {ROUTE_STOPS.map((point, index) => {
            const passed = index < stageIndex;
            const current = index === stageIndex;
            const next = index === stageIndex + 1;

            return (
              <Circle
                key={index}
                cx={point.x}
                cy={point.y}
                r={current ? 8 : next ? 7 : 5.5}
                fill={colors.bg}
                stroke={
                  current
                    ? colors.warning
                    : next
                      ? colors.accent
                      : colors.borderStrong
                }
                strokeWidth={current ? 2.4 : 1.7}
                opacity={passed ? 0.28 : current || next ? 1 : 0.4}
              />
            );
          })}
        </Svg>

        <View style={StyleSheet.absoluteFill}>
          <Svg
            width={ROUTE_WORLD_WIDTH}
            height={ROUTE_WORLD_HEIGHT}
            viewBox={`0 0 ${ROUTE_WORLD_WIDTH} ${ROUTE_WORLD_HEIGHT}`}>
            <Path
              d={ROUTE_PATH}
              fill="none"
              stroke={colors.accent}
              strokeWidth={12}
              strokeLinecap="round"
              opacity={0.018}
            />
          </Svg>
        </View>

        <Animated.View
          style={[
            styles.arrivalPulse,
            {
              borderColor: colors.warning,
              opacity: arrivalOpacity,
              transform: [
                { translateX: Animated.subtract(markerX, 22) },
                { translateY: Animated.subtract(markerY, 22) },
                { scale: arrivalScale },
              ],
            },
          ]}
        />

        {!isTravelling && showRadar ? (
          <Animated.View
            style={[
              styles.radar,
              {
                borderColor: colors.warning,
                opacity: Animated.multiply(markerOpacity, radarOpacity),
                transform: [
                  { translateX: Animated.subtract(markerX, 15) },
                  { translateY: Animated.subtract(markerY, 15) },
                  { scale: radarScale },
                ],
              },
            ]}
          />
        ) : null}

        <Animated.View
          style={[
            styles.marker,
            {
              backgroundColor: colors.warning,
              opacity: markerOpacity,
              transform: [
                { translateX: Animated.subtract(markerX, 10) },
                { translateY: Animated.subtract(markerY, 10) },
              ],
            },
          ]}>
          <View style={[styles.markerCore, { backgroundColor: colors.bg }]} />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewport: {
    width: ROUTE_VIEWPORT_WIDTH,
    height: ROUTE_VIEWPORT_HEIGHT,
    overflow: 'hidden',
  },
  world: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: ROUTE_WORLD_WIDTH,
    height: ROUTE_WORLD_HEIGHT,
  },
  arrivalPulse: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
  },
  radar: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.35,
  },
  marker: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.32,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 7,
  },
  markerCore: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
