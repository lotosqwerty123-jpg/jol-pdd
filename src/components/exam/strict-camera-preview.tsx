import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { type ComponentType, useCallback, useEffect, useRef, useState } from 'react';
import { AppState, Linking, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import type { ProductCopy } from '@/i18n/product-copy';

type NativeFaceCameraProps = {
  onFacePresenceChange: (present: boolean) => void;
  fallbackText: string;
};

type Props = {
  copy: ProductCopy['strict'];
  compact?: boolean;
  enforceFace?: boolean;
  onReadyChange?: (ready: boolean) => void;
  onViolationLimit?: () => void;
};

const FACE_GRACE_MS = 3000;
const MAX_VIOLATIONS = 3;

function getNativeFaceCamera(): ComponentType<NativeFaceCameraProps> | null {
  if (Constants.appOwnership === 'expo') return null;
  try {
    // Native ML Kit module exists only in the custom/dev APK, never in Expo Go.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('./native-face-camera').NativeFaceCamera as ComponentType<NativeFaceCameraProps>;
  } catch {
    return null;
  }
}

export function StrictCameraPreview({
  copy,
  compact = false,
  enforceFace = false,
  onReadyChange,
  onViolationLimit,
}: Props) {
  const colors = useTheme();
  const [permission, requestPermission, refreshPermission] = useCameraPermissions();
  const [requesting, setRequesting] = useState(false);
  const [requestFailed, setRequestFailed] = useState(false);
  const [facePresent, setFacePresent] = useState<boolean | null>(null);
  const [violations, setViolations] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const missingSinceRef = useRef<number | null>(null);
  const violationLimitSentRef = useRef(false);
  const NativeFaceCamera = getNativeFaceCamera();
  const nativeFaceDetection = NativeFaceCamera !== null;

  const ready = Boolean(permission?.granted);
  const blocked = Boolean(permission && !permission.granted && permission.canAskAgain === false);
  const checking = permission === null;

  useEffect(() => {
    onReadyChange?.(ready);
  }, [onReadyChange, ready]);

  const refresh = useCallback(async () => {
    try {
      setRequestFailed(false);
      await refreshPermission();
    } catch {
      setRequestFailed(true);
      onReadyChange?.(false);
    }
  }, [onReadyChange, refreshPermission]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') void refresh();
    });
    return () => subscription.remove();
  }, [refresh]);

  useEffect(() => {
    if (!enforceFace || !ready || !nativeFaceDetection || facePresent !== false) {
      missingSinceRef.current = null;
      setCountdown(3);
      return;
    }

    if (missingSinceRef.current === null) missingSinceRef.current = Date.now();

    const timer = setInterval(() => {
      const started = missingSinceRef.current ?? Date.now();
      const elapsed = Date.now() - started;
      const remainingMs = Math.max(0, FACE_GRACE_MS - elapsed);
      setCountdown(Math.max(1, Math.ceil(remainingMs / 1000)));

      if (elapsed < FACE_GRACE_MS) return;

      missingSinceRef.current = Date.now();
      setCountdown(3);
      setViolations((current) => {
        const next = Math.min(MAX_VIOLATIONS, current + 1);
        if (next >= MAX_VIOLATIONS && !violationLimitSentRef.current) {
          violationLimitSentRef.current = true;
          setTimeout(() => onViolationLimit?.(), 0);
        }
        return next;
      });
    }, 250);

    return () => clearInterval(timer);
  }, [enforceFace, facePresent, nativeFaceDetection, onViolationLimit, ready]);

  const handleFacePresence = useCallback((present: boolean) => {
    setFacePresent(present);
    if (present) {
      missingSinceRef.current = null;
      setCountdown(3);
    }
  }, []);

  async function askForPermission() {
    if (requesting || ready) return;
    if (blocked) {
      await Linking.openSettings();
      return;
    }

    setRequesting(true);
    setRequestFailed(false);
    try {
      const result = await requestPermission();
      onReadyChange?.(Boolean(result?.granted));
      if (!result?.granted && result?.canAskAgain === false) await refreshPermission();
    } catch {
      setRequestFailed(true);
      onReadyChange?.(false);
    } finally {
      setRequesting(false);
    }
  }

  const permissionText = ready
    ? copy.ready
    : checking
      ? copy.checking
      : requestFailed
        ? copy.requestFailed
        : blocked
          ? copy.blocked
          : copy.denied;

  const targetState = !nativeFaceDetection
    ? 'preview'
    : facePresent === true
      ? 'present'
      : facePresent === false
        ? 'missing'
        : 'checking';

  const targetColor = targetState === 'present'
    ? colors.accent
    : targetState === 'missing'
      ? colors.warning
      : colors.textSecondary;

  const liveStatusText = !nativeFaceDetection
    ? copy.facePreviewOnly
    : facePresent === true
      ? copy.faceDetected
      : facePresent === false
        ? enforceFace
          ? copy.faceMissingCountdown(countdown)
          : copy.faceMissing
        : copy.faceChecking;

  return (
    <View
      style={[
        styles.shell,
        compact && styles.shellCompact,
        { backgroundColor: colors.surface, borderColor: enforceFace ? colors.warning : colors.border },
      ]}>
      <View style={styles.header}>
        <View
          style={[
            styles.icon,
            { backgroundColor: ready ? colors.accentSoft : blocked ? colors.dangerSoft : colors.warningSoft },
          ]}>
          <Ionicons
            name={blocked ? 'settings-outline' : 'videocam-outline'}
            size={18}
            color={ready ? colors.accentSoftText : blocked ? colors.dangerSoftText : colors.warningSoftText}
          />
        </View>
        <View style={styles.flex}>
          <ThemedText type="smallBold">{copy.cameraTitle}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">{permissionText}</ThemedText>
        </View>
        <View style={[styles.statusDot, { backgroundColor: ready ? colors.accent : colors.danger }]} />
      </View>

      {ready ? (
        <View style={[styles.previewWrap, compact && styles.previewCompact]}>
          {NativeFaceCamera ? (
            <NativeFaceCamera onFacePresenceChange={handleFacePresence} fallbackText={copy.cameraUnavailable} />
          ) : (
            <CameraView style={StyleSheet.absoluteFill} facing="front" />
          )}
          <View style={styles.previewShade} />

          <View style={styles.faceLayer} pointerEvents="none">
            <View
              style={[
                styles.faceTarget,
                compact && styles.faceTargetCompact,
                { borderColor: targetColor },
              ]}>
              <View style={[styles.faceCorner, styles.cornerTL, { borderColor: targetColor }]} />
              <View style={[styles.faceCorner, styles.cornerTR, { borderColor: targetColor }]} />
              <View style={[styles.faceCorner, styles.cornerBL, { borderColor: targetColor }]} />
              <View style={[styles.faceCorner, styles.cornerBR, { borderColor: targetColor }]} />
            </View>

            {!compact ? (
              <View style={[styles.targetLabel, { backgroundColor: colors.overlay }]}> 
                <Ionicons name="scan-outline" size={15} color="#FFFFFF" />
                <ThemedText type="smallBold" style={styles.whiteText}>{copy.faceTarget}</ThemedText>
              </View>
            ) : null}
          </View>

          <View style={styles.previewOverlay} pointerEvents="none">
            <View style={[styles.liveBadge, { backgroundColor: colors.overlay }]}> 
              <View style={[styles.liveDot, { backgroundColor: targetColor }]} />
              <ThemedText type="smallBold" style={styles.whiteText}>{liveStatusText}</ThemedText>
            </View>
          </View>
        </View>
      ) : (
        <View style={[styles.permissionCard, compact && styles.permissionCompact, { backgroundColor: colors.surface2 }]}> 
          <Ionicons
            name={blocked ? 'settings-outline' : requestFailed ? 'refresh-outline' : 'camera-outline'}
            size={compact ? 22 : 28}
            color={blocked || requestFailed ? colors.danger : colors.textSecondary}
          />
          {!compact ? (
            <ThemedText type="small" themeColor="textSecondary" style={styles.center}>
              {blocked ? copy.settingsHint : requestFailed ? copy.requestFailedHint : copy.cameraBody}
            </ThemedText>
          ) : null}
          {!checking ? (
            <Pressable
              accessibilityRole="button"
              disabled={requesting}
              onPress={() => void askForPermission()}
              style={({ pressed }) => [
                styles.permissionButton,
                { backgroundColor: blocked ? colors.danger : colors.accent, opacity: pressed || requesting ? 0.76 : 1 },
              ]}>
              <ThemedText type="smallBold" style={{ color: blocked ? colors.dangerForeground : colors.accentForeground }}>
                {requesting ? copy.requesting : blocked ? copy.settings : requestFailed ? copy.retry : copy.request}
              </ThemedText>
            </Pressable>
          ) : null}
        </View>
      )}

      {ready ? (
        <View
          style={[
            styles.faceHint,
            {
              backgroundColor: nativeFaceDetection ? colors.surface2 : colors.warningSoft,
              borderColor: nativeFaceDetection ? colors.border : colors.warning,
            },
          ]}>
          <Ionicons
            name={nativeFaceDetection ? 'scan-circle-outline' : 'information-circle-outline'}
            size={18}
            color={nativeFaceDetection ? targetColor : colors.warningSoftText}
          />
          <View style={styles.flex}>
            <ThemedText type="smallBold" style={{ color: nativeFaceDetection ? colors.text : colors.warningSoftText }}>
              {nativeFaceDetection ? copy.faceMonitoringActive : copy.faceMonitoringApk}
            </ThemedText>
            {!compact ? (
              <ThemedText type="small" themeColor={nativeFaceDetection ? 'textSecondary' : undefined} style={!nativeFaceDetection ? { color: colors.warningSoftText } : undefined}>
                {nativeFaceDetection ? copy.faceHint : copy.faceApkHint}
              </ThemedText>
            ) : null}
          </View>
          {nativeFaceDetection && enforceFace ? (
            <View style={[styles.violationBadge, { backgroundColor: violations > 0 ? colors.dangerSoft : colors.surface }]}> 
              <ThemedText type="smallBold" style={{ color: violations > 0 ? colors.dangerSoftText : colors.textSecondary }}>
                {copy.faceViolations(violations, MAX_VIOLATIONS)}
              </ThemedText>
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: { borderWidth: 1, borderRadius: 24, padding: 12, gap: 10, overflow: 'hidden' },
  shellCompact: { borderRadius: 19, padding: 9 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  icon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  flex: { flex: 1, gap: 1 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  previewWrap: { height: 286, borderRadius: 20, overflow: 'hidden', backgroundColor: '#050607' },
  previewCompact: { height: 168, borderRadius: 15 },
  previewShade: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.045)' },
  faceLayer: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, alignItems: 'center', justifyContent: 'center' },
  faceTarget: { width: 154, height: 202, borderRadius: 82, borderWidth: 1, backgroundColor: 'rgba(0,0,0,0.015)' },
  faceTargetCompact: { width: 94, height: 122, borderRadius: 52 },
  faceCorner: { position: 'absolute', width: 28, height: 28, borderWidth: 0 },
  cornerTL: { top: 8, left: 9, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 13 },
  cornerTR: { top: 8, right: 9, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 13 },
  cornerBL: { bottom: 8, left: 9, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 13 },
  cornerBR: { bottom: 8, right: 9, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 13 },
  targetLabel: { position: 'absolute', bottom: 17, minHeight: 34, borderRadius: 999, paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center', gap: 6 },
  previewOverlay: { position: 'absolute', top: 10, left: 10, right: 10, flexDirection: 'row', justifyContent: 'flex-start' },
  liveBadge: { minHeight: 31, borderRadius: 999, paddingHorizontal: 9, flexDirection: 'row', alignItems: 'center', gap: 6, maxWidth: '92%' },
  liveDot: { width: 6, height: 6, borderRadius: 3 },
  whiteText: { color: '#FFFFFF' },
  permissionCard: { minHeight: 184, borderRadius: 20, padding: 18, alignItems: 'center', justifyContent: 'center', gap: 12 },
  permissionCompact: { minHeight: 104, padding: 12 },
  center: { textAlign: 'center', maxWidth: 290 },
  permissionButton: { minHeight: 42, borderRadius: 999, paddingHorizontal: 17, alignItems: 'center', justifyContent: 'center' },
  faceHint: { minHeight: 58, borderWidth: 1, borderRadius: 17, paddingHorizontal: 11, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 8 },
  violationBadge: { minHeight: 30, borderRadius: 999, paddingHorizontal: 8, alignItems: 'center', justifyContent: 'center' },
});
