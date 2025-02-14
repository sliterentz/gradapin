'use client';

import Image from 'next/image';
import Logo from './logo.svg';

export const MainLogo = () => {
    
    return (
      <div className="flex-none xs:block">
        <Image
        src={Logo}
        alt="logo"
        width={80}
        height={60}
        priority
        />
      </div>
    );
};
