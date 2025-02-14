import React, { useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { createChartConfig } from '../config';
import { cn } from '../../libs/utils';
import { color, TTimeRange } from '../../libs/utils/index';
import { Loader } from '../ui/loader';
import TimeRange from './time-range';
import ChartType from './chart-type';
import { ToolTipComp } from '../ui/tooltip';
import { BadgeInfo } from 'lucide-react';
import SingleSelect from '../ui/single-select';
// import MultiSelect from './multi-select';
import { useTheme } from 'next-themes';
import { TCountries } from '../../hooks/use-data';
// import { useHotkeys } from 'react-hotkeys-hook';
import ChartRenderer from './chart-renderer';

export type TChart = 'area' | 'bar' | 'line' | 'radar';

type TMainChart = {
  countries: TCountries[];
  timeRange: TTimeRange;
  isLoading: boolean;
  chartData: any[];
  fetchSingleCountryData: (name: string) => void;
  setTimeRange: (timeRange: TTimeRange) => void;
  title: string;
  toolTipMessage: string;
  setCountries: (countries: TCountries) => void;
  removeCountry: (name: string) => void;
  removeLastCountry: () => void;
  isCurrencySymbol: boolean;
  icon?: string;
  indicator: string;
  type: string;
  isFetching: boolean;
};

const MainChartComp: React.FC<TMainChart> = ({
  countries,
  timeRange,
  isLoading,
  chartData,
  fetchSingleCountryData,
  setTimeRange,
  title,
  toolTipMessage,
  setCountries,
  removeCountry,
  removeLastCountry,
  isCurrencySymbol,
  icon,
  indicator,
  isFetching,
  type,
}) => {
  const { theme } = useTheme();
  const [chartType, setChartType] = React.useState<TChart>('bar');
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setCountries({ value, label: value });
    fetchSingleCountryData(value);
  };

  const modifyConfig = useMemo(
    () =>
      countries.map((country) => {
        return {
          name: country.value,
          label: `${country.label}`,
        };
      }),
    [countries]
  );

  const chartConfig = createChartConfig(modifyConfig);
  const countriesValue = useMemo(
    () => countries.map((country) => country.value),
    [countries]
  );

  return (
    <Card
      className="m-0 mt-5 p-0"
      style={{
        borderRadius: '1rem',
      }}
      id="capture-chart"
    >
      <div className="flex w-full items-start justify-between">
        <CardHeader className="p-5">
          <div className="-mb-1 flex items-start gap-4">
            <ToolTipComp name={toolTipMessage}>
              <CardTitle className="flex items-center gap-1 text-xl md:text-2xl">
                {title}
                <BadgeInfo
                  className="custom-hide mt-[3px] hidden lg:block"
                  size={15}
                  color="hsl(var(--muted-foreground))"
                  cursor="pointer"
                />
              </CardTitle>
            </ToolTipComp>
          </div>

          <CardDescription
            style={{
              marginTop: '10px',
            }}
          >
            {chartData[0]?.year} - {chartData[chartData.length - 1]?.year}
          </CardDescription>
          {countries.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 p-5 pt-2 pl-0">
              {countries.map((country, idx) => (
                <span
                  className="mr-2 flex items-center text-sm whitespace-nowrap"
                  key={country.value}
                >
                  {country.label}
                  <span
                    style={{
                      backgroundColor: color[idx],
                    }}
                    className={cn('spp ml-2 inline-block h-3 w-3 rounded')}
                  />
                </span>
              ))}
            </div>
          )}
        </CardHeader>

        <div className="w-full md:w-[300px] px-5 md:px-0 md:mr-4 mt-4 flex flex-col">
        <SingleSelect
          selectedCountry={selectedCountry}
          onCountryChange={handleCountryChange}
        />
          <TimeRange timeRange={timeRange} setTimeRange={setTimeRange} />
          <div className="mt-2 w-full">
            <ChartType chartType={chartType} setChartType={setChartType} />
          </div>
        </div>
      </div>

      <CardContent className="h-[500px] w-[97vw] rounded-xl px-0 py-4 md:p-4">
      {chartData.length > 0 ? (
        <ChartRenderer
          chartType={chartType}
          chartData={chartData}
          icon={icon}
          chartConfig={chartConfig}
          countries={countries}
          isCurrencySymbol={isCurrencySymbol}
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          No data available for the selected country and time range.
        </div>
      )}
      </CardContent>
      {isLoading && <Loader type="full" />}
      {isFetching && <Loader type="full" isFetching={isFetching} />}
    </Card>
  );
};

export default MainChartComp;
