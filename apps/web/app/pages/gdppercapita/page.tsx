import GDPPerCapitaChart from '../../components/layouts/gdppercapita';
import { commonMetaData } from '../../libs/utils/index';
import React from 'react';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Country Per Capita Income',
    desc: 'Explore the per capita income of different countries using Globe Graph.',
    url: '/country/per-capita-income',
    keywords: ['geo chart', 'per capita income', 'country per capita income'],
  });
  return {
    ...metaData,
  };
};

const CountryPerCapitaIncomePage = () => {
  return (
    <main className="flex items-center justify-center p-3">
      <section className="p-1">
        <GDPPerCapitaChart />
      </section>
    </main>
  );
};

export default CountryPerCapitaIncomePage;
