export type RoutePoint = {
    x: number;
    y: number;
  };
  
  type CubicSegment = {
    start: RoutePoint;
    control1: RoutePoint;
    control2: RoutePoint;
    end: RoutePoint;
  };
  
  export const ROUTE_VIEWPORT_WIDTH = 286;
  export const ROUTE_VIEWPORT_HEIGHT = 176;
  
  export const ROUTE_WORLD_WIDTH = 980;
  export const ROUTE_WORLD_HEIGHT = 176;
  
  const segments: CubicSegment[] = [
    {
      start: { x: 36, y: 110 },
      control1: { x: 78, y: 114 },
      control2: { x: 123, y: 39 },
      end: { x: 185, y: 55 },
    },
  
    {
      start: { x: 185, y: 55 },
      control1: { x: 230, y: 60 },
      control2: { x: 276, y: 120 },
      end: { x: 332, y: 102 },
    },
  
    {
      start: { x: 332, y: 102 },
      control1: { x: 383, y: 83 },
      control2: { x: 420, y: 32 },
      end: { x: 480, y: 47 },
    },
  
    {
      start: { x: 480, y: 47 },
      control1: { x: 532, y: 58 },
      control2: { x: 574, y: 121 },
      end: { x: 630, y: 105 },
    },
  
    {
      start: { x: 630, y: 105 },
      control1: { x: 682, y: 89 },
      control2: { x: 721, y: 42 },
      end: { x: 780, y: 58 },
    },
  
    {
      start: { x: 780, y: 58 },
      control1: { x: 835, y: 71 },
      control2: { x: 875, y: 111 },
      end: { x: 932, y: 92 },
    },
  ];
  
  const SAMPLES_PER_SEGMENT = 24;
  
  function cubicPoint(
    segment: CubicSegment,
    t: number,
  ): RoutePoint {
    const inverse = 1 - t;
  
    const x =
      inverse ** 3 * segment.start.x +
      3 *
        inverse ** 2 *
        t *
        segment.control1.x +
      3 *
        inverse *
        t ** 2 *
        segment.control2.x +
      t ** 3 * segment.end.x;
  
    const y =
      inverse ** 3 * segment.start.y +
      3 *
        inverse ** 2 *
        t *
        segment.control1.y +
      3 *
        inverse *
        t ** 2 *
        segment.control2.y +
      t ** 3 * segment.end.y;
  
    return { x, y };
  }
  
  const travelInput: number[] = [];
  const routeX: number[] = [];
  const routeY: number[] = [];
  const cameraX: number[] = [];
  const sampledPoints: RoutePoint[] = [];
  
  const minimumCameraX =
    ROUTE_VIEWPORT_WIDTH - ROUTE_WORLD_WIDTH;
  
  segments.forEach((segment, segmentIndex) => {
    for (
      let step = 0;
      step <= SAMPLES_PER_SEGMENT;
      step += 1
    ) {
      if (
        segmentIndex > 0 &&
        step === 0
      ) {
        continue;
      }
  
      const t =
        step / SAMPLES_PER_SEGMENT;
  
      const point =
        cubicPoint(segment, t);
  
      const travelValue =
        segmentIndex + t;
  
      travelInput.push(travelValue);
  
      routeX.push(point.x);
      routeY.push(point.y);
  
      sampledPoints.push(point);
  
      const desiredCameraX =
        138 - point.x;
  
      cameraX.push(
        Math.max(
          minimumCameraX,
          Math.min(
            0,
            desiredCameraX,
          ),
        ),
      );
    }
  });
  
  export const ROUTE_TRAVEL_INPUT =
    travelInput;
  
  export const ROUTE_MARKER_X =
    routeX;
  
  export const ROUTE_MARKER_Y =
    routeY;
  
  export const ROUTE_CAMERA_X =
    cameraX;
  
  export const ROUTE_PATH =
    sampledPoints
      .map((point, index) => {
        const command =
          index === 0 ? 'M' : 'L';
  
        return `${command} ${point.x.toFixed(
          2,
        )} ${point.y.toFixed(2)}`;
      })
      .join(' ');
  
  export const ROUTE_STOPS: RoutePoint[] = [
    segments[0].start,
    ...segments.map(
      (segment) => segment.end,
    ),
  ];