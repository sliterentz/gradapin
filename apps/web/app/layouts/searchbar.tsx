'use client';

import * as React from 'react';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandInput
} from '../components/ui/command';
import { useEffect, useState, useCallback } from 'react';
import { useDataSource } from '../contexts/DataSourceContext';
import { TCountries } from '../hooks/use-data';

interface Country {
  id: string;
  iso3: string;
  name: string;
}

type TMultiSelect = {
  countries: TCountries[];
  fetchNewCountryData: (name: string) => void;
  fetchSingleCountryData: (name: string) => void;
  setCountries: (countries: TCountries) => void;
  removeCountry: (name: string) => void;
  removeLastCountry: () => void;
  // onCountryChange: (value: string) => void;
  lang: string;
};


const SearchBar: React.FC<TMultiSelect> = ({
  countries,
  fetchNewCountryData,
  fetchSingleCountryData,
  setCountries,
  removeCountry,
  removeLastCountry,
  // onCountryChange,
  lang,
}) => {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [availableCountries, setAvailableCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { dataSource } = useDataSource();

  const fetchCountries = useCallback(async (search: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://gradapin-api.vercel.app';
      const response = await fetch(`${apiUrl}/api/v1/country/list?search=${encodeURIComponent(search)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setAllCountries(data);
        setAvailableCountries(data);
      } else {
        throw new Error('Unexpected data format');
      }
    } catch (err) {
      setError('Error fetching countries. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (inputValue.length > 2) {
      fetchCountries(inputValue);
    } else {
      setIsLoading(false);
      setAvailableCountries([]);
    }
  }, [inputValue, fetchCountries]);

  useEffect(() => {
    if (dataSource === 'BPS API Data') {
      setAvailableCountries(allCountries.filter(country => country.iso3 === 'IDN'));
    } else {
      if (selectedCountry) {
          setAvailableCountries(allCountries.filter(country => country.iso3 !== selectedCountry));
      } else {
          setAvailableCountries(allCountries);
      }
    }
  }, [dataSource, allCountries]);

  // useEffect(() => {
  //   if (countries.length > 0) {
  //     const lastCountry = countries[countries.length - 1];
  //     fetchSingleCountryData(lastCountry.value);
  //   }
  // }, [countries, fetchSingleCountryData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex-grow flex items-center justify-center px-3 py-2">
      <Command className="overflow-visible bg-transparent rounded-lg border shadow-md w-full max-w-[400px]">
        <CommandInput 
        placeholder="Search countries..."
        value={inputValue}
        onValueChange={(value) => {
          setInputValue(value);
          setIsOpen(value.length > 2);
        }}
        onBlur={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)} 
        />
        {isOpen && inputValue.length > 2 && (
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Countries">
            {availableCountries
                .filter(country => 
                  country.name.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((country) => (
                  <CommandItem 
                  key={country.id} 
                  value={country.name}
                  className={'cursor-pointer rounded-[1rem]'}
                  >
                    <button
                      className="w-full h-full text-left px-2 py-1.5"
                      onClick={() => {
                        setSelectedCountry(country.name);
                        setCountries({ label: country.name, value: country.iso3 });
                        fetchNewCountryData(country.iso3);
                        setInputValue('');
                        setIsOpen(false);
                      }}
                    >
                    {country.name}
                    </button>
                  </CommandItem>
                ))
            }
          </CommandGroup>
        </CommandList>
        )}
      </Command>
    </div>
  );
};

export default SearchBar;