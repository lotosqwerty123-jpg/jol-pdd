import { useAppSettings } from '@/store/app-settings';
import { palettes } from '@/theme/colors';

export function useTheme() {
  const { theme } = useAppSettings();
  return palettes[theme];
}