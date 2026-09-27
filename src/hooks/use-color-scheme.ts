import { useAppSettings } from '@/store/app-settings';

export function useTheme() {
  const { theme } = useAppSettings();
  return theme;
}

export function useColorScheme() {
  const { theme } = useAppSettings();
  return theme;
}
