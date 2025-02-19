import { TResponseData } from './response-data.type';

const generateUrl = (
  countryCode: string,
  indicator: string,
  from: number,
  to: number
) => {
  const apiUrl = process.env.NEST_PUBLIC_API_URL || 'https://gradapin-api.vercel.app';
  return apiUrl+`/api/v1/country/${countryCode}/indicator/${indicator}?date=${from}:${to}`;
};

export const getData = async ({
  countryCode = 'USA',
  from = 2010,
  to = 2025,
  indicator = 'NY.GDP.MKTP.CD',
}: {
  countryCode: string;
  from?: number;
  to?: number;
  indicator?: string;
}) => {
  const url = generateUrl(countryCode, indicator, from, to);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch GDP data.');
    }

    const response = await res.json();
    if (response[1].length === 0) return [];
    return response[1] as TResponseData[];
  } catch (error) {
    return [];
  }
};
