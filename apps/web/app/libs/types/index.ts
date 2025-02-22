import { TBPSResponseData, TResponseData } from './response-data.type';

type DataSource = 'World Bank API Data' | 'BPS API Data';

const generateUrl = (
  countryCode: string,
  indicator: string,
  from: number,
  to: number,
  dataSource: string
) => {
  const apiUrl = process.env.NEST_PUBLIC_API_URL || 'http://localhost:5000';
  
  if (dataSource === 'World Bank API Data') {
    return `${apiUrl}/api/v1/population/country/${countryCode}/indicator/${indicator}?date=${from}:${to}`;
  } else {
    const variableId = 1975;
    return `${apiUrl}/api/v1/population/variable/${variableId}`;
  }
};

export const getData = async ({
  countryCode = 'USA',
  from = 2010,
  to = 2025,
  indicator = 'NY.GDP.MKTP.CD',
  dataSourceKey = 'World Bank API Data',
}: {
  countryCode: string;
  from?: number;
  to?: number;
  indicator?: string;
  dataSourceKey?: string;
}) => {
  const url = generateUrl(countryCode, indicator, from, to, dataSourceKey);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch GDP data.');
    }

    const response = await res.json();
    if (dataSourceKey === 'World Bank API Data') {
      if (response[1].length === 0) return [];
      return response[1] as TResponseData[];
    } else {
      // Handle BPS API Data response format
      // You might need to adjust this based on the actual response structure
      return response as TBPSResponseData;
    }
  } catch (error) {
    return [];
  }
};
