import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { cookies } from 'next/headers';
import { locales, defaultLocale } from '@/i18n/config';
import ThemeProvider from '@/app/libs/providers/theme-provider';
import ReactQueryProvider from '@/app/libs/providers/reactQuery-provider';
import ToastProvider from '@/app/libs/providers/toast-provider';
import { DataSourceProvider } from '@/app/contexts/DataSourceContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const Cookies = await cookies();
  let locale = Cookies.get('lang')?.value ?? defaultLocale;
  if (!locales.includes(locale as any)) {
    locale = defaultLocale;
  }
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Jakarta" now={new Date()}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <ReactQueryProvider>
              <DataSourceProvider>
                {children}
                <ToastProvider />
              </DataSourceProvider>
            </ReactQueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
