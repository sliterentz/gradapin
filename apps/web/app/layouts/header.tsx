import { MainLogo } from '../assets/logo';
import Link from 'next/link';
import React from 'react';
import { Button } from '../components/ui/button';
import { Github } from 'lucide-react';
import Languages from '../languages';
import { cookies } from 'next/headers';
import ThemeSwitcher from './themes';

const Header = async () => {
  const Cookies = await cookies();
  const lang = Cookies.get('lang');
  return (
    <header className="sticky left-3 top-4 z-99 mb-6 w-[95%] rounded-[2rem] border px-4 py-2 pr-2 shadow-2xl backdrop-blur-sm dark:bg-[#111111]/60 md:w-[500px] md:px-6 md:pr-2">
      <nav className="flex items-center justify-between">
        <Link href="/" aria-label="Home">
          <MainLogo />
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/sliterentz/gradapin"
            aria-label="Github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="icon"
              className="w-full bg-transparent text-foreground hover:bg-transparent hover:opacity-80"
            >
              <Github />
            </Button>
          </Link>
          <Languages lang={lang?.value || 'en'} />
        </div>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
};

export default Header;
