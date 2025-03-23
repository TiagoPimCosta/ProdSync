import React from "react";
import {
  ResponsiveContainer,
  LineChart as ReChartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface DataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

interface LineChartProps {
  data: DataPoint[];
  dataKey: string;
  strokeColor?: string;
  xAxisDataKey?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  showAxis?: boolean;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  dataKey,
  strokeColor = "hsl(var(--primary))",
  xAxisDataKey = "name",
  height = 200,
  showGrid = true,
  showTooltip = true,
  showAxis = true,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReChartsLineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: showAxis ? 10 : -10,
          bottom: 5,
        }}
      >
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
        )}
        {showAxis && (
          <>
            <XAxis
              dataKey={xAxisDataKey}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              stroke="hsl(var(--muted-foreground))"
            />
          </>
        )}
        {showTooltip && (
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            }}
            labelStyle={{ color: "hsl(var(--foreground))", marginBottom: "4px", fontWeight: 500 }}
            itemStyle={{ color: "hsl(var(--primary))" }}
          />
        )}
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={strokeColor}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </ReChartsLineChart>
    </ResponsiveContainer>
  );
};
