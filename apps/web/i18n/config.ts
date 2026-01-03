export const locales = ['en', 'id'] as const;
export const defaultLocale = 'id' as const;

export type Locale = (typeof locales)[number];