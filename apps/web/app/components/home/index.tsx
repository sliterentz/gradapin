import React from 'react';
import { Flex } from '@radix-ui/themes';
// import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Population from '../layouts/population';

const Home = () => {
    const t = useTranslations('HomePage');
  return (
    <Flex gap="3" direction="column">
        <h1 className="mb-3 text-2xl font-bold">{t('title')}</h1>
        <div className="flex w-full flex-col flex-wrap items-center gap-3 md:flex-row">
          <Population />
        </div>
    </Flex>
  );
};

export default Home;
