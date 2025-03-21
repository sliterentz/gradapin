import { getData } from '../libs/types';
import { useMemo, useState, useCallback } from 'react';
import { useData, TCountries } from './use-data';
import {
  formatChartData,
  getAllCountriesData,
  handleGlobalError,
  TTimeRange,
} from '../libs/utils/index';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDataSource } from '../contexts/DataSourceContext';
import { TBPSResponseData, TResponseData } from '../libs/types/response-data.type';

type TCountryData = {
  indicator: string;
  countryKey: string;
  timeRangeKey: string;
  dataSourceKey: string;
};

export const useCountryData = ({
  indicator,
  countryKey,
  timeRangeKey,
  initialCountries = [],
  dataSourceKey,
}: TCountryData & { initialCountries?: TCountries[] }) => {
  const { dataSource } = useDataSource();
  const handleSetCountries = (newCountries: TCountries | TCountries[]) => {
    if (dataSource === 'BPS API Data') {
      return Array.isArray(newCountries) 
        ? newCountries.map(c => ({ ...c, value: c.value.startsWith('BPS_') ? c.value : `BPS_${c.value}` }))
        : { ...newCountries, value: newCountries.value.startsWith('BPS_') ? newCountries.value : `BPS_${newCountries.value}` };
    } else {
      // Call your setCountries function with newCountries as is
      return newCountries;
    }
  };
  
  const {
    countries,
    timeRange,
    setCountries,
    setMultipleCountries,
    removeCountry,
    removeLastCountry,
    setTimeRange,
  } = useData({
    countryKey,
    timeRangeKey,
    initialCountries,
    dataSourceKey
  });

  // const setCountries = (newCountries: TCountries | TCountries[]) => {
  //   if (Array.isArray(newCountries)) {
  //     originalSetMultipleCountries(handleSetCountries(newCountries) as TCountries[]);
  //   } else {
  //     originalSetCountries(handleSetCountries(newCountries) as TCountries);
  //   }
  // };

  // const setMultipleCountries = (newCountries: TCountries[]) => {
  //   originalSetMultipleCountries(handleSetCountries(newCountries) as TCountries[]);
  // };

  const queryClient = useQueryClient();
  const [isNewCountryLoading, setIsNewCountryLoading] = useState(false);

  const fetchCountryData = async ({ from, to }: TTimeRange) => {
    try {
      const adjustedCountries = dataSource === 'BPS API Data'
        ? countries.map(c => ({ ...c, value: c.value.startsWith('BPS_') ? c.value : `BPS_${c.value}` }))
        : countries;
      return getAllCountriesData(adjustedCountries, from, to, indicator, dataSource);
    } catch (error) {
      handleGlobalError(error);
    }
  };

  const {
    data: countryData,
    isPending,
    isFetching,
    // refetch,
  } = useQuery({
    queryKey: ['countryData', timeRange, indicator, dataSource],
    queryFn: () => fetchCountryData(timeRange),
    enabled: !!countries.length,
    placeholderData: (previousData) => previousData,
  });

  const fetchSingleCountryData = async (name: string) => {
    try {
      if (!countryData?.length) return;
      if (countryData.find((d) => d.country === name)) return;
      setIsNewCountryLoading(true);
      const adjustedName = dataSource === 'BPS API Data' && !name.startsWith('BPS_') ? `BPS_${name}` : name;
      const data = await getData({
        countryCode: name,
        from: timeRange.from,
        to: timeRange.to,
        indicator: indicator,
        dataSourceKey: dataSource,
      });
      setIsNewCountryLoading(false);

      queryClient.setQueryData(
        ['countryData', timeRange, indicator, dataSource],
        [...countryData, { country: name, data }]
        // (oldData: any) => [...(oldData || []), { country: name, data }]
      );

      // Trigger a refetch to ensure the UI updates
      // refetch();
    } catch (error) {
      setIsNewCountryLoading(false);
      handleGlobalError(error);
    }
  };

  const chartData = useMemo(() => {
    return formatChartData(countryData as { country: string; data: TResponseData[] | TBPSResponseData[] }[] | undefined);
  }, [countryData]);

  return {
    fetchSingleCountryData,
    chartData,
    isLoading: isPending,
    setCountries,
    setMultipleCountries,
    removeCountry,
    removeLastCountry,
    setTimeRange,
    countries,
    timeRange,
    isFetching: isFetching || isNewCountryLoading,
  };
};
