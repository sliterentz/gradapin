'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@radix-ui/themes';

const BUTTONS = [
  {
    theme: 'light',
    icon: Sun,
    title: 'Toggle Light Mode',
  },
  {
    theme: 'dark',
    icon: Moon,
    title: 'Toggle Dark Mode',
  },
  {
    theme: 'system',
    icon: Monitor,
    title: 'Toggle System Mode',
  },
];

const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center gap-3 rounded-[2rem] border px-4 py-2">
      {BUTTONS.map((button) => (
        <Button
          key={button.theme}
          onClick={() => setTheme(button.theme)}
          aria-label={button.title}
          title={button.title}
          radius="full"
          size="3"
          variant="ghost"
        >
          <button.icon size={20} />
        </Button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
