import React from 'react';
import { Flex } from '@radix-ui/themes';
// import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Population from '../layouts/population';

const Home = () => {
    const t = useTranslations('HomePage');
  return (
    <Flex gap="3" direction="column">
      <Flex direction="column" gap="3" className="md:flex-row md:flex-wrap items-center">
        <Population />
      </Flex>
    </Flex>
  );
};

export default Home;
