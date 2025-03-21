import { MainLogo } from '../assets/logo';
import Link from 'next/link';
import React from 'react';
// import Languages from '../languages';
// import { cookies } from 'next/headers';
// import ThemeSwitcher from './themes';
import Menubar from './menubar';
// import SearchBarWrapper from './searchbarwrapper';
// import Menubar from '../layouts/menubar';

const Header = async () => {
  // const Cookies = await cookies();
  // const lang = Cookies.get('lang');
  
  return (
    <header className="sticky left-0 top-0 md:left-3 md:top-4 z-50 mb-6 w-full md:w-[98%] rounded-none md:rounded-[2rem] border-b md:border px-2 md:px-4 py-2 md:pr-2 shadow-md md:shadow-2xl backdrop-blur-sm dark:bg-[#111111]/60">
      <nav className="flex items-center justify-between">
        <div className="size-14 flex-none">
          <Link href="/" aria-label="Home">
            <MainLogo />
          </Link>
        </div>

        <Menubar />
        {/* <SearchBarWrapper lang={lang?.value || 'en'} /> */}
      </nav>
    </header>
  );
};

export default Header;
