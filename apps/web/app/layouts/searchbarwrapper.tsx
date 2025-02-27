'use client';

import React from 'react';
import SearchBar from './searchbar';
import { useCountryData } from '../hooks';

const SearchBarWrapper = ({ lang }: { lang: string }) => {
  const {
    countries,
    fetchSingleCountryData,
    setCountries,
    removeCountry,
    removeLastCountry,
  } = useCountryData({
    indicator: 'SP.POP.TOTL',
    countryKey: 'countries',
    timeRangeKey: 'timeRange',
    dataSourceKey: 'dataSource',
  });

  return (
    <SearchBar
      countries={countries}
      fetchNewCountryData={fetchSingleCountryData}
      fetchSingleCountryData={fetchSingleCountryData}
      setCountries={setCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
      lang={lang}
    />
  );
};

export default SearchBarWrapper;