import {defineRouting} from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['en', 'id'],
  defaultLocale: 'id',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/home': {
      en: '/home',
      id: '/beranda'
    }
  }
});

export const { Link, redirect, usePathname, useRouter, permanentRedirect } =
  createNavigation(routing);