'use client';

import * as React from 'react';
import { Theme } from '@radix-ui/themes';
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps as NextThemeProviderProps,
} from 'next-themes';

export interface ThemeProviderProps extends NextThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
  <NextThemesProvider {...props}>
      <Theme
        panelBackground="translucent"
        accentColor="orange"
        grayColor="sage"
        radius="large"
        scaling="95%"
        >
          {children}
      </Theme>
  </NextThemesProvider>
  );
};

export default ThemeProvider;
