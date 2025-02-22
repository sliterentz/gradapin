'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocalCountries } from './useLocalCountries';
import {
  getLocalTimeRange,
  setLocalStorage,
  TTimeRange,
} from '../libs/utils/index';

export type TCountries = Record<'value' | 'label', string>;

export const useData = ({
  countryKey,
  timeRangeKey,
  dataSourceKey,
  initialCountries = [],
}: {
  countryKey: string;
  timeRangeKey: string;
  dataSourceKey: string;
  initialCountries?: TCountries[];
}) => {
  const storedCountries = useLocalCountries(countryKey);

  const [countries, setCountriesState] = useState<TCountries[]>(() => {
    if (storedCountries.length === 0 && initialCountries.length > 0) {
      setLocalStorage(countryKey, initialCountries);
      return initialCountries;
    }
    return storedCountries;
  });

  useEffect(() => {
    if (storedCountries.length === 0 && initialCountries.length > 0) {
      setLocalStorage(countryKey, initialCountries);
      setCountriesState(initialCountries);
    } else if (storedCountries.length > 0) {
      setCountriesState(storedCountries);
    }
  }, [storedCountries, initialCountries, countryKey]);
  
  const [timeRange, setTimeRangeState] = useState<TTimeRange>(
    getLocalTimeRange(timeRangeKey)
  );

  const setCountries = useCallback((newCountry: TCountries) => {
    setCountriesState((prevCountries) => {
      const updatedCountries = [...prevCountries, newCountry];
      setLocalStorage(countryKey, updatedCountries);
      return updatedCountries;
    });
  }, []);

  const setMultipleCountries = useCallback((newCountries: TCountries[]) => {
    setCountriesState(newCountries);
  }, []);

  const removeCountry = useCallback((value: string) => {
    setCountriesState((prevCountries) => {
      const updatedCountries = prevCountries.filter((c) => c.value !== value);
      setLocalStorage(countryKey, updatedCountries);
      return updatedCountries;
    });
  }, []);

  const removeLastCountry = useCallback(() => {
    setCountriesState((prevCountries) => {
      const updatedCountries = prevCountries.slice(0, -1);
      setLocalStorage(countryKey, updatedCountries);
      return updatedCountries;
    });
  }, []);

  const setTimeRange = useCallback((newTimeRange: TTimeRange) => {
    setTimeRangeState(newTimeRange);
    setLocalStorage(timeRangeKey, newTimeRange);
  }, []);

  return {
    countries,
    setCountries,
    setMultipleCountries,
    removeCountry,
    removeLastCountry,
    timeRange,
    setTimeRange,
  };
};
