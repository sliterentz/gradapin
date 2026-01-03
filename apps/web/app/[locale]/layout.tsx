import type { ReactNode } from 'react';
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
// import { locales } from '@/i18n/request';
// import enMessages from '@/messages/en.json';
// import idMessages from '@/messages/id.json';
import "../globals.css";
import ThemeProvider from '@/app/libs/providers/theme-provider';
import ReactQueryProvider from '@/app/libs/providers/reactQuery-provider';
import ToastProvider from '@/app/libs/providers/toast-provider';
import { DataSourceProvider } from '@/app/contexts/DataSourceContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Gradapin",
  description: "Graphical Indonesia Data",
  keywords: ["gradapin", "indonesia population", "arief luqman hakim", "word bank data"],
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// const messagesMap: Record<string, any> = {
//   en: enMessages,
//   id: idMessages,
// };

export default async function RootLayout({ 
  children, 
  params
}: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ReactQueryProvider>
            <DataSourceProvider>
              <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Jakarta" now={new Date()}>
                {children}
              </NextIntlClientProvider>
              <ToastProvider />
            </DataSourceProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
