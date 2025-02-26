import GDPGrowthChart from '../../components/layouts/gdpgrowth';
import { commonMetaData } from '../../libs/utils/index';
import React from 'react';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Country GDP Growth',
    desc: 'Explore the GDP Growth of different countries using Globe Graph.',
    url: '/country/gdpgrowth',
    keywords: ['geo chart', 'gdp growth', 'gross domestic product', 'country gdp growth'],
  });
  return {
    ...metaData,
  };
};

const CountryGDPGrowthPage = () => {
  return (
    <main className="flex items-center justify-center p-3">
      <section className="p-1">
        <GDPGrowthChart />
      </section>
    </main>
  );
};

export default CountryGDPGrowthPage;
