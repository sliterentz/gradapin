import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import "@radix-ui/themes/styles.css";
import ThemeProvider from './libs/providers/theme-provider';
import Header from './layouts/header';
import Footer from './layouts/footer';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';
import ToastProvider from './libs/providers/toast-provider';
import ReactQueryProvider from './libs/providers/reactQuery-provider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Gradapin",
  description: "Graphical Indonesia Data",
  keywords: ["gradapin", "indonesia population", "arief luqman hakim", "word bank data"],
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ReactQueryProvider>
              <NextTopLoader
                color="#22dd4e"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={200}
                shadow="0 0 10px #22DD4e,0 0 5px #22DD4e"
              />
                <div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
                  <Header />
                  <NuqsAdapter>{children}</NuqsAdapter>
                  <ToastProvider />
                  <Footer />
                </div>
            </ReactQueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;