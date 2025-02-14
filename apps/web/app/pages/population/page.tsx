import Population from '../../components/layouts/population';
import { commonMetaData } from '../../libs/utils/index';
import React from 'react';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Country Population',
    desc: 'Explore the population of different countries using Word Bank Data.',
    url: '/country/population',
    keywords: ['geo chart', 'population', 'country population'],
  });
  return {
    ...metaData,
  };
};

const PopulationPage = () => {
  return (
    <main>
      <section className="p-1">
        <Population />
      </section>
    </main>
  );
};

export default PopulationPage;
