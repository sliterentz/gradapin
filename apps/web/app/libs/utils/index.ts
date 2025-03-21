import currency from 'currency.js';
import { z } from 'zod';
import { toast } from 'sonner';
import { TResponseData, TBPSResponseData } from '../types/response-data.type';
// import { TCountries } from '../../hooks/use-data';
import { getData } from '../types';

type TColor = string[];

export const color: TColor = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export const getLocalStorage = <T>(key: string) => {
  const data = localStorage.getItem(key);
  if (!data) return null;
  return JSON.parse(data) as T;
};

const schema = z.array(
  z.object({
    value: z.string(),
    label: z.string(),
  })
);

export type TCountries = z.infer<typeof schema>[number];

// Non-React utility function to get countries from localStorage
export const getLocalCountries = (key: string): TCountries[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const storedData = localStorage.getItem(key);
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      return schema.parse(parsedData);
    } catch (error) {
      console.error('Error parsing local storage data:', error);
      return [];
    }
  }
  return [];
};

export const setLocalStorage = (key: string, data: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

const schemaTimeRange = z.object({
  from: z.number(),
  to: z.number(),
});

export type TTimeRange = z.infer<typeof schemaTimeRange>;

export const getLocalTimeRange = (key: string) => {
  if (typeof window === 'undefined') return { from: 2010, to: 2024 };

  const timeRange = getLocalStorage(key);
  if (!timeRange) return { from: 2010, to: 2024 };

  try {
    const parsed = schemaTimeRange.parse(timeRange);
    return parsed;
  } catch (error) {
    return { from: 2010, to: 2024 };
  }
};

export const formatCurrency = (
  value: number,
  isSymbol: boolean,
  icon: string | undefined
) => {
  const absValue = Math.abs(value);

  const formatOptions = { precision: 2, symbol: isSymbol ? '$' : '' };

  const formattedValue = (() => {
    if (absValue >= 1e12) {
      return currency(value).divide(1e12).format(formatOptions) + 'T';
    } else if (absValue >= 1e9) {
      return currency(value).divide(1e9).format(formatOptions) + 'B';
    } else if (absValue >= 1e6) {
      return currency(value).divide(1e6).format(formatOptions) + 'M';
    } else {
      return currency(value).format(formatOptions);
    }
  })();
  return icon ? formattedValue + icon : formattedValue;
};

export const transformOBJtoARR = (data: any) => {
  if (!data) return [];
  return Object?.entries(data)
    .filter(([key]) => key !== 'year')
    .map(([country, value]) => ({ country, value }))
    .sort((a: any, b: any) => b.value - a.value)
    .reverse();
};

export const extractValueFromObject = (data: any) => {
  if (!data) return [];
  return Object?.entries(data)
    .filter(([key]) => key !== 'year')
    .map(([_, value]) => value)
    .sort((a: any, b: any) => b - a);
};

const convertInrLakhToUsdBillion = (inrLakh: number, exchangeRate: number) => {
  const inr = inrLakh * 100000;
  const usd = inr / exchangeRate;
  const usdBillion = usd / 1000000000;
  return Math.round(usdBillion * 100) / 100;
};

export const commonMetaData = ({
  name,
  desc,
  image = 'https://rifcloud.vercel.app/assets/logo-B9DMt50b.svg',
  url,
  keywords,
}: {
  name: string;
  desc: string;
  image?: string;
  url: string;
  keywords: string[];
}) => {
  return {
    metadataBase: new URL('https://rifcloud.vercel.app'),
    title: name ? `${name} | Population Graph` : 'Population Graph',
    description: desc,
    authors: [
      {
        name: 'Arief Luqman Hakim',
        url: 'https://rifcloud.vercel.app/',
      },
    ],
    robots: 'index, follow',
    assets: image,
    keywords: [
      'arief luqman hakim',
      'country graph',
      'population graph',,
      ...keywords,
    ],
  };
};

export const handleGlobalError = (error: unknown) => {
  let errorMessage = 'Something went wrong';

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    errorMessage = String((error as { message: unknown }).message);
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else if (error === null || error === undefined) {
    errorMessage = 'An error occurred';
  }

  return toast.error(errorMessage);
};

export const formatBPSChartData = (
  rawData: TBPSResponseData,
  countryCode: string
) => {
  // Create an array of years from the 'tahun' property
  const yearMap = new Map(rawData.tahun.map(year => [year.val, year.label]));
  const yearsLabel = rawData.tahun.map(year => year.label.toString());

  // Create a map of year to value from datacontent
  const dataMap = new Map(
    Object.entries(rawData.datacontent).map(([key, value]) => {
      const yearVal = parseInt(key.slice(-4, -1));
      // const key = Object.keys(rawData.datacontent)[index];
      // const value = rawData.datacontent[key];
      const yearLabel = yearMap.get(yearVal);
      if (!yearLabel) {
        console.warn(`No matching label found for year value: ${yearVal}`);
        return [key, parseInt(value)]; // fallback to original key if no match
      }
      return [yearLabel, parseInt(value)];
    })
  );

  // Map and sort the dataMap by year to ensure correct order into an array format
  const dataArray = Array.from(dataMap)
  .sort((a, b) => parseInt(b[0]) - parseInt(a[0]));

  const years = Array.from(dataArray);

  // Create the final formatted data
  return years.map(([year, value]) => {
    return {
      year: year,
      [countryCode]: Number(value),
    };
  });
}

export const formatChartData = (
  // rawData:
  //   | {
  //       country: any;
  //       data: TResponseData[];
  //     }[]
  //   | undefined
  rawData: { country: any; data: TResponseData[] | TBPSResponseData[] }[] | undefined
) => {
  if (!rawData) return [];

  const modifyData = rawData.map((d) => {
    if (Array.isArray(d.data)) {
      // Handle TResponseData[]
      return d.data.map((dd) => ({
        year: dd.date,
        [dd.countryiso3code]: Number(dd.value),
      }));
    } else {
      // Handle TBPSResponseData
      return formatBPSChartData(d.data, d.country);
    }
  });

  const data = [] as any[];
  modifyData?.forEach((group) => {
    group.forEach((item) => {
      const existingItem = data.find((res) => res.year === item.year);
      if (existingItem) {
        Object.assign(existingItem, item);
      } else {
        data.push({ ...item });
      }
    });
  });
  return data;
}; 

export const formatChartDataTest = (
  rawData:
    | {
        country: string;
        data: TResponseData[] | TBPSResponseData;
      }[]
    | undefined
) => {
  if (!rawData) return [];

  const yearDataMap = new Map<string, { [key: string]: number }>();

  rawData.forEach((countryData) => {
    const countryCode = countryData.country;
    if (Array.isArray(countryData.data)) {
      // Handle TResponseData[]
      countryData.data.forEach((dd) => {
        const year = dd.date;
        if (!yearDataMap.has(year)) {
          yearDataMap.set(year, { year });
        }
        yearDataMap.get(year)![countryCode] = Number(dd.value);
      });
    } else {
      // Handle BPS API Data (TBPSResponseData)
      const formattedData = formatBPSChartData(countryData.data, countryCode);
      formattedData.forEach((item) => {
        const year = item.year;
        if (!yearDataMap.has(year)) {
          yearDataMap.set(year, { year });
        }
        yearDataMap.get(year)![countryCode] = Number(item[countryCode]);
      });
    }
  });

  // Convert the Map to an array and sort by year
  const sortedData = Array.from(yearDataMap.values()).sort((a, b) => 
    parseInt(b.year as string) - parseInt(a.year as string)
  );

  return sortedData;
};

export const getAllCountriesData = async (
  countries: TCountries[],
  from: number,
  to: number,
  indicator: string,
  dataSource: string,
) => {
  const dataSourceKey = dataSource === 'BPS API Data' ? 'BPS API Data' : 'World Bank API Data';
  const data = await Promise.all(
    countries.map(async (country) => {
      return await getData({
        countryCode: country.value,
        from: from,
        to: to,
        indicator: indicator,
        dataSourceKey: dataSourceKey,
      });
    })
  );

  return data.map((d, idx) => {
    const country = countries[idx];
    if (country) {
      return { country: country.value, data: d };
    }
    // Handle the case where the country is undefined
    return { country: 'Unknown', data: d };
  });
};
