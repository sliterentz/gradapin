import React from 'react';
// import { Card, CardContent } from '../ui/card';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
// import { SquareArrowOutUpRight } from 'lucide-react';
// import BackgroundDots from '../../layouts/background';
import Population from '../layouts/population';

const Home = () => {
    const t = useTranslations('HomePage');
  return (
    <section className="w-full rounded-[1rem] border p-5 md:w-fit">
      <h1 className="mb-3 text-2xl font-bold">{t('title')}</h1>
      <div className="flex w-full flex-col flex-wrap items-center gap-3 md:flex-row">
      <Population />
      </div>
      </section>
  );
};

export default Home;
