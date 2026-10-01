declare module 'react-native-vision-camera' {
  export type CameraDevice = unknown;
  export function useCameraDevice(position: 'front' | 'back'): CameraDevice | undefined;
}

declare module 'react-native-vision-camera-face-detector' {
  import type { ComponentType } from 'react';
  export type Face = { bounds?: { x?: number; y?: number; width?: number; height?: number } };
  export const Camera: ComponentType<any>;
}

declare module 'expo-network' {
  export type NetworkState = {
    isConnected?: boolean | null;
    isInternetReachable?: boolean | null;
  };
  export function getNetworkStateAsync(): Promise<NetworkState>;
  export function addNetworkStateListener(listener: (state: NetworkState) => void): { remove(): void };
}
