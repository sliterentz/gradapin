'use client';

import { MainLogo } from '../assets/logo';
import { cn } from '../libs/utils';
import { useEffect, useState } from 'react';

const AppStart = ({ children }: { children: React.ReactNode }) => {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <section
      className={cn(
        !mount &&
          'fixed left-0 top-0 flex h-[100dvh] w-full items-center justify-center bg-white'
      )}
    >
      {mount ? children : <MainLogo />}
    </section>
  );
};

export default AppStart;
