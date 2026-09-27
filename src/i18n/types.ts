export type Lang = 'ru' | 'ky' | 'en';

export const LANGS: Lang[] = ['ru', 'ky', 'en'];

export function isLang(value: unknown): value is Lang {
  return value === 'ru' || value === 'ky' || value === 'en';
}
