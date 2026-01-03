'use server';

import { cookies } from 'next/headers';

export async function setUserLocale(locale: string) {
  const cookieStore = await cookies();
  cookieStore.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });
}

export async function getUserLocale() {
  const cookieStore = await cookies();
  return cookieStore.get('NEXT_LOCALE')?.value || 'id';
}