import { useState, useEffect } from 'react';
import { getLocalCountries, TCountries } from '../libs/utils/index';

export const useLocalCountries = (key: string): TCountries[] => {
  const [countries, setCountries] = useState<TCountries[]>([]);

  useEffect(() => {
    const fetchedCountries = getLocalCountries(key);
    setCountries(fetchedCountries);
  }, [key]);

  return countries;
};