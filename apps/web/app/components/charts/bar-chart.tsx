import React from 'react';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { formatCurrency } from '../../libs/utils/index';
import { TCountries } from '../../hooks/use-data';

const BarChartComp = ({
  chartData,
  chartConfig,
  countries,
  isCurrencySymbol,
  icon,
}: {
  chartData: any[];
  chartConfig: ChartConfig;
  countries: TCountries[];
  isCurrencySymbol: boolean;
  icon?: string;
}) => {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value: any): string => {
            const formattedValue = formatCurrency(
              value,
              isCurrencySymbol,
              icon
            ).split(',');
            console.log('formattedValue:', formattedValue);
            if (formattedValue.length === 0) {
              return ''; // Return an empty string if formattedValue is empty
            }
            if (formattedValue.length === 1) {
              return formattedValue[0] || ''; // Return the first element or an empty string if it's undefined
            }
            // Add a type guard to ensure formattedValue[0] is defined
            const firstPart = formattedValue[0] || '';
            const secondPart = formattedValue[1] ? '.' + formattedValue[1].slice(0, 2) : '';
            return firstPart + secondPart;
          }}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              isCurrencySymbol={isCurrencySymbol}
              icon={icon}
            />
          }
        />
        {countries.map((country, idx) => (
          <Bar
            dataKey={country.value}
            fill={`var(--color-${country.value})`}
            radius={5}
            key={idx}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
};

export default BarChartComp;
