import GDPChart from '../../components/layouts/gdp';
import { commonMetaData } from '../../libs/utils/index';
import React from 'react';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Country GDP',
    desc: 'Explore the GDP of different countries using Globe Graph.',
    url: '/country/gdp',
    keywords: ['geo chart', 'gdp', 'gross domestic product', 'country gdp'],
  });
  return {
    ...metaData,
  };
};

const CountryGDPPage = () => {
  return (
    <main className="flex items-center justify-center p-3">
      <section className="p-1">
        <GDPChart />
      </section>
    </main>
  );
};

export default CountryGDPPage;
