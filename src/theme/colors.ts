export type JolTheme = 'light' | 'dark';

/**
 * Semantic color tokens from the JOL PDD prototype.
 * Traffic-light meaning is functional, not decorative:
 * accent = movement, progress, correct
 * warning = explanation, attention
 * danger = incorrect, error
 */
export const palettes = {
  dark: {
    bg: '#0B0E11',
    surface: '#14181C',
    surface2: '#1B2025',
    surfacePressed: '#232A30',
    border: '#273038',
    borderStrong: '#3B4650',
    text: '#F5F6F7',
    textSecondary: '#8A929B',
    textTertiary: '#5C6470',
    overlay: 'rgba(6,7,9,0.72)',
    accent: '#C8FF4D',
    accentForeground: '#0E1013',
    accentSoft: '#1B2413',
    accentSoftText: '#C8FF4D',
    warning: '#F5C84C',
    warningForeground: '#231A05',
    warningSoft: '#2A1E17',
    warningSoftText: '#F5B85C',
    danger: '#F2665A',
    dangerForeground: '#0E1013',
    dangerSoft: '#2A1917',
    dangerSoftText: '#F2887E',
    successSoft: '#132018',
    successSoftBorder: '#1F3A28',
  },
  light: {
    bg: '#EEF1EB',
    surface: '#FFFFFF',
    surface2: '#E5EAE2',
    surfacePressed: '#DCE3D9',
    border: '#D4DBD1',
    borderStrong: '#B8C2B5',
    text: '#14181A',
    textSecondary: '#5B6167',
    textTertiary: '#8B9096',
    overlay: 'rgba(20,24,26,0.5)',
    accent: '#2E7D32',
    accentForeground: '#FFFFFF',
    accentSoft: '#E5F1E1',
    accentSoftText: '#2E7D32',
    warning: '#B8860B',
    warningForeground: '#FFFFFF',
    warningSoft: '#FBF1D8',
    warningSoftText: '#8A660A',
    danger: '#C6423A',
    dangerForeground: '#FFFFFF',
    dangerSoft: '#FBE9E7',
    dangerSoftText: '#B33A32',
    successSoft: '#E5F1E1',
    successSoftBorder: '#CFE4C8',
  },
} as const;

export type ThemeColor = keyof typeof palettes.light;

export function getPalette(theme: JolTheme) {
  return palettes[theme];
}
