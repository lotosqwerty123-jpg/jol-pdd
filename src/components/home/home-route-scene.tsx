import {
    useEffect,
    useRef,
} from 'react';
  
  import {
    Animated,
    Dimensions,
    StyleSheet,
    View,
} from 'react-native';
  
  import Svg, {
    Circle,
    Path,
} from 'react-native-svg';
  
  import {
    ThemedText,
} from '@/components/themed-text';
  
  import {
    ROUTE_PATH,
    ROUTE_STOPS,
    ROUTE_WORLD_HEIGHT,
    ROUTE_WORLD_WIDTH,
} from '@/components/journey/route-geometry';
  
  import {
    useTheme,
} from '@/hooks/use-theme';
  
  type Props = {
    currentIndex: number;
  
    labels: string[];
  };
  
  const screenWidth =
    Dimensions.get(
      'window',
    ).width;
  
  const viewportWidth =
    Math.max(
      260,
      screenWidth - 80,
    );
  
  const viewportHeight = 210;
  
  export function HomeRouteScene({
    currentIndex,
    labels,
  }: Props) {
    const colors = useTheme();
  
    const pulse = useRef(
      new Animated.Value(0),
    ).current;
  
    const entrance = useRef(
      new Animated.Value(0),
    ).current;
  
    const active =
      ROUTE_STOPS[
        currentIndex
      ];
  
    const next =
      ROUTE_STOPS[
        Math.min(
          currentIndex + 1,
          ROUTE_STOPS.length - 1,
        )
      ];
  
    const minimumCamera =
      viewportWidth -
      ROUTE_WORLD_WIDTH;
  
    const targetCamera =
      Math.max(
        minimumCamera,
        Math.min(
          0,
          viewportWidth * 0.37 -
            active.x,
        ),
      );
  
    useEffect(() => {
      Animated.timing(
        entrance,
        {
          toValue: 1,
  
          duration: 850,
  
          useNativeDriver:
            false,
        },
      ).start();
  
      const loop =
        Animated.loop(
          Animated.sequence([
            Animated.timing(
              pulse,
              {
                toValue: 1,
  
                duration: 1500,
  
                useNativeDriver:
                  false,
              },
            ),
  
            Animated.timing(
              pulse,
              {
                toValue: 0,
  
                duration: 0,
  
                useNativeDriver:
                  false,
              },
            ),
          ]),
        );
  
      loop.start();
  
      return () => {
        loop.stop();
      };
    }, [
      entrance,
      pulse,
    ]);
  
    const cameraX =
      entrance.interpolate({
        inputRange: [0, 1],
  
        outputRange: [
          targetCamera + 28,
          targetCamera,
        ],
      });
  
    const routeOpacity =
      entrance.interpolate({
        inputRange: [0, 1],
  
        outputRange: [
          0,
          1,
        ],
      });
  
    const pulseScale =
      pulse.interpolate({
        inputRange: [0, 1],
  
        outputRange: [
          0.9,
          2.45,
        ],
      });
  
    const pulseOpacity =
      pulse.interpolate({
        inputRange: [
          0,
          0.3,
          1,
        ],
  
        outputRange: [
          0.36,
          0.17,
          0,
        ],
      });
  
    const nextBreath =
      pulse.interpolate({
        inputRange: [0, 1],
  
        outputRange: [
          0.52,
          1,
        ],
      });
  
    return (
      <View
        style={[
          styles.viewport,
  
          {
            width:
              viewportWidth,
          },
        ]}>
  
        <Animated.View
          style={[
            styles.world,
  
            {
              opacity:
                routeOpacity,
  
              transform: [
                {
                  translateX:
                    cameraX,
                },
              ],
            },
          ]}>
  
          <Svg
            width={
              ROUTE_WORLD_WIDTH
            }
  
            height={
              ROUTE_WORLD_HEIGHT
            }
  
            viewBox={
              `0 0 ${ROUTE_WORLD_WIDTH} ${ROUTE_WORLD_HEIGHT}`
            }>
  
            <Path
              d={ROUTE_PATH}
  
              fill="none"
  
              stroke={
                colors.borderStrong
              }
  
              strokeWidth={10}
  
              strokeLinecap="round"
  
              opacity={0.09}
            />
  
            <Path
              d={ROUTE_PATH}
  
              fill="none"
  
              stroke={
                colors.borderStrong
              }
  
              strokeWidth={1.4}
  
              strokeLinecap="round"
  
              opacity={0.67}
            />
  
            <Path
              d={ROUTE_PATH}
  
              fill="none"
  
              stroke={
                colors.accent
              }
  
              strokeWidth={2.8}
  
              strokeLinecap="round"
  
              strokeDasharray="1 10"
            />
  
            {ROUTE_STOPS.map(
              (point, index) => {
                const completed =
                  index <
                  currentIndex;
  
                const current =
                  index ===
                  currentIndex;
  
                const upcoming =
                  index ===
                  currentIndex + 1;
  
                return (
                  <Circle
                    key={index}
  
                    cx={point.x}
                    cy={point.y}
  
                    r={
                      current
                        ? 8
                        : upcoming
                          ? 7
                          : 5.5
                    }
  
                    fill={
                      colors.bg
                    }
  
                    stroke={
                      current
                        ? colors.warning
                        : upcoming
                          ? colors.accent
                          : colors.borderStrong
                    }
  
                    strokeWidth={
                      current
                        ? 2.5
                        : 1.7
                    }
  
                    opacity={
                      completed
                        ? 0.25
                        : current ||
                            upcoming
                          ? 1
                          : 0.37
                    }
                  />
                );
              },
            )}
          </Svg>
  
          {/* Текущая точка */}
          <Animated.View
            style={[
              styles.currentPulse,
  
              {
                borderColor:
                  colors.warning,
  
                opacity:
                  pulseOpacity,
  
                transform: [
                  {
                    translateX:
                      active.x - 22,
                  },
  
                  {
                    translateY:
                      active.y - 22,
                  },
  
                  {
                    scale:
                      pulseScale,
                  },
                ],
              },
            ]}
          />
  
          <View
            style={[
              styles.currentMarker,
  
              {
                backgroundColor:
                  colors.warning,
  
                left:
                  active.x - 10,
  
                top:
                  active.y - 10,
              },
            ]}>
  
            <View
              style={[
                styles.markerCore,
  
                {
                  backgroundColor:
                    colors.bg,
                },
              ]}
            />
          </View>
  
          {/* Следующая точка слегка дышит */}
          <Animated.View
            style={[
              styles.nextGlow,
  
              {
                backgroundColor:
                  colors.accent,
  
                opacity:
                  nextBreath,
  
                left:
                  next.x - 12,
  
                top:
                  next.y - 12,
              },
            ]}
          />
        </Animated.View>
  
        {/* Подписи поверх камеры */}
        <View
          pointerEvents="none"
          style={
            styles.labels
          }>
  
          <View
            style={
              styles.currentLabel
            }>
  
            <ThemedText
              type="smallBold"
  
              style={{
                color:
                  colors.warning,
              }}>
  
              {
                labels[
                  currentIndex
                ]
              }
            </ThemedText>
          </View>
  
          {currentIndex + 1 <
          labels.length ? (
            <View
              style={
                styles.nextLabel
              }>
  
              <ThemedText
                type="small"
  
                style={{
                  color:
                    colors.accent,
                }}>
  
                {
                  labels[
                    currentIndex +
                      1
                  ]
                }
              </ThemedText>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
  
  const styles =
    StyleSheet.create({
      viewport: {
        height:
          viewportHeight,
  
        overflow:
          'hidden',
  
        position:
          'relative',
      },
  
      world: {
        position:
          'absolute',
  
        left: 0,
        top: 12,
  
        width:
          ROUTE_WORLD_WIDTH,
  
        height:
          ROUTE_WORLD_HEIGHT,
      },
  
      currentPulse: {
        position:
          'absolute',
  
        width: 44,
        height: 44,
  
        borderRadius: 22,
  
        borderWidth: 1.5,
      },
  
      currentMarker: {
        position:
          'absolute',
  
        width: 20,
        height: 20,
  
        borderRadius: 10,
  
        alignItems:
          'center',
  
        justifyContent:
          'center',
  
        elevation: 7,
      },
  
      markerCore: {
        width: 8,
        height: 8,
  
        borderRadius: 4,
      },
  
      nextGlow: {
        position:
          'absolute',
  
        width: 24,
        height: 24,
  
        borderRadius: 12,
  
        opacity: 0.09,
      },
  
      labels: {
        position:
          'absolute',
  
        left: 0,
        right: 0,
        bottom: 5,
  
        height: 30,
      },
  
      currentLabel: {
        position:
          'absolute',
  
        left: '19%',
      },
  
      nextLabel: {
        position:
          'absolute',
  
        right: '9%',
      },
    });