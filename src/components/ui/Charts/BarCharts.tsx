import React from "react";
import {
  ResponsiveContainer,
  BarChart as ReChartsBarChart,
  Bar,
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

interface BarChartProps {
  data: DataPoint[];
  dataKey: string;
  barColor?: string;
  xAxisDataKey?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  showAxis?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  dataKey,
  barColor = "hsl(var(--primary))",
  xAxisDataKey = "name",
  height = 200,
  showGrid = true,
  showTooltip = true,
  showAxis = true,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReChartsBarChart
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
        <Bar dataKey={dataKey} fill={barColor} radius={[4, 4, 0, 0]} />
      </ReChartsBarChart>
    </ResponsiveContainer>
  );
};
