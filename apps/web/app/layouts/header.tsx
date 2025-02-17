import { MainLogo } from '../assets/logo';
import Link from 'next/link';
import React from 'react';
import { Button } from '@radix-ui/themes';
import { Github } from 'lucide-react';
import Languages from '../languages';
import { cookies } from 'next/headers';
import ThemeSwitcher from './themes';

const Header = async () => {
  const Cookies = await cookies();
  const lang = Cookies.get('lang');
  const tabIndex = true ? undefined : -1;
  return (
    <header className="sticky left-3 top-4 z-99 mb-6 w-[98%] rounded-[2rem] border px-4 py-2 pr-2 shadow-2xl backdrop-blur-sm dark:bg-[#111111]/60">
      <nav className="flex items-center justify-between">
        <div className="size-14 flex-none">
          <Link href="/" aria-label="Home">
            <MainLogo />
          </Link>
        </div>

        {/* <div className="flex-grow flex items-center justify-center">
							<TextField.Root
								color="gray"
								radius="full"
								variant="soft"
								style={{ width: '100%', maxWidth: '400px' }}
								tabIndex={tabIndex}
								placeholder="Search"
							>
								<TextField.Slot>
									<ZoomInIcon />
								</TextField.Slot>
							</TextField.Root>
				</div> */}

        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/sliterentz/gradapin"
            aria-label="Github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              color="indigo"
              radius="full"
              size="3"
              variant="ghost"
              className="w-full bg-transparent text-foreground"
            >
              <Github />
            </Button>
          </Link>
          <Languages lang={lang?.value || 'en'} />
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
};

export default Header;
