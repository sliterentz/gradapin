'use client';

import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useDataSource } from '../../contexts/DataSourceContext';

interface SingleSelectProps {
  selectedCountry: string;
  onCountryChange: (value: string) => void;
}

interface Country {
  id: string;
  iso3: string;
  name: string;
}

const SingleSelect: React.FC<SingleSelectProps> = ({ selectedCountry, onCountryChange }) => {
    const [allCountries, setAllCountries] = useState<Country[]>([]);
    const [availableCountries, setAvailableCountries] = useState<Country[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { dataSource } = useDataSource();

    useEffect(() => {
        const fetchCountries = async () => {
          try {
            const apiUrl = process.env.NEST_PUBLIC_API_URL || 'https://gradapin-api.vercel.app';
            const response = await fetch(apiUrl+'/api/v1/country/list');
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
            setIsLoading(false);
          } catch (err) {
            setError('Error fetching countries. Please try again later.');
            setIsLoading(false);
          }
        };
    
        fetchCountries();
      }, []);

    useEffect(() => {
        if (dataSource === 'BPS API Data') {
            onCountryChange('IDN');
        } else {
            if (selectedCountry) {
                setAvailableCountries(allCountries.filter(country => country.iso3 !== selectedCountry));
            } else {
                setAvailableCountries(allCountries);
            }
        }
    }, [selectedCountry, allCountries, dataSource, onCountryChange]);

    const handleCountryChange = (value: string) => {
        onCountryChange(value);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Select value={selectedCountry} onValueChange={handleCountryChange} disabled={dataSource === 'BPS API Data'}>
            <SelectTrigger>
                <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
                {availableCountries.map((country) => (
                    <SelectItem key={country.id} value={country.iso3}>
                        {country.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SingleSelect;