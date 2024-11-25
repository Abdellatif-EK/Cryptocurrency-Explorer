'use client';

import { useState } from 'react';
import { MarketChartData } from '@/types';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
} from '@/components/ui/chart';

type EnhancedPriceChartProps = {
  data: MarketChartData;
};

export default function EnhancedPriceChart({ data }: EnhancedPriceChartProps) {
  const [dateRange, setDateRange] = useState('30');
  const [dataType, setDataType] = useState('prices');

  const chartData = data[dataType as keyof MarketChartData].map(
    ([timestamp, value]) => ({
      date: new Date(timestamp),
      value: value,
    })
  );

  const filteredData = chartData.slice(-parseInt(dateRange));

  const formatYAxis = (value: number) => {
    if (dataType === 'prices') {
      return `$${value.toFixed(2)}`;
    } else if (dataType === 'market_caps') {
      return `$${(value / 1e9).toFixed(2)}B`;
    } else {
      return `${(value / 1e6).toFixed(2)}M`;
    }
  };

  const formatTooltipValue = (value: number) => {
    if (dataType === 'prices') {
      return `$${value.toFixed(2)}`;
    } else if (dataType === 'market_caps') {
      return `$${(value / 1e9).toFixed(2)} Billion`;
    } else {
      return `$${(value / 1e6).toFixed(2)} Million`;
    }
  };

  return (
    <Card className="p-4 w-full max-w-10xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button
            variant={dataType === 'prices' ? 'default' : 'outline'}
            onClick={() => setDataType('prices')}
          >
            Price
          </Button>
          <Button
            variant={dataType === 'market_caps' ? 'default' : 'outline'}
            onClick={() => setDataType('market_caps')}
          >
            Market Cap
          </Button>
          <Button
            variant={dataType === 'total_volumes' ? 'default' : 'outline'}
            onClick={() => setDataType('total_volumes')}
          >
            Volume
          </Button>
        </div>
      </div>
      <ChartContainer
        config={{
          value: {
            label:
              dataType === 'prices'
                ? 'Price'
                : dataType === 'market_caps'
                ? 'Market Cap'
                : 'Volume',
            color: 'hsl(var(--chart-1))',
          },
        }}
        className="h-[400px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => date.toLocaleDateString()}
            />
            <YAxis tickFormatter={formatYAxis} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background border border-border p-2 rounded-md shadow-md">
                      <p className="text-sm font-semibold">
                        {payload[0].payload.date.toLocaleDateString()}
                      </p>
                      <p className="text-sm">
                        {formatTooltipValue(payload[0].value as number)}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-value)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
}
