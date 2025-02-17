'use client';

import MainChartComp from '../../components/charts';
import { useCountryData } from '../../hooks';
import useCountryLanguage from '../../hooks/use-country-language';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect } from 'react';

const Population = () => {
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
    indicator: 'SP.POP.TOTL',
    countryKey: 'populationCountries',
    timeRangeKey: 'populationTimeRange',
    initialCountries: [{ label: "Indonesia", value: "IDN" }],
  });

  const t = useTranslations('Chart');
  const lang = useLocale();
  useCountryLanguage({ countries, setMultipleCountries, lang });

  useEffect(() => {
    if (countries.length === 0) {
      setCountries({ label: "Indonesia", value: "IDN" });
    }
  }, []);

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
      setCountries={setCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
      isCurrencySymbol={false}
      indicator="SP.POP.TOTL"
      type="population"
    />
  );
};

export default Population;
