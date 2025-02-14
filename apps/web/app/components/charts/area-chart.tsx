import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../../components/ui/chart';
import { formatCurrency, transformOBJtoARR } from '../../libs/utils/index';

const AreaChartComp = ({
  chartData,
  chartConfig,
  isCurrencySymbol = true,
  icon,
}: {
  chartData: any[];
  chartConfig: ChartConfig;
  isCurrencySymbol?: boolean;
  icon?: string;
}) => {
  const sortedCountry = transformOBJtoARR(chartData[0]);

  if (!sortedCountry.length) return null;

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <AreaChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
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
            ).split('.');
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
              indicator="line"
              isCurrencySymbol={isCurrencySymbol}
              icon={icon}
            />
          }
        />

        {sortedCountry.map((country) => (
          <Area
            dataKey={country.country}
            fill={`var(--color-${country.country})`}
            key={country.country}
            stroke={`var(--color-${country.country})`}
            type="monotone"
            stackId={1}
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
};

export default AreaChartComp;
