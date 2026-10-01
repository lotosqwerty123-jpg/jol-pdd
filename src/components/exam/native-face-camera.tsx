import { StyleSheet, Text, View } from 'react-native';
import { useCameraDevice } from 'react-native-vision-camera';
import { Camera, type Face } from 'react-native-vision-camera-face-detector';

type Props = {
  onFacePresenceChange: (present: boolean) => void;
  fallbackText: string;
};

export function NativeFaceCamera({ onFacePresenceChange, fallbackText }: Props) {
  const device = useCameraDevice('front');

  if (!device) {
    return (
      <View style={[StyleSheet.absoluteFill, styles.fallback]}>
        <Text style={styles.fallbackText}>{fallbackText}</Text>
      </View>
    );
  }

  function handleFacesDetected(faces: Face[]) {
    onFacePresenceChange(faces.length > 0);
  }

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive
      performanceMode="fast"
      minFaceSize={0.18}
      trackingEnabled
      onFacesDetected={handleFacesDetected}
    />
  );
}

const styles = StyleSheet.create({
  fallback: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#050607' },
  fallbackText: { color: '#FFFFFF', fontSize: 12 },
});
