'use client';

import MainChartComp from '../../components/charts';
import { useCountryData } from '../../hooks';
import useCountryLanguage from '../../hooks/use-country-language';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useCallback } from 'react';
import { useDataSource } from '../../contexts/DataSourceContext';
import { useLocalCountries  } from '../../hooks/useLocalCountries';
import { TCountries } from '../../hooks/use-data';

const Population = () => {
  const { dataSource } = useDataSource();
  const {
    isLoading,
    chartData,
    countries,
    setMultipleCountries,
    timeRange,
    setTimeRange,
    setCountries,
    removeCountry,
    removeLastCountry,
    fetchSingleCountryData,
    isFetching,
  } = useCountryData({
    indicator: dataSource === 'BPS API Data' ? 'SP.POP.TOTL.BPS' : 'SP.POP.TOTL',
    countryKey: dataSource === 'BPS API Data' ? 'bpsPopulationCountries' : 'populationCountries',
    timeRangeKey: 'populationTimeRange',
    initialCountries: [{ label: "Indonesia", value: dataSource === 'BPS API Data' ? "BPS_IDN" : "IDN" }],
    dataSourceKey: dataSource,
  });

  const t = useTranslations('Chart');
  const lang = useLocale();
  useCountryLanguage({ countries, setMultipleCountries, lang });

  const localCountries = useLocalCountries(dataSource === 'BPS API Data' ? 'bpsPopulationCountries' : 'populationCountries');

  const updateCountries = useCallback(() => {
    // if (localCountries.length > 0) {
      // setMultipleCountries(localCountries);
    // } else {
      setCountries(countries);
    // }
  }, [dataSource, setCountries, setMultipleCountries, localCountries]);

  useEffect(() => {
    updateCountries();
  }, [updateCountries]);

  const handleSetCountries = useCallback((newCountry: TCountries) => {
    const updatedCountries = [...countries, newCountry];
    setMultipleCountries(updatedCountries);
  }, [countries, setMultipleCountries]);

  // useEffect(() => {
  //   setCountries(countries);
    // Reset countries when data source changes to reset the selected country to Indonesia if it's not already selected
    // setCountries({ label: "Indonesia", value: dataSource === 'BPS API Data' ? "BPS_IDN" : "IDN" }); 
  // }, [dataSource, setCountries, setMultipleCountries, localCountries]);

  return (
    <MainChartComp
      isFetching={isFetching}
      isLoading={isLoading}
      fetchSingleCountryData={fetchSingleCountryData}
      timeRange={timeRange}
      setTimeRange={setTimeRange}
      countries={countries}
      chartData={chartData}
      title={t('population')}
      toolTipMessage={t('populationDesc')}
      setCountries={handleSetCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
      isCurrencySymbol={false}
      indicator={dataSource === 'BPS API Data' ? 'SP.POP.TOTL.BPS' : 'SP.POP.TOTL'}
      type="population"
    />
  );
};

export default Population;
