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
      // Check if the country already exists
      if (prevCountries.some(country => country.value === newCountry.value)) {
        // If it exists, return the previous state without changes
        return prevCountries;
      }
      // If it doesn't exist, add it to the array
      const updatedCountries = [...prevCountries, newCountry];
      setLocalStorage(countryKey, updatedCountries);
      return updatedCountries;
    });
  }, [countryKey]);

  const setMultipleCountries = useCallback((newCountries: TCountries[]) => {
    setCountriesState((prevCountries) => {
      // Filter out duplicates
      const uniqueNewCountries = newCountries.filter(
        newCountry => !prevCountries.some(prevCountry => prevCountry.value === newCountry.value)
      );
      const updatedCountries = [...prevCountries, ...uniqueNewCountries];
      setLocalStorage(countryKey, updatedCountries);
      return updatedCountries;
    });
  }, [countryKey]);

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
