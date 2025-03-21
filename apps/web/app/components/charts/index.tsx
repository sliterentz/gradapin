import React, { useMemo, useState, useCallback, useEffect } from 'react';
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
// import SingleSelect from '../ui/single-select';
// import MultiSelect from '../ui/multi-select';
import SearchbarWrapper from '../../layouts/searchbar';
import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { TCountries } from '../../hooks/use-data';
// import { useHotkeys } from 'react-hotkeys-hook';
import ChartRenderer from './chart-renderer';
import { Flex } from '@radix-ui/themes';
// import Menubar from '../../layouts/menubar';

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
  // setMultipleCountries: (countries: TCountries[]) => void;
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
  // setMultipleCountries,
}) => {
  const { theme } = useTheme();
  const locale = useLocale();
  const [chartType, setChartType] = React.useState<TChart>('bar');
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  useEffect(() => {
    // This effect will run whenever chartData changes
    // You can add any additional logic here if needed
  }, [chartData]);

  const handleCountryChange = useCallback((name: string) => {
    const newCountry = { label: name, value: name };
    setCountries(newCountry);
    // setMultipleCountries([...countries, newCountry]);
    fetchSingleCountryData(name);  
  }, [setCountries, fetchSingleCountryData]);

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
      <Flex direction="column" gap="3">
        <Flex justify="between" align="start" wrap="wrap" gap="3">
        <CardHeader className="p-5">
        {/* <Menubar /> */}
          <Flex direction="column" gap="2">
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

          <CardDescription
            style={{
              marginTop: '10px',
            }}
          >
            {chartData[0]?.year} - {chartData[chartData.length - 1]?.year}
          </CardDescription>
          {countries.length > 0 && (
            <Flex wrap="wrap" gap="2">
              {countries.map((country, idx) => (
                <span
                  className="mr-2 flex items-center text-sm whitespace-nowrap"
                  key={`${country.value}-${idx}`}
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
            </Flex>
          )}
          </Flex>
        </CardHeader>

        <Flex direction="column" gap="2" className="p-5 md:w-[300px]">
        {/* <SingleSelect
          selectedCountry={selectedCountry}
          onCountryChange={handleCountryChange}
        /> */}
        {/* <MultiSelect
            countries={countries}
            fetchNewCountryData={handleCountryChange}
            setCountries={setCountries}
            removeCountry={removeCountry}
            removeLastCountry={removeLastCountry}
            lang={locale}
          /> */}
          <SearchbarWrapper
            countries={countries}
            fetchNewCountryData={fetchSingleCountryData}
            fetchSingleCountryData={fetchSingleCountryData}
            setCountries={setCountries}
            removeCountry={removeCountry}
            removeLastCountry={removeLastCountry}
            lang={locale}
          />
          <TimeRange timeRange={timeRange} setTimeRange={setTimeRange} />
          <ChartType chartType={chartType} setChartType={setChartType} />
        </Flex>
      </Flex>

      <CardContent className="h-[500px] w-[97vw] rounded-xl px-0 py-4 md:p-4">
      {chartData.length > 0 ? (
        <ChartRenderer
          key={JSON.stringify(countries)}
          chartType={chartType}
          chartData={chartData}
          icon={icon}
          chartConfig={chartConfig}
          countries={countries}
          isCurrencySymbol={isCurrencySymbol}
        />
      ) : (
        <Flex align="center" justify="center" style={{ height: '100%' }}>
          No data available for the selected country and time range.
        </Flex>
      )}
      </CardContent>
      </Flex>
      {isLoading && <Loader type="full" />}
      {isFetching && <Loader type="full" isFetching={isFetching} />}
    </Card>
  );
};

export default MainChartComp;
