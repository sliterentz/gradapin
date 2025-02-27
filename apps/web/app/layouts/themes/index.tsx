'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

const THEME_OPTIONS = [
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getCurrentThemeIcon = () => {
    const currentTheme = THEME_OPTIONS.find(option => option.theme === theme) || THEME_OPTIONS[2];
    const IconComponent = currentTheme.icon;
    return <IconComponent size={20} />;
  };

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="3" radius="full">
          {getCurrentThemeIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[180px] rounded-md p-[5px]" align="end">
        {THEME_OPTIONS.map((option) => (
          <DropdownMenuItem key={option.theme} onSelect={() => setTheme(option.theme)}>
            <option.icon size={16} className="mr-2" />
            {option.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
