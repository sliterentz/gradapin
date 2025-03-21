'use client';

import React from 'react';
import SearchBar from './searchbar';
import { useCountryData } from '../hooks';
import { useDataSource } from '../contexts/DataSourceContext';

const SearchBarWrapper = ({ lang }: { lang: string }) => {
  const { dataSource } = useDataSource();
  const {
    countries,
    fetchSingleCountryData,
    setCountries,
    removeCountry,
    removeLastCountry,
  } = useCountryData({
    indicator: 'SP.POP.TOTL',
    countryKey: 'populationCountries',
    timeRangeKey: 'timeRange',
    dataSourceKey: dataSource,
  });

  const handleNewCountryData = async (countryCode: string) => {
    await fetchSingleCountryData(countryCode);
    setCountries({ label: countryCode, value: countryCode });
  };

  return (
    <SearchBar
      countries={countries}
      fetchNewCountryData={handleNewCountryData}
      fetchSingleCountryData={fetchSingleCountryData}
      setCountries={setCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
      lang={lang}
    />
  );
};

export default SearchBarWrapper;