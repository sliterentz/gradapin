'use client';

import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

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

    useEffect(() => {
        const fetchCountries = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/v1/country');
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
        if (selectedCountry) {
            setAvailableCountries(allCountries.filter(country => country.iso3 !== selectedCountry));
        } else {
            setAvailableCountries(allCountries);
        }
    }, [selectedCountry, allCountries]);

    const handleCountryChange = (value: string) => {
        onCountryChange(value);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Select value={selectedCountry} onValueChange={onCountryChange}>
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