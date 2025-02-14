import currency from 'currency.js';
import { z } from 'zod';
// import { getAllCountries } from '../../components/config';
import { toast } from 'sonner';
import { TResponseData } from '../types/response-data.type';
import { TCountries } from '../../hooks/use-data';
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

export const getLocalCountries = (key: string): TCountries[] => {
  const storedData = localStorage.getItem(key);
  if (!storedData) return [];

  try {
    const parsedData = JSON.parse(storedData);
    return schema.parse(parsedData);
  } catch (error) {
    console.error('Error parsing local storage data:', error);
    return [];
  }
};

export const setLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type TTheme = {
  [key: string]: string;
};

export type TShareLink = {
  countries: string[];
  to: number;
  from: number;
  indicator: string;
  chartType: string;
  icon?: string;
  isCurrencySymbol: boolean;
  language: string;
  type: string;
};

export const createShareLink = (data: TShareLink) => {
  const {
    countries,
    to,
    from,
    indicator,
    chartType,
    icon,
    isCurrencySymbol,
    language,
    type,
  } = data;

  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://rifcloud.vercel.app';

  const isIcon = icon ? icon : '';
  const countriesStr = countries.join('-');
  return `${baseUrl}/share?countries=${countriesStr}&from=${from}&to=${to}&indicator=${indicator}&chartType=${chartType}&icon=${isIcon}&isCurrencySymbol=${isCurrencySymbol}&language=${language}&type=${type}`;
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

export const formatChartData = (
  rawData:
    | {
        country: any;
        data: TResponseData[];
      }[]
    | undefined
) => {
  const modifyData = rawData?.map((d) => {
    return d.data.map((dd) => ({
      year: dd.date,
      [dd.countryiso3code]: Number(dd.value),
    }));
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

export const getAllCountriesData = async (
  countries: TCountries[],
  from: number,
  to: number,
  indicator: string
) => {
  const data = await Promise.all(
    countries.map(async (country) => {
      return await getData({
        countryCode: country.value,
        from: from,
        to: to,
        indicator: indicator,
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
