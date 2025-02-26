'use client';

import MainChartComp from '../../components/charts';
import { useCountryData } from '../../hooks';
import useCountryLanguage from '../../hooks/use-country-language';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useDataSource } from '../../contexts/DataSourceContext';

const GDPChart = () => {
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
        indicator: dataSource === 'BPS API Data' ? 'NY.GDP.MKTP.CD.BPS' : 'NY.GDP.MKTP.CD',
        countryKey: dataSource === 'BPS API Data' ? 'bpsPopulationCountries' : 'populationCountries',
        timeRangeKey: 'timeRange',
        initialCountries: [{ label: "Indonesia", value: dataSource === 'BPS API Data' ? "BPS_IDN" : "IDN" }],
        dataSourceKey: dataSource,
    });

    const t = useTranslations('Chart');
    const lang = useLocale();
    useCountryLanguage({ countries, setMultipleCountries, lang });

    useEffect(() => {
        // Reset countries when data source changes to reset the selected country to Indonesia if it's not already selected
        setCountries({ label: "Indonesia", value: dataSource === 'BPS API Data' ? "BPS_IDN" : "IDN" });
    }, [dataSource, setCountries]);
    
    return (
        <MainChartComp
        isFetching={isFetching}
        isLoading={isLoading}
        fetchSingleCountryData={fetchSingleCountryData}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        countries={countries}
        chartData={chartData}
        title={t('gdp')}
        toolTipMessage={t('gdpDesc')}
        setCountries={setCountries}
        removeCountry={removeCountry}
        removeLastCountry={removeLastCountry}
        isCurrencySymbol={false}
        indicator={dataSource === 'BPS API Data' ? 'NY.GDP.MKTP.CD.BPS' : 'NY.GDP.MKTP.CD'}
        type="gdp"
        />
    );
};

export default GDPChart;
